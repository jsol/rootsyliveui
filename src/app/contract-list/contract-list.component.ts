import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WebsocketService, Artist, Message, Contract } from '../websocket.service';

function toList(c: Contract, ws:WebsocketService) {
  return {
    id: c.id,
    name: c.name,
    gig: ws.cache.gigs.get(c.gig)!.name,
    published: c.published,
    signatures: c.signatures.map(s => s.name).join(' / '),
    link: `https://contract.rootsy.nu/?id=${c.id}&shasum=${c.shasum}`
  }
}

interface ListContract {
  id: string;
  name: string;
  gig: string;
  published: string;
  signatures: string;
  link: string
}
@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'gig', 'published', 'signatures', 'link'];
  dataSource!: MatTableDataSource<ListContract>;


  constructor(private _liveAnnouncer: LiveAnnouncer, private _websocket: WebsocketService) {
    this.dataSource = new MatTableDataSource([] as ListContract[])
    _websocket.cache.contracts.forEach((c: Contract) => {
      this.dataSource.data.push(toList(c, _websocket))
    })

    _websocket.messages.subscribe((msg: Message) => {
      if (msg.op == 'set') {
        msg.data.contracts.forEach((g: Contract) => {
          const found = this.dataSource.data.find(c => c.id == g.id)

          if (found) {
            found.name = g.name
          } else {
            this.dataSource.data.push(toList(g, _websocket))
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