
import { Component, Inject, HostListener } from '@angular/core';
import { WebsocketService, Promoter, Gig, Venue, Message } from '../websocket.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';

export interface EditData {
  id: string;
}

@Component({
  selector: 'app-edit-promoter',
  templateUrl: './edit-promoter.component.html',
  styleUrls: ['./edit-promoter.component.css']
})
export class EditPromoterComponent {
  promoter: Promoter = {
    id: '',
    name: 'New Promoter',
    email: '',
    phone: '',
    orgNbr: '',
    orgType: '',
    urls: []
  }
  id: string = ''
  forms: string[] = []


  constructor(@Inject(MAT_DIALOG_DATA) public data: EditData, private WebsocketService: WebsocketService) {
    this.id = data.id
    this.WebsocketService = WebsocketService
  }

  ngOnInit() {
    if (this.id != '') {
      this.promoter = this.WebsocketService.cache.promoters.get(this.id)!
    } else {
      this.promoter.id = uuid()
    }
    this.forms = this.WebsocketService.settings.options['bandFormat'];

  }

  @HostListener('document:keydown.control.s', ['$event']) onKeydownHandler(event:
    KeyboardEvent) {
    console.log('Submitted');
    event.preventDefault();
    this.savePromoter()
  }

  savePromoter() {
    if (this.promoter.name == '') {
      return;
    }
    console.log(this.promoter)

    const m: Message = this.WebsocketService.emptyMessage('set')
    m.data.promoters = [this.promoter]
    this.WebsocketService.messages.next(m)
  }
}
