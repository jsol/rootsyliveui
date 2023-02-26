import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

const CHAT_URL = "ws://localhost:8080";
export interface Identifier {
  id: string;
  name: string;
}

export interface Artist {
  id: string;
  name: string;
}

export interface Venue {
  id: string;
  name: string;
}

export interface Gig {
  id: string;
  name: string;
  date: string;
  venue: string;
  artists: string[];
}

export interface MsgData {
  artists: Artist[];
  venues: Venue[];
  gigs: Gig[]
}

export interface Cache {
  artists: Map<string, Artist>;
  venues: Map<string, Venue>;
  gigs: Map<string, Gig>
}

export interface Message {
  op: string;
  data: MsgData;
}

@Injectable()
export class WebsocketService {
  private subject: AnonymousSubject<MessageEvent>;
  public messages: Subject<Message>;
  public cache: Cache;

  constructor() {
    this.cache = {
      artists: new Map<string, Artist>(),
      venues: new Map<string, Venue>(),
      gigs: new Map<string, Gig>()
    }
    this.subject = this.create(CHAT_URL);
    this.messages = <Subject<Message>>this.subject.pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
      map(
        (response: MessageEvent): Message => {
          console.log(response.data);
          let data = JSON.parse(response.data)
          return data;
        }
      )
    );
    console.log ("Setting up new Websocket!")

    this.messages.subscribe((msg: Message) => {

      //this.options = msg.artists

      if (msg.op == 'set') {
        msg.data.venues.forEach((a: Venue) => {
          const existing = this.cache.venues.get(a.id)
          if (!existing) {
            this.cache.venues.set(a.id, a)
          }
        })
        msg.data.gigs.forEach((a: Gig) => {
          const existing = this.cache.gigs.get(a.id);
          if (!existing) {
            this.cache.gigs.set(a.id, a)
            console.log("Addid gig id", a.id)
          }
        })
        msg.data.artists.forEach((a: Artist) => {
          const existing = this.cache.artists.get(a.id);
          if (!existing) {
            this.cache.artists.set(a.id, a)
          }
        })
      }
    });
  }

  private create(url: any): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url, "rootsy-protocol");
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    let observer = {
      error: () => { },
      complete: () => { },
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}