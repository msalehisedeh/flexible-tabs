
# Welcome to Flexible tabs!

Have you ever wanted to have a simple way of creating robust tabs in your application? Have you thought of what it takes to get there? With flexible tabs, you can configure position of tabs and how they should be displayed.  You can feed icons to the tabs and have a view area for displaying images. You can have the view area to be rendered only if selected and watch for tab selection events to perform additional tasks. And most of all, you can have contents of each tab dynamically loaded!!

**NOTE:** Starting with version 1.1.0 this library is compatible with Angular 6+.

**NOTE:** Starting with version 1.2.1 you need to import this library through @sedeh/flexible-tabs.

Please send your requests or comments through the link provided below:

[Live Demo](https://stackblitz.com/edit/flexible-tabs?file=src%2Fapp%2Fapp.component.ts)  | 
[NPM](https://www.npmjs.com/package/@sedeh/flexible-tabs) | 
[Comments/Requests](https://github.com/msalehisedeh/flexible-tabs/issues)


## Features

* Responsive
* ADA Compliant
* Configurable tab position
* Configurable tab display type

## Dependencies

```javascript
MODULE:
  FlexibleTabsModule

INTERFACE:
  DynamicTabContentComponent

ENUM:
  TabTypes
  TabPositions

EXPORTS:
  FlexibleTabComponent
  FlexibleTabsComponent
```

## flexible-tabs Attributes

| Attribute | Options                         | Default | Description                                         |
|-----------|---------------------------------|---------|-----------------------------------------------------|
| position  | top, left, right, bottom        | top     | Tabs displaying position with respect to view port. |
| type      | tab, button, plain, icon, radio | tab     | Presentation of each tab.                           |
| pophover  | true/false                      | false   | If act like a menu and if tab content should be hidden and should pop on hover.          |
| message   | any string                      | ->1     | ADA compliant message on each tab to be used by screen reader.  |

->1: `Click to select tab. Use arrow keys to navigate to other tabs.`

## flexible-tab Attributes

| Attribute  | Options                         | Default | Description                                         |
|------------|---------------------------------|---------|-----------------------------------------------------|
| selected   | true/false                      | false   | By default the first tab will be selected.          |
| component  | a DynamicTabContentComponent    | none    | Implementation of DynamicTabContentComponent to be loaded at runtime for displaying content of a selected tab. |
| handler    | a ref object                    | none    | An object that is not a service but the component may rely on (i.e., a ViewRef or an ElementRef, ...).|
| template   | ng-template                     | none    | Template to be used at runtime for displaying content of selected tab. |
| data       | JSON                            | none    | Data to be sent to the template for selected tab.   |
| title      | any string                      | ""      | tab name to be displayed.                           |
| tabicon    | any string                      | null    | icon to be displayed on tab.                        |
| tabalticon | any string                      | null    | icon to be displayed on selected tab or on tab hover.|
| collapsed  | boolean                         | false   | if should add collapsed class to tabs.              |


### How it can be done?

You will need to set the tabs in your HTML content:
```javascript
In this example:
1) first tab is static and Angular will render it immediately.
2) second tab is template and angular will render it only if respective tab for it is selected.
3) third tab is dynamically loaded component.

<flexible-tabs 
  [position]="myPosition" 
  [type]="myType" 
  [collapsed]="false"
  message="click to select tab " 
  (onchange)="ontabselection($event)">
  
  <flexible-tab title="tab 1" tabicon="fa fa-bug" tabalticon="fa fa-coffee">
    <h3> information</h3>
    This is a simple tab content that will be rendered immediately even if tab is not selected.  
  </flexible-tab>
  <flexible-tab title="tab 2" [template]="tab2" [data]="data" selected="true"></flexible-tab>
  <flexible-tab title="tab 3" [component]="myComponentClassName()" [data]="data"></flexible-tab>
</flexible-tabs>

<ng-template #tab2 let-detail="data">
  <h3>Detail information about {{detail.name}}</h3>
  This is a simple tab content that will be rendered only if tab is selected.
</ng-template>
```

You will also need to implement a few functions

```javascript
  import { TestComponent } from './my-test.component';
  myComponentClassName() {
    return TestComponent; // not an instance. returns actual component class.
  }
  ontabselection(event) {
    // decide on what to do with the evet
  }
```

If you are taking advantage of runtime dynamic component, you need to make sure it is declared in parent/root NgModule and it is included in entryComponents and declarations.

```javascript
@NgModule({
  declarations: [AppComponent, TestComponent],
  entryComponents: [TestComponent],
  imports: [BrowserModule,HttpModule,FlexibleTabsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
In addition your component should be implementation of DynamicTabContentComponent. data, template, and handler given to this component will be the same data you pass to **flexible-tab** tag. `<flexible-tab title="tab 3" [component]="myComponentClassName()" [data]="data" [template]="myTemplate" [handler]="myHandler"></flexible-tab>`
```javascript
@Component({
  selector: 'test',
  template: `<h3>Dynamically loaded to display {{data ? data.name : 'blank'}}</h3>`,
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
    // set data to undefined or deep copy it.
    this.data = JSON.parse(JSON.stringify(this.data));
  }
}
```

If you want to override any parts of default look, you can use ::ng-deep and do the following:
```javascript
CSS Example:

::ng-deep .tab-title {
    text-transform: capitalize;
}
```

## Revision History

| Version | Description                                                                        |
|---------|------------------------------------------------------------------------------------|
| 3.0.0   | Upgraded to Angular 15.                                                            |
| 2.0.0   | Upgraded to Angular 8.                                                             |
| 1.3.7   | Dependencies updated.                                                              |
| 1.3.6   | IE11 still had some issues. Made few adjustments to improve performance.           |
| 1.3.5   | Fixed issue with dynamic component loading and IE issue. Updated tab indexing to allow a key press on tab key push the focus inside selected tab area. to select other tabs, a right/left or up/down arrow key would do the trick. |
| 1.3.4   | Needed to have tabs behave like menu in an app so i am adding collapsed attribute. if value is true, a collapsed class will be added to tabs wrapper div. You should be able to override css of tabs and make the tabs display like a menu if you want to do so. Then use an event to toggle collapsed attribute to true / false in order to add / remove collapsed class to / from the tabs. if you listen to the onchange event, once a tab is selected, you can use that as a feedback mechanism to toggle the collapsed attribute back to the tabs. |
| 1.3.3   | With apologies in advance, just in case if you already started using the interface, modified interface for dynamic component loading. In case of complex situations, you may need to have a component that relies on some templates or you may want to pass a helper object to it. So, if you have a component for a tab and also assign a template or a json of templates to the tab, the component will be loaded and template value of tab will be passed to it. For helper object, added dynamicComponentHandler attribute. |
| 1.3.2   | Realized if multiple components are dynamically loaded, they could end up sharing the dame data while expecting different node hierarchy. as a result, modified code to break the sharing of data if a tab content goes of screen when not selected.  |
| 1.3.1   | Forgot to export newly added interface.                                            |
| 1.3.0   | Allowing tabs use dynamically loaded components to display contents.               |
| 1.2.3   | Fixed the ExpressionChangedAfterItHasBeenCheckedError                              |
| 1.2.2   | Fixed the ExpressionChangedAfterItHasBeenCheckedError                              |
| 1.2.1   | Updated dependencies.                                                              |
| 1.2.0   | It was brought to my attention that some users have trouble using my components in their angular 6 environment. Since I had only updated few dependencies when moved to Angular 6, I am thinking dependencies are causing issues. So, for this release, I am updating all dependencies to what Angular 6 applications are expecting to have. Please let me know if this is fixing or not fixing any issues you are facing. |
| 1.1.0   | Updated libraries to become compatible with Angular 6+.                            |
| 1.0.2   | set defaults for some attributes.                                                  |
| 1.0.0   | Compiled with AOT option and resolved issues.                                      |
| 0.0.1   | Initial release.                                                                   |


![alt text](https://raw.githubusercontent.com/msalehisedeh/flexible-tabs/master/sample.png  "What you would see when a flexible tabs is used")


### How to include font-awesome in your project?

In your project root folder, find and open the file 'angular-cli.json' in any editor 
Locate the styles[] array and add font-awesome references directory. like:

```javascript
"apps": 
	[
        {
            ....
            "styles": [
              "../node_modules/font-awesome/css/font-awesome.css"
              "styles.css"
            ],
            ...
        }
    ]
```