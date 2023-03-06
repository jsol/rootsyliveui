import { Component, ViewChild, Inject, OnInit, HostListener } from '@angular/core';
import { Contract, Gig, Venue, Identifier, Message, WebsocketService } from "../websocket.service";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { UploadedFile } from '../upload-file/upload-file.component';
import { environment } from '../../environments/environment';
import { v4 as uuid } from 'uuid';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';

export interface EditData {
  id: string;
}


function hash(str: string) {
  if (!crypto.subtle) {
    return Promise.resolve('fakesha')
  }

  const utf8 = new TextEncoder().encode(str);
  return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  });
}

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-editgig',
  templateUrl: './editgig.component.html',
  styleUrls: ['./editgig.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditgigComponent implements OnInit {
  downloadBase = environment.baseUrl + '/download-file/'
  gig: Gig = {
    id: "",
    name: "New gig",
    venue: "",
    date: "",
    openTime: '',
    publicDate: '',
    state: '',
    guarantee: '',
    hospitality: '',
    notes: '',
    ticketPrices: '',
    entourage: '',
    special: '',
    contractText: '',
    urls: [],
    files: [],
    promoters: [],
    artists: []
  }
  date = new FormControl(moment(this.gig.date));
  publicDate = new FormControl(moment(this.gig.publicDate));
  venue = new FormControl<string | Identifier>('');
  artists = new Set<Identifier>();
  promoters = new Set<Identifier>();
  venues: Venue[] = []
  states: string[] = []
  hospitalityOpts: string[] = []
  selectedVenue: string = ''
  id: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditData, private WebsocketService: WebsocketService) {
    this.id = data.id
    this.WebsocketService = WebsocketService


    this.WebsocketService.messages.subscribe((msg: Message) => {

      //this.options = msg.artists

      msg.data.venues.forEach((a: Venue) => {
        if (!this.venues.find(f => f.id == a.id)) {
          this.venues.push(a)
        }
      })
    });

  }

  uploadedFile(name: UploadedFile) {
    console.log("Done upload: ", name)
    if (!this.gig.files) {
      this.gig.files = []
    }
    this.gig.files.push(name)
  }

  ngOnInit() {

    this.WebsocketService.cache.venues.forEach(v => {
      if (!this.venues.find(f => f.id == v.id)) {
        this.venues.push(v)
      }
    })
    this.states = this.WebsocketService.settings.options['state'];
    this.hospitalityOpts = this.WebsocketService.settings.options['hospitality'];
    this.venues.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })

    if (this.id != '') {
      this.gig = this.WebsocketService.cache.gigs.get(this.id)!
    }
    if (this.gig.id != '') {
      this.venue.setValue(this.gig.venue)
      this.gig.artists.forEach((id: string) => {
        this.artists.add(this.WebsocketService.cache.artists.get(id)!)
      })
      this.gig.promoters.forEach((id: string) => {
        this.promoters.add(this.WebsocketService.cache.promoters.get(id)!)
      })
      this.date.setValue(moment(this.gig.date))
      this.publicDate.setValue(moment(this.gig.publicDate))
    }
    if (this.gig.id == '') {
      this.gig.id = uuid()
    }

    console.log("EDIT GIG", this.gig)
  }

  replaceInTemplate(str: string): string {
    const artists = Array.from(this.artists || []).map(a => a.name).join(' / ')
    const promoters = Array.from(this.promoters || []).map(a => a.name).join(' / ')
    console.log(this)
    console.log(this.gig)

    str = str.replaceAll('#name#', this.gig.name);
    str = str.replaceAll('#date#', this.date.getRawValue()?.format("Y-MM-DD")!);
    str = str.replaceAll('#openTime#', this.gig.openTime);
    str = str.replaceAll('#guarantee#', this.gig.guarantee);
    str = str.replaceAll('#hospitality#', this.gig.hospitality);
    str = str.replaceAll('#notes#', this.gig.notes);
    str = str.replaceAll('#ticketPrices#', this.gig.ticketPrices);
    str = str.replaceAll('#entourage#', this.gig.entourage);
    str = str.replaceAll('#special#', this.gig.special);
    str = str.replaceAll('#artists#', artists);
    str = str.replaceAll('#promoters#', promoters);
    str = str.replaceAll('#venue#', this.WebsocketService.cache.venues.get(this.gig.venue)!.name);
    return str
  }

  publishContract() {
    const c: Contract = {
      id: '',
      gig: '',
      name: '',
      shasum: '',
      text: '',
      published: '',
      signatures: []
    }

    c.name = this.gig.name;
    c.gig = this.gig.id;
    c.text = this.gig.contractText
    hash(c.text).then((str: string) => {
      const d = new Date()
      c.shasum = str;
      c.published = d.toISOString()
      const m: Message = this.WebsocketService.emptyMessage('set')
      m.data.contracts = [c]
      this.WebsocketService.messages.next(m)
    })
  }

  @HostListener('document:keydown.control.s', ['$event']) onKeydownHandler(event:
    KeyboardEvent) {
    console.log('Submitted');
    event.preventDefault();
    this.saveGig()
  }

  saveGig() {
    if (this.date == null) {
      return;
    }

    console.log("Saving gig", this.gig.guarantee)

    console.log(this.date.getRawValue()?.format("Y-MM-DD"), this.artists, this.selectedVenue)
    this.gig.artists.length = 0;
    this.artists.forEach((val: Identifier) => {
      this.gig.artists.push(val.id)
    })

    this.gig.promoters.length = 0;
    this.promoters.forEach((val: Identifier) => {
      this.gig.promoters.push(val.id)
    })

    this.gig.date = this.date.getRawValue()!.format("Y-MM-DD")
    this.gig.publicDate = this.publicDate.getRawValue()!.format("Y-MM-DD")

    const m: Message = this.WebsocketService.emptyMessage('set')
    m.data.gigs = [this.gig]
    this.WebsocketService.messages.next(m)
  }

  displayFn(user: Identifier): string {
    return user && user.name ? user.name : '';
  }
}
