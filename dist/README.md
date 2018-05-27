
# Welcome to Flexible tabs!

Have you ever wanted to have a simple way of creating robust tabs in your components? Have you thought of what it takes to get there? With flexible tabs, you can configure position of rabs and how they should be displayed.  You can feed icons to the tabs and have a view area for displaying images.. You can have the view area to be rendered only if selected and watch for tab selection events to perform additional tasks.

Please send your requests or comments through the link provided below:

[Live Demo](https://flexible-tabs.stackblitz.io)  | [Source code](https://github.com/msalehisedeh/flexible-tabs) | [Comments/Requests](https://github.com/msalehisedeh/flexible-tabs/issues)



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


You need to set the tabs tag in your HTML content:
```javascript
1) myPosition can optionally be equal to top,left,right, bottom
2) myType can optionally be equal to tab, button, plain, image

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