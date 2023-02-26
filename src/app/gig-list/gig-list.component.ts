import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WebsocketService, Gig, Message } from '../websocket.service';


interface ListGig {
  id: string;
  date: string;
  artists: string;
  venue: string;
}

@Component({
  selector: 'app-gig-list',
  templateUrl: './gig-list.component.html',
  styleUrls: ['./gig-list.component.css']
})
export class GigListComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'venue', 'artists', 'id'];
  dataSource!: MatTableDataSource<ListGig>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _websocket: WebsocketService) {
    this.dataSource = new MatTableDataSource([] as ListGig[])
    _websocket.cache.gigs.forEach((g: Gig) => {
      this.dataSource.data.push({
        id: g.id,
        date: g.date,
        venue: _websocket.cache.venues.get(g.venue)!.name,
        artists: g.artists.map(a => _websocket.cache.artists.get(a)!.name).join(' / ')
      })
    })

    _websocket.messages.subscribe((msg: Message) => {
      if (msg.op == 'set') {
        msg.data.gigs.forEach((g: Gig) => {
          const found = this.dataSource.data.find(c => c.id == g.id)

          if (found) {
            found.artists = g.artists.map(a => _websocket.cache.artists.get(a)!.name).join(' / ')
            found.date = g.date
            found.venue = _websocket.cache.venues.get(g.venue)!.name
          } else {
            this.dataSource.data.push({
              id: g.id,
              date: g.date,
              venue: _websocket.cache.venues.get(g.venue)!.name,
              artists: g.artists.map(a => _websocket.cache.artists.get(a)!.name).join(' / ')
            })
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
}