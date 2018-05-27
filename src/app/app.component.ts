import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Flexible Tabs';
  myPosition="top"
  myType="tab"
  events= [];

  data = {
    x: 1,
    name: "Joe finderburger"
  }
  
  constructor() {

  }

  ontabselection(event) {
    this.events.push(event);
  }
}
