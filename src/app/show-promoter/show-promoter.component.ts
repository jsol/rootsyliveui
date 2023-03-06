import { Component, Input, OnInit } from '@angular/core';
import { Promoter,  WebsocketService } from "../websocket.service";

@Component({
  selector: 'app-show-promoter',
  templateUrl: './show-promoter.component.html',
  styleUrls: ['./show-promoter.component.css']
})
export class ShowPromoterComponent implements OnInit {
  @Input() id: string = '';
  promoter?:Promoter;


  constructor(private WebsocketService: WebsocketService) {

    this.WebsocketService = WebsocketService
  }

  ngOnInit() {

    if (this.id != '') {
      this.promoter = this.WebsocketService.cache.promoters.get(this.id)!
    }
    console.log(this.id, this.promoter)

  }
}
