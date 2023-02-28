import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { WebsocketService, TemplateInfo } from "../websocket.service";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-templated-text',
  templateUrl: './templated-text.component.html',
  styleUrls: ['./templated-text.component.css']
})

export class TemplatedTextComponent implements OnInit {
  templates: TemplateInfo[] = [];
  template?: TemplateInfo;
  fc: FormControl<string>;
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() type: string = '';
  @Input() replace: (str:string) => string = (str:string) => str;
  @Output() valueChange = new EventEmitter<string>();

  constructor(private WebsocketService: WebsocketService) {
    this.fc = new FormControl();

    this.WebsocketService = WebsocketService
  }

  applyTemplate() {
    console.log('ApplyTemplate: ', this.template)

    if (this.template) {
      this.fc.setValue(this.replace(this.template.text))
    }
  }

  ngOnInit() {
    if (this.WebsocketService.settings.templates[this.type]) {
      this.WebsocketService.settings.templates[this.type].forEach(t => {
        this.templates.push(t);
      })
    }

    this.fc.setValue(this.value)

    this.fc.valueChanges.subscribe((str: string) => {
      this.valueChange.emit(str)
    })
  }
}
