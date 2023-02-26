import { Component, Inject } from '@angular/core';
import { WebsocketService, Artist, Gig, Venue, Message } from '../websocket.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

export interface EditData {
  id: string;
}

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent {
  artist: Artist = {
    id: '',
    name: 'New Artist'
  }
  id: string = ''


  constructor(@Inject(MAT_DIALOG_DATA) public data: EditData, private WebsocketService: WebsocketService) {
    this.id = data.id
    this.WebsocketService = WebsocketService
  }

  ngOnInit() {
    if (this.id != '') {
      this.artist = this.WebsocketService.cache.artists.get(this.id)!
    }


  }

  saveArtist() {
    if (this.artist.name == '') {
      return;
    }
    console.log(this.artist)

    const m: Message = {
      op: 'set',
      data: {
        artists: [this.artist],
        venues: [] as Venue[],
        gigs: [] as Gig[]
      }
    }
    this.WebsocketService.messages.next(m)
  }
}
