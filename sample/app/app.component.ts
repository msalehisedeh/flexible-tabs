import { Component } from '@angular/core';
import { TestComponent, TestComponent2 } from './test.component';
import { TabPositions, TabTypes } from '@sedeh/flexible-tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Flexible Tabs';
  myPosition: TabPositions = TabPositions.top;

  myType: TabTypes = TabTypes.tab;
  events: any[] = [];

  data: any = {
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
  changePosition(key: string) {
    switch(key) {
      case 'top': this.myPosition = TabPositions.top; break;
      case 'bottom': this.myPosition = TabPositions.bottom; break;
      case 'left': this.myPosition = TabPositions.left; break;
      case 'right': this.myPosition = TabPositions.right; break;
    }
  }
  changeType(key: string) {
    switch(key) {
      case 'button': this.myType = TabTypes.button; break;
      case 'icon': this.myType = TabTypes.icon; break;
      case 'plain': this.myType = TabTypes.plain; break;
      case 'radio': this.myType = TabTypes.radio; break;
      case 'tab': this.myType = TabTypes.tab; break;
    }
  }
  isSelectedPosition(key: string) {
    let flag = false;
    switch(key) {
      case 'top': flag = this.myPosition === TabPositions.top; break;
      case 'bottom': flag = this.myPosition === TabPositions.bottom; break;
      case 'left': flag = this.myPosition === TabPositions.left; break;
      case 'right': flag = this.myPosition === TabPositions.right; break;
    }
    return flag;
  }
  isSelectedType(key: string) {
    let flag = false;
    switch(key) {
      case 'button': flag = this.myType === TabTypes.button; break;
      case 'icon': flag = this.myType === TabTypes.icon; break;
      case 'plain': flag = this.myType === TabTypes.plain; break;
      case 'radio': flag = this.myType === TabTypes.radio; break;
      case 'tab': flag = this.myType === TabTypes.tab; break;
    }
    return flag;
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
