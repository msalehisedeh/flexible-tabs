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
	ChangeDetectorRef,
	Injector,
	ComponentFactoryResolver,
	EmbeddedViewRef,
	ElementRef,
    ApplicationRef,
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

export interface DynamicTabContentComponent {
	data: any;
}

@Component({
	selector: 'flexible-tab',
	templateUrl: './flexible.tab.component.html',
	styleUrls: ['./flexible.tab.component.scss']
})
export class FlexibleTabComponent {

	hovered = false;
	dynamicComponent: any;

    @Input("selected")
    public selected = false;

    @Input("title")
	public title: string;
	
	@Input("component")
	public component: any;

    @Input("tabalticon")
    public tabalticon: string;

    @Input("tabicon")
    public tabicon: string;

    @Input("template")
    public template: any;

    @Input("data")
    public sourceData: any;

    constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private appRef: ApplicationRef,
		private injector: Injector,
		private host: ElementRef,
		public detector: ChangeDetectorRef
	) {}

	templateContext() {
		return {data: this.sourceData };
	}
	dynamicallyLoadedComponent() {
		if (this.component) {
			if (this.selected) {
				this.initializeDynamicComponent();
				const instance = (<DynamicTabContentComponent>this.dynamicComponent.instance);
				this.host.nativeElement.append((this.dynamicComponent.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);
				instance.data = this.sourceData;
			} else if (this.dynamicComponent) {
				this.host.nativeElement.innerHTML = "";
			}
		}
		return false;
	}
	private initializeDynamicComponent() {
		if (!this.dynamicComponent) {
			this.dynamicComponent = this.componentFactoryResolver
				.resolveComponentFactory(this.component)
				.create(this.injector);

			this.appRef.attachView(this.dynamicComponent.hostView);
		}
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

	keyup(event: any) {
        const code = event.which;
		
		if (code === 13) {
			event.target.click();
		}
	}
	selectTab(index: number) {
		this.tabs.map((tab)=>{
			tab.selected = false;
			tab.hovered = false;
			tab.detector.detectChanges();
		});
		if (index > -1) {
			this.tabs[index].selected = true;
			this.tabs[index].detector.detectChanges();
			this.selectedIndex = index;
			this.popped = true;
			this.onchange.emit({
				selectedIndex: index,
				selectedTitle: this.tabs[index].title
			});
		}
	}
	hoverTab(index: number, flag: boolean) {
		if (this.pophover) {
			this.tabs.map((tab)=>{
				tab.hovered = false;
				tab.detector.detectChanges();
			});
			if (index > -1){
				this.tabs[index].hovered = flag;
				this.tabs[index].detector.detectChanges();
			}
			this.popped = this.selectedIndex > -1 || flag;
		}
	}
}
