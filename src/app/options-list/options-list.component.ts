import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WebsocketService, Settings, Message } from '../websocket.service';



interface ListOption {
  name: string;
  type: string;
}

function setOpts(existing: ListOption[], settings: Settings) {
  for (const [type, list] of Object.entries(settings.options)) {
    console.log("OPTIONS:", type, list)

    list.forEach((value: string) => {
      if (existing.find(o => o.name == value && o.type == type)) {
        return
      }
      existing.push({ name: value, type: type })
    })
  }
}

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.css']
})
export class OptionsListComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['name', 'type', 'remove'];
  websocket;
  dataSource!: MatTableDataSource<ListOption>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _websocket: WebsocketService) {
    this.dataSource = new MatTableDataSource([] as ListOption[]);
    this.websocket = _websocket

    _websocket.messages.subscribe((msg: Message) => {
      if (msg.op == 'set') {
        if (msg.settings) {
          setOpts(this.dataSource.data, msg.settings)
          this.dataSource.data = this.dataSource.data;
        }
      }
    });

  }

  removeOption(opt: ListOption) {
    console.log(opt)
    const index = this.dataSource.data.findIndex(o => o.type == opt.type && o.name == opt.name)

    if (index >= 0) {
      this.dataSource.data.splice(index, 1)
      this.dataSource.data = this.dataSource.data;
    }
    const m: Message = {
      op: 'del',
      data: {
        artists: [],
        venues: [],
        gigs: []
      },
      settings: {
        options: {},
        templates: {}
      }
    }
    m.settings!.options[opt.type] = [opt.name]
    this.websocket.messages.next(m)
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    console.log('OPTS', this.websocket.settings.options)
    if (this.websocket.settings) {
      setOpts(this.dataSource.data, this.websocket.settings)
      this.dataSource.data = this.dataSource.data;
    }
  }

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