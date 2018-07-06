/*
* Provides rendering of a table which is using the given FlexibleTableHeader set in
* order to tabulate the given data. As per definition of earch header component,
* a column could be hidden, sortable, or draggable. Each table row can expand/collapse
* or respond to a click action.
*/
import {
    Component,
	Input,
	Output,
	ContentChildren,
	QueryList,
	AfterContentInit,
	EventEmitter
} from '@angular/core';

export enum TabTypes {
	button = "button", 
	tab = "tab", 
	plain = "plain", 
	icon = "icon", 
	radio = "radio"
}

export enum TabPositions {
	top = "top", 
	left = "left", 
	right = "right", 
	bottom = "bottom"
}

@Component({
	selector: 'flexible-tab',
	templateUrl: './flexible.tab.component.html',
	styleUrls: ['./flexible.tab.component.scss']
})
export class FlexibleTabComponent {

	hovered = false;

    @Input("selected")
    public selected = false;

    @Input("title")
    public title: string;

    @Input("tabalticon")
    public tabalticon: string;

    @Input("tabicon")
    public tabicon: string;

    @Input("template")
    public template: any;

    @Input("data")
    public sourceData: any;

    constructor() {}

	templateContext() {
		return {data: this.sourceData };
	}
}


@Component({
	selector: 'flexible-tabs',
	templateUrl: './flexible.tabs.component.html',
	styleUrls: ['./flexible.tabs.component.scss']
})
export class FlexibleTabsComponent implements AfterContentInit  {
	tabs = [];
	selectedIndex = -1;
	isIconified = false;
	popped = false;

	@ContentChildren(FlexibleTabComponent)
	children: QueryList<FlexibleTabComponent>;

    @Input("position")
    public position = TabPositions.top;

    @Input("type")
    public type = TabTypes.tab;

    @Input("pophover")
    public pophover = false;

    @Input("message")
    public message = "click to select tab ";

	@Output('onchange')
	private onchange = new EventEmitter();

    constructor() {}

	ngAfterContentInit() {
		this.tabs = [];
		this.selectedIndex = this.pophover ? -1 : 0;
		this.isIconified = false;

		this.children.forEach((tabInstance, index) => {
			if(tabInstance.selected) {
				this.selectedIndex = index;
			}
				this.isIconified = true;
			if (tabInstance.tabicon || tabInstance.tabalticon) {
				this.isIconified = true;
			}
			this.tabs.push(tabInstance);
		});
		if (this.tabs.length) {
			this.selectTab( this.selectedIndex );
		}
	}

	keyup(event) {
        const code = event.which;
		
		if (code === 13) {
			event.target.click();
		}
	}
	selectTab(index) {
		this.tabs.map((tab)=>{
			tab.selected = false;
			tab.hovered = false;
		});
		if (index > -1) {
			this.tabs[index].selected = true;
			this.selectedIndex = index;
			this.popped = true;
			this.onchange.emit({
				selectedIndex: index,
				selectedTitle: this.tabs[index].title
			});
		}
	}
	hoverTab(index, flag) {
		if (this.pophover) {
			this.tabs.map((tab)=>{
				tab.hovered = false;
			});
			if (index > -1){
				this.tabs[index].hovered = flag;
			}
			this.popped = this.selectedIndex > -1 || flag;
		}
	}
}
