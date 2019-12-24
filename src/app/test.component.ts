import { Component } from '@angular/core';

import { DynamicTabContentComponent } from './flexible-tabs/flexible.tabs.component';

@Component({
  selector: 'test',
  template: `
    <h3>Dynamically loaded to display</h3>
    <p>Latest data arrived at: {{data.time}}</p>
    <p>This is a simple Dynamic tab content that will render {{data.name}} only if tab is selected.</p>
    `,
  styles: [``]
})
export class TestComponent implements DynamicTabContentComponent {
  data: any

  constructor() {
    console.log("TestComponent is created!");
  }
  activate(data: any, template?: any, helper?: any): void {
    this.data = data;
  }
  deactivate(): void {
    this.data = JSON.parse(JSON.stringify(this.data));
  }
}

@Component({
  selector: 'test',
  template: `
    <h3>Dynamically loaded to display</h3>
    <p>Latest data arrived at: {{data.time}}</p>
    <a href="www.google.com">Google it!</a>
    <p>This Dynamic content will render {{data.name}} from the same data instance shared with the other dynamic content tabs.</p>
    <p>located is on {{data.position.location}} will not be in shared data when this tab is not selected.</p>
    <a href="www.google.com">Really Google it!</a>
    <p>When this tab is not selected, data for this tab will not be shared data.</p>
    `,
  styles: [``]
})
export class TestComponent2 implements DynamicTabContentComponent {
  data: any

  constructor() {
    console.log("TestComponent2 is created!");
  }
  activate(data: any, template?: any, helper?: any): void {
    this.data = data;
  }
  deactivate(): void {
    this.data = JSON.parse(JSON.stringify(this.data));
  }
}
