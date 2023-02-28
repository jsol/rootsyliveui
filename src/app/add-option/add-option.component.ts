import { Component } from '@angular/core';
import { WebsocketService, Message } from '../websocket.service';

@Component({
  selector: 'app-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.css']
})
export class AddOptionComponent {

  value:string = '';
  category:string = ''
  categories:string[] = []

  constructor( private WebsocketService: WebsocketService) {
    this.WebsocketService = WebsocketService
  }

  ngOnInit() {
    this.categories = Object.keys(this.WebsocketService.settings.options)
  }

  saveOption() {
    if (this.category == '' || this.value == '') {
      return
    }
    const index = this.WebsocketService.settings.options[this.category].findIndex(o => o == this.value)

    if (index >= 0) {
      return
    }
    const m: Message = {
      op: 'set',
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
    this.WebsocketService.settings.options[this.category].push(this.value)

    m.settings!.options[this.category] = this.WebsocketService.settings.options[this.category]
    this.WebsocketService.messages.next(m)
  }
}
