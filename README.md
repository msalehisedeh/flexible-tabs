
# Welcome to Flexible tabs!

Have you ever wanted to have a simple way of creating robust tabs in your components? Have you thought of what it takes to get there? With flexible tabs, you can configure position of tabs and how they should be displayed.  You can feed icons to the tabs and have a view area for displaying images.. You can have the view area to be rendered only if selected and watch for tab selection events to perform additional tasks.

**NOTE:** Starting with version 1.1.0 this library is compatible with Angular 6+.

Please send your requests or comments through the link provided below:

[Live Demo](https://flexible-tabs.stackblitz.io)  | [Source code](https://github.com/msalehisedeh/flexible-tabs/tree/master/src/app) | [Comments/Requests](https://github.com/msalehisedeh/flexible-tabs/issues)


# Version 1.1.0
Updated libraries to become compatible with Angular 6+. 


# Version 1.0.2
set defaults for some attributes. 

# Version 1.0.0
Compiled with AOT option and resolved issues. 

# Version 0.0.1


```javascript
MODULE:
  FlexibleTabsModule

EXPORTS:
  FlexibleTabComponent
  FlexibleTabsComponent
```

## Features
* Responsive
* ADA Compliant
* Configurable tab position
* Configurable tab display type

## flexible-tabs Attributes

| Attribute | Options                         | Default | Description                                         |
|-----------|---------------------------------|---------|-----------------------------------------------------|
| position  | top, left, right, bottom        | top     | Tabs displaying position with respect to view port. |
| type      | tab, button, plain, icon, radio | tab     | Presentation of each tab.                           |
| pophover  | true/false                      | false   | If act like a menu and if tab content should be hidden and should pop on hover.          |
| message   | any string                      | "click to select tab " | ADA compliant message on each tab to be used by screen reader.  |

## flexible-tab Attributes

| Attribute  | Options                         | Default | Description                                         |
|------------|---------------------------------|---------|-----------------------------------------------------|
| selected   | true/false                      | false   | By default the first tab will be selected.          |
| template   | ng-template                     | none    | Template to be used at runtime to display content for selected tab. |
| data       | JSON                            | none    | Data to be sent to the template for selected tab.   |
| title      | any string                      | ""      | tab to be used by screen readername to be displayed.|
| tabicon    | any string                      | null    | icon to be displayed on tab.                        |
| tabalticon | any string                      | null    | icon to be displayed on selected tab or on tab hover.|


### How it can be done?

You will need to set the tabs in your HTML content:
```javascript
In this example:
1) first tab is static and Angular will render it immediately.
2) second tab is template and angular will render it only if respective tab for it is selected.

<flexible-tabs 
  [position]="myPosition" 
  [type]="myType" 
  message="click to select tab " 
  (onchange)="ontabselection($event)">
  
  <flexible-tab title="tab 1" tabicon="fa fa-bug" tabalticon="fa fa-coffee">
    <h3> information</h3>
    This is a simple tab content that will be rendered immediately even if tab is not selected.  
  </flexible-tab>
  <flexible-tab title="tab 2" [template]="tab2" [data]="data" selected="true"></flexible-tab>
</flexible-tabs>

<ng-template #tab2 let-detail="data">
  <h3>Detail information about {{detail.name}}</h3>
  This is a simple tab content that will be rendered only if tab is selected.
</ng-template>
```

You will also need to implement a few functions

```javascript
  ontabselection(event) {
    // decide on what to do with the evet
  }
```

If you want to overide any parts of default look, you can use ::ng-deep and do the following:
```javascript
CSS Example:

::ng-deep .tab-title {
    text-transform: capitalize;
}
```

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