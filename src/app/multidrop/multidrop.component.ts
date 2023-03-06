import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { WebsocketService, Identifier } from "../websocket.service";


@Component({
  selector: 'app-multidrop',
  templateUrl: './multidrop.component.html',
  styleUrls: ['./multidrop.component.css']
})
export class MultidropComponent implements OnInit {
  myControl = new FormControl<string | Identifier>('');
  options: Identifier[] = [];
  filteredOptions!: Observable<Identifier[]>;
  @Input() selected = new Set<Identifier>();
  @Input() type: string = 'artists';

  constructor(private WebsocketService: WebsocketService) {
    this.WebsocketService = WebsocketService

  }

  ngOnInit() {
    type key = keyof typeof this.WebsocketService.cache

    this.WebsocketService.messages.subscribe(msg => {

      type key = keyof typeof msg.data
      //this.options = msg.artists

      console.log(this.type)

      msg.data[this.type as key].forEach(a => {
        const found = this.options.find(c => c.id == a.id)
        if (!found) {
          this.options.push(a)
        }
      })
      this.myControl.reset()
    });

    this.WebsocketService.cache[this.type as key]!.forEach((v, k) => {
      const found = this.options.find(c => c.id == k)
      if (!found) {
        this.options.push(v)
      }
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;

        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  removeItem(a: Identifier) {
    this.selected.delete(a)
  }

  addItem() {
    const val = this.myControl.getRawValue()
    if (val != null && typeof val === 'object') {
      this.selected.add(val)
    }
    this.myControl.reset()
  }

  displayFn(user: Identifier): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Identifier[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }


}

