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
	ViewContainerRef,
	EventEmitter
} from '@angular/core';

@Component({
	selector: 'flexible-tab',
	templateUrl: './flexible.tab.component.html',
	styleUrls: ['./flexible.tab.component.scss']
})
export class FlexibleTabComponent {

    @Input("selected")
    public selected: boolean;

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

	@ContentChildren(FlexibleTabComponent) children: QueryList<FlexibleTabComponent>;

    @Input("position")
    public position: string; // top, left, bottom, right

    @Input("type")
    public type: string; // button, tab, plain, icon, radio

    @Input("message")
    public message = "click to select tab ";

	@Output('onchange')
	private onchange = new EventEmitter();

    constructor() {}

	ngAfterContentInit() {
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
		});
		this.tabs[index].selected = true;
		this.selectedIndex = index;
		this.onchange.emit({
			selectedIndex: index,
			selectedTitle: this.tabs[index].title
		});
	}
}
