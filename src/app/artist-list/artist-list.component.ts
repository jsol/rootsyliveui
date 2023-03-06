import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WebsocketService, Artist, Message } from '../websocket.service';


interface ListArtist {
  id: string;
  name: string;
}

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'id'];
  dataSource!: MatTableDataSource<ListArtist>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _websocket: WebsocketService) {
    this.dataSource = new MatTableDataSource([] as ListArtist[])
    _websocket.cache.artists.forEach((g: Artist) => {
      this.dataSource.data.push({
        id: g.id,
        name: g.name
      })
    })

    _websocket.messages.subscribe((msg: Message) => {
      if (msg.op == 'del' && msg.delete!.type == 'artists') {
        const foundIndex = this.dataSource.data.findIndex(c => c.id == msg.delete!.id)
        console.log("Deleting artist with id ", msg.delete!.id, foundIndex)
        if (foundIndex >= 0) {
          this.dataSource.data.splice(foundIndex, 1)
          this.dataSource.data = this.dataSource.data
        }

      }

      if (msg.op == 'set') {
        msg.data.artists.forEach((g: Artist) => {
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