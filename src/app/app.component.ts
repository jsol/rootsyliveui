
import { Component } from '@angular/core';
import { WebsocketService, Artist } from "./websocket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [WebsocketService]
})

export class AppComponent {
  title = 'Rootsy Live';
  content = '';
  received: Artist[] = [];
  sent = [];

}