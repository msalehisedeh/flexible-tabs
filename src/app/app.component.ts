import { Component } from '@angular/core';
import { TestComponent, TestComponent2 } from './test.component';

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
  myComponent2() {
    return TestComponent2;
  }
  ontabselection(event: any) {
    this.data.time = Date.now();
    if (event.selectedTitle === 'Dynamic') {
      if (this.data['position']) 
        delete this.data['position'];
    } else {
      this.data['position'] = {
        location: this.myPosition
      };
    }
    this.events.push(event);
  }
}
