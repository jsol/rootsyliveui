import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WebsocketService, Settings, Message, TemplateInfo } from '../websocket.service';



interface ListTemplate {
  id: string;
  name: string;
  type: string;
}

function setOpts(existing: ListTemplate[], settings: Settings) {
  for (const [type, list] of Object.entries(settings.templates)) {
    console.log("OPTIONS:", type, list)

    list.forEach((t: TemplateInfo) => {
      if (existing.find(o => o.id == t.id && o.type == type)) {
        return
      }
      existing.push({ id: t.id, name: t.name, type: type })
    })
  }
}

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent  implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['name', 'type', 'edit'];
  websocket;
  dataSource!: MatTableDataSource<ListTemplate>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _websocket: WebsocketService) {
    this.dataSource = new MatTableDataSource([] as ListTemplate[]);
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