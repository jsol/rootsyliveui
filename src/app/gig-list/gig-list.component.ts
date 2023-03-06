import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WebsocketService, Gig, Message } from '../websocket.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


interface ListGig {
  id: string;
  date: string;
  artists: string;
  venue: string;
  state: string;
}

function mapGig(g: Gig, ws: WebsocketService) {
  return {
    id: g.id,
    date: g.date,
    venue: g.venue != '' ? ws.cache.venues.get(g.venue)!.name : '',
    artists: g.artists.map(a => ws.cache.artists.get(a)!.name).join(' / '),
    state: g.state
  }
}

@Component({
  selector: 'app-gig-list',
  templateUrl: './gig-list.component.html',
  styleUrls: ['./gig-list.component.css'],
  animations: [
    trigger('expandableRow', [
      state('collapsed, void', style({
        height: '0px',
        visibility: 'hidden'
      })),
      state('expanded', style({
        'min-height': '48px',
        height: '*',
        visibility: 'visible'
      })),
      transition(
        'expanded <=> collapsed, void <=> *',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ])
  ]
})
export class GigListComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'venue', 'artists', 'state', 'id'];
  dataSource!: MatTableDataSource<ListGig>;
  expandedElement: string = '';

  constructor(private _liveAnnouncer: LiveAnnouncer, private _websocket: WebsocketService) {
    this.dataSource = new MatTableDataSource([] as ListGig[])
    _websocket.cache.gigs.forEach((g: Gig) => {
      this.dataSource.data.push(mapGig(g, _websocket))
    })

    _websocket.messages.subscribe((msg: Message) => {
      if (msg.op == 'del' && msg.delete!.type == 'gigs') {
        const foundIndex = this.dataSource.data.findIndex(c => c.id == msg.delete!.id)
        if (foundIndex >= 0) {
          this.dataSource.data.splice(foundIndex, 1)
          this.dataSource.data = this.dataSource.data
        }
      }

      if (msg.op == 'set') {
        msg.data.gigs.forEach((g: Gig) => {
          const found = this.dataSource.data.find(c => c.id == g.id)

          if (found) {
            const ng = mapGig(g, _websocket)
            let k: keyof typeof ng;
            for (k in ng) {
              found[k] = ng[k];
            }
            found.artists = g.artists.map(a => _websocket.cache.artists.get(a)!.name).join(' / ')
            found.date = g.date
            found.venue = _websocket.cache.venues.get(g.venue)!.name
            found.state = g.state
          } else {
            this.dataSource.data.push(mapGig(g, _websocket))
            console.log("Pushed gig", g)
          }
        })
        this.dataSource.data = this.dataSource.data;
      }
    });

  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  toggleExpandableSymbol(symbol: string): void {
    console.log('Toggle id', symbol)
    this.expandedElement = this.expandedElement === symbol
      ? ''
      : symbol;
  }
}