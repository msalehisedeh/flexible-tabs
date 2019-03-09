import { Component } from '@angular/core';
import {TestComponent } from './test.component';

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
    time: undefined,
    name: "Joe finderburger"
  }
  
  constructor() {

  }

  myComponent() {
    return TestComponent;
  }
  ontabselection(event) {
    this.data.time = Date.now();
    this.events.push(event);
  }
}
