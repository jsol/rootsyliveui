import { Component, OnInit, Input } from '@angular/core';
import { Artist, Gig, Venue, Identifier, Message, WebsocketService } from "../websocket.service";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-show-gig',
  templateUrl: './show-gig.component.html',
  styleUrls: ['./show-gig.component.css']
})

export class ShowGigComponent {
  @Input() id: string = '';
  gig?:Gig;
  artists:string = ''
  downloadBase = environment.baseUrl + '/download-file/'

  constructor(private WebsocketService: WebsocketService) {

    this.WebsocketService = WebsocketService
  }

  ngOnInit() {

    if (this.id != '') {
      this.gig = this.WebsocketService.cache.gigs.get(this.id)!
      this.artists = this.gig.artists.map((a:string) => this.WebsocketService.cache.artists.get(a)).join(' / ')
    }


  }
}
