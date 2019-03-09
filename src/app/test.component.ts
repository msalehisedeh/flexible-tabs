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
}
