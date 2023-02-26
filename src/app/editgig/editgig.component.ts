import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { Artist, Gig, Venue, Identifier, Message, WebsocketService } from "../websocket.service";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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
  gig: Gig = {
    id: "",
    name: "New gig",
    venue: "",
    date: "",
    artists: []
  }
  date = new FormControl(moment(this.gig.date));
  venue = new FormControl<string | Identifier>('');
  artists = new Set<Identifier>();
  venues: Venue[] = []
  selectedVenue: string = ''
  id: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditData, private WebsocketService: WebsocketService) {
    this.id = data.id
    this.WebsocketService = WebsocketService

    this.WebsocketService.messages.subscribe((msg: Message) => {

      //this.options = msg.artists



      msg.data.venues.forEach((a: Venue) => {
        this.venues.push(a)
        console.log("SHOULD ADD VENUE: " + a.name);
      })
      this.venue.setValue(this.gig.venue)
    });

  }

  ngOnInit() {
    if (this.id != '') {
      this.gig = this.WebsocketService.cache.gigs.get(this.id)!
      console.log(this.WebsocketService.cache.gigs)
      console.log("Editing", this.id, this.gig)
    }
    if (this.gig.id != '') {
      this.venue.setValue(this.gig.venue)
      this.gig.artists.forEach((id: string) => {
        this.artists.add(this.WebsocketService.cache.artists.get(id)!)
      })
      this.date.setValue(moment(this.gig.date))
    }
  }

  saveGig() {
    if (this.date == null) {
      return;
    }

    console.log(this.date.getRawValue()?.format("Y-MM-DD"), this.artists, this.selectedVenue)
    this.gig.artists.length = 0;
    this.artists.forEach((val: Identifier) => {
      this.gig.artists.push(val.id)
    })

    this.gig.date = this.date.getRawValue()!.format("Y-MM-DD")

    const m: Message = {
      op: 'set',
      data: {
        artists: [] as Artist[],
        venues: [] as Venue[],
        gigs: [this.gig]
      }
    }
    this.WebsocketService.messages.next(m)
  }

  displayFn(user: Identifier): string {
    return user && user.name ? user.name : '';
  }
}
