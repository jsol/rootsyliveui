import { Component, Inject, HostListener } from '@angular/core';
import { WebsocketService, Artist, Gig, Venue, Message } from '../websocket.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { v4 as uuid } from 'uuid';

export interface EditData {
  id: string;
}

@Component({
  selector: 'app-edit-venue',
  templateUrl: './edit-venue.component.html',
  styleUrls: ['./edit-venue.component.css']
})
export class EditVenueComponent {
  venue: Venue = {
    id: '',
    name: 'New Venue',
    city: '',
    address: '',
    urls: []
  }
  id: string = ''


  constructor(@Inject(MAT_DIALOG_DATA) public data: EditData, private WebsocketService: WebsocketService) {
    this.id = data.id
    this.WebsocketService = WebsocketService
  }

  ngOnInit() {
    if (this.id != '') {
      this.venue = this.WebsocketService.cache.venues.get(this.id)!
    } else {
      this.venue.id = uuid()
    }
  }

  @HostListener('document:keydown.control.s', ['$event']) onKeydownHandler(event:
    KeyboardEvent) {
    console.log('Submitted');
    event.preventDefault();
    this.saveVenue()
  }

  saveVenue() {
    if (this.venue.name == '') {
      return;
    }
    console.log(this.venue)

    const m: Message = this.WebsocketService.emptyMessage('set')
    m.data.venues = [this.venue]
    this.WebsocketService.messages.next(m)
  }
}
