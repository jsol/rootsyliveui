import { Component, Input } from '@angular/core';
import { Url } from "../websocket.service";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-urls',
  templateUrl: './edit-urls.component.html',
  styleUrls: ['./edit-urls.component.css']
})
export class EditUrlsComponent {
  @Input() urls: Url[] = []
  name = new FormControl<string>('')
  url = new FormControl<string>('')

  addItem() {
    this.urls.push({
      name: this.name.getRawValue()!,
      url: this.url.getRawValue()!
    })
    console.log(this.urls)

  }


  removeItem(item: Url) {
    const index = this.urls.findIndex(f => f == item);
    if (index >= 0) {
      this.urls.splice(index, 1)
    }
  }
}
