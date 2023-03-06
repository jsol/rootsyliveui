
import { Component, Inject, HostListener } from '@angular/core';
import { WebsocketService, TemplateInfo, Gig, Venue, Message } from '../websocket.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';

export interface EditData {
  id: string;
}
@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.css']
})
export class EditTemplateComponent {
  template: TemplateInfo = {
    id: '',
    name: '',
    text: ''
  }
  id: string = ''
  categories: string[] = []
  category:string = ''


  constructor(@Inject(MAT_DIALOG_DATA) public data: EditData, private WebsocketService: WebsocketService) {
    this.id = data.id
    this.WebsocketService = WebsocketService
  }

  ngOnInit() {
    this.categories = this.WebsocketService.settings.options['templates']

    if (this.id != '') {

      for (const c of this.categories) {
        const f = this.WebsocketService.settings.templates[c]!.find(s => s.id == this.id)

        if (f) {
          this.template = f
          break;
        }
      }
    } else {
      this.template.id = uuid()
    }
  }

  @HostListener('document:keydown.control.s', ['$event']) onKeydownHandler(event:
    KeyboardEvent) {
    console.log('Submitted');
    event.preventDefault();
    this.saveTemplate()
  }

  saveTemplate() {
    if (this.template.name == '' && this.category != '') {
      return;
    }
    console.log(this.template)

    const m: Message = this.WebsocketService.emptyMessage('set')
    m.settings!.templates[this.category] = [this.template]
    this.WebsocketService.messages.next(m)
  }
}