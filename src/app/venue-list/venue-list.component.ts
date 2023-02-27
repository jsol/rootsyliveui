import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WebsocketService, Venue, Message } from '../websocket.service';


interface ListVenue {
  id: string;
  name: string;
}

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'id'];
  dataSource!: MatTableDataSource<ListVenue>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _websocket: WebsocketService) {
    this.dataSource = new MatTableDataSource([] as ListVenue[])
    _websocket.cache.venues.forEach((g: Venue) => {
      this.dataSource.data.push({
        id: g.id,
        name: g.name
      })
    })

    _websocket.messages.subscribe((msg: Message) => {
      if (msg.op == 'set') {
        msg.data.venues.forEach((g: Venue) => {
          const found = this.dataSource.data.find(c => c.id == g.id)

          if (found) {
            found.name = g.name
          } else {
            this.dataSource.data.push({
              id: g.id,
              name: g.name
            })
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