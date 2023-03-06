import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";

export interface Identifier {
  id: string;
  name: string;
}

export interface Url {
  name: string;
  url: string;
}

export interface Artist {
  id: string;
  name: string;
  form: string;
  bio: string;
  urls: Url[];
  files: File[]
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  address: string;
  urls: Url[];
}
export interface File {
  serverName: string;
  localName: string;
  size: number;
}

export interface Promoter {
  id: string;
  name: string;
  email: string;
  phone: string;
  orgNbr: string;
  orgType: string;
  urls: Url[];
}

export interface Gig {
  id: string;
  name: string;
  date: string;
  openTime: string;
  venue: string;
  state: string;
  guarantee: string;
  hospitality: string;
  publicDate: string;
  notes: string;
  ticketPrices: string;
  entourage: string;
  special: string;
  contractText: string;
  files: File[];
  urls: Url[];
  promoters: string[];
  artists: string[];
}

export interface Signature {
  id: string;
  name: string;
  org: string;
  signature: string;
  time: string;
}

export interface Contract {
  id: string;
  name: string;
  gig: string;
  text: string;
  shasum: string;
  published: string;
  signatures: Signature[]
}

export interface MsgData {
  artists: Artist[];
  venues: Venue[];
  gigs: Gig[];
  promoters: Promoter[];
  contracts: Contract[];
}

export interface Cache {
  artists: Map<string, Artist>;
  venues: Map<string, Venue>;
  gigs: Map<string, Gig>
  promoters: Map<string, Promoter>,
  contracts: Map<string, Contract>
}

export interface TemplateInfo {
  id: string;
  name: string;
  text: string;
}
export interface Template {
  [name: string]: TemplateInfo[]
}

export interface Option {
  [name: string]: string[];
}

export interface Settings {
  options: Option,
  templates: Template
}

export interface DeleteData{
  id: string;
  type: string;
}

export interface Message {
  op: string;
  data: MsgData;
  settings?: Settings;
  auth?: string;
  delete?: DeleteData;
}

function copy(from: any, to: any) {

}

@Injectable()
export class WebsocketService {
  private subject: AnonymousSubject<MessageEvent>;
  public messages: Subject<Message>;
  public cache: Cache;
  public settings: Settings = { options: {}, templates: {} };

  token = '';
  user: SocialUser | null;
  loggedIn: boolean = false;


  constructor(private authService: SocialAuthService) {
    this.user = null
    this.cache = {
      artists: new Map<string, Artist>(),
      venues: new Map<string, Venue>(),
      gigs: new Map<string, Gig>(),
      promoters: new Map<string, Promoter>(),
      contracts: new Map<string, Contract>()
    }
    this.subject = this.create(environment.wsUrl);
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

    if (environment.googleAuth) {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        const m = this.emptyMessage('auth')
        m.auth = this.user.idToken

        this.messages.next(m)
      });
    } else {
      setTimeout(() => {
        const m = this.emptyMessage('auth')
        m.auth = 'fakeToken'
        this.messages.next(m)
      }, 200);
    }


    console.log("Setting up new Websocket!")

    this.messages.subscribe((msg: Message) => {

      //this.options = msg.artists

      if (msg.op == 'auth') {
        this.user = null;
        this.loggedIn = false
        return
      }

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
          } else {
          }
        })
        msg.data.artists.forEach((a: Artist) => {
          const existing = this.cache.artists.get(a.id);
          if (!existing) {
            this.cache.artists.set(a.id, a)
          }
        })
        msg.data.promoters.forEach((a: Promoter) => {
          const existing = this.cache.promoters.get(a.id);
          if (!existing) {
            this.cache.promoters.set(a.id, a)
          }
        })
        msg.data.contracts.forEach((a: Contract) => {
          const existing = this.cache.contracts.get(a.id);
          if (!existing) {
            this.cache.contracts.set(a.id, a)
          }
        })


        if (msg.settings) {
          if (msg.settings.options) {
            for (const [key, value] of Object.entries(msg.settings.options)) {
              this.settings.options[key] = value;
            }
          }
          if (msg.settings.templates) {
            for (const [key, value] of Object.entries(msg.settings.templates)) {
              this.settings.templates[key] = value;
            }
          }
        }
      }
    });
  }

  emptyMessage(type: string): Message {
    return {
      op: type,
      data: {
        artists: [],
        venues: [],
        gigs: [],
        promoters: [],
        contracts: []
      },
      settings: {
        options: {},
        templates: {}
      }
    }
  }

  inUse(id: string, type: string): Gig|null {
    let inUse = null;
    this.cache.gigs.forEach(gig => {
      if (type == 'artists' && gig.artists.includes(id)) {
        inUse = gig
      }
      if (type == 'promoters' && gig.promoters.includes(id)) {
        inUse = gig
      }
      if (type == 'venues' && gig.venue == id) {
        inUse = gig
      }
    })

    return inUse;
  }

  signOut(): void {
    this.authService.signOut();
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