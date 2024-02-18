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
	EventEmitter,
	Renderer2,
	OnInit
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
  /*
   * Will activate the component with given data.
   * @attribute data: initial data.
   * @arreibute template: if this component needs to have sub-template
   * @attribute helper: if component needs a helper.
   */
  activate(data: any, template?: any, helper?: any): void;

  /*
   * Will tell component to pause all activities and freez data till activation.
   * recommendation is for the component to eigther undefine data and handle it or use
   * JSON.parse(JSON.stringyfy(data)) to freez it and break away from pointer it has received in activation
   */
  deactivate(): void;
}

@Component({
	selector: 'flexible-tab',
	templateUrl: './flexible.tab.component.html',
	styleUrls: ['./flexible.tab.component.scss']
})
export class FlexibleTabComponent implements OnInit {

	hovered = false;
	index!: number;
	flexibleId!: string;
	dynamicComponent: any;

    @Input("selected")
    public selected = false;

    @Input("title")
	public title!: string;
	
	@Input("component")
	public component: any;

    @Input("tabalticon")
    public tabalticon!: string;

    @Input("tabicon")
    public tabicon!: string;

    @Input("template")
    public template: any;

    @Input("data")
	public sourceData: any;
	
	@Input("handler")
	public handler: any;

    constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private host: ElementRef,
		private appRef: ApplicationRef,
		private injector: Injector,
		private renderer: Renderer2,
		private detector: ChangeDetectorRef
	) {
	}

	ngOnInit() {
		this.renderer.setAttribute(this.host.nativeElement, 'id', this.flexibleId + '-panel-' + this.index);
		this.renderer.setAttribute(this.host.nativeElement, 'aria-labelledby', this.flexibleId + '-tab-' + this.index);
		this.renderer.setAttribute(this.host.nativeElement, 'role', "tabpanel");
		this.renderer.setAttribute(this.host.nativeElement, 'aria-labeledby', this.flexibleId + '-tab-' +  this.index);
		this.renderer.setAttribute(this.host.nativeElement, 'aria-hidden', this.selected ? 'false':'true');
		this.host.nativeElement.style.display="selected ? 'block':'none'" 
	}

	templateContext() {
		return {data: this.sourceData };
	}
	deactivate(deselect: boolean): void {
		if (deselect) {
			this.renderer.setAttribute(this.host.nativeElement, 'tabIndex', '-1');
			this.renderer.setStyle(this.host.nativeElement, 'display', 'none');
			if(this.selected) {
				this.selected = false;
				if (this.dynamicComponent) {
					const instance = (<DynamicTabContentComponent>this.dynamicComponent.instance);
					instance.deactivate();
				}
			}
		}
		this.hovered = false;
		this.detector.detectChanges();
	}
	activate(): void {
		if (!this.selected) {
			this.selected = true;
			this.detector.detectChanges();
			this.renderer.setAttribute(this.host.nativeElement, 'tabIndex', '0');
			this.renderer.setStyle(this.host.nativeElement, 'display', 'block');
			if (this.component) {
				this.initializeDynamicComponent();
				const instance = (<DynamicTabContentComponent>this.dynamicComponent.instance);
				instance.activate(this.sourceData, this.template, this.handler);
			}
		}
	}
	hover(flag: boolean): void {
		this.hovered = flag;
		this.detector.detectChanges();
	}
	private initializeDynamicComponent() {
		if (!this.dynamicComponent) {
			this.dynamicComponent = this.componentFactoryResolver
				.resolveComponentFactory(this.component)
				.create(this.injector);

			this.appRef.attachView(this.dynamicComponent.hostView);
			this.host.nativeElement.appendChild((this.dynamicComponent.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);
		}
	}
}


@Component({
	selector: 'flexible-tabs',
	templateUrl: './flexible.tabs.component.html',
	styleUrls: ['./flexible.tabs.component.scss']
})
export class FlexibleTabsComponent implements AfterContentInit  {
	tabs: any[] = [];
	selectedIndex = -1;
	isIconified = false;
	popped = false;

	@ContentChildren(FlexibleTabComponent)
	children!: QueryList<FlexibleTabComponent>;

    @Input("position")
    public position = TabPositions.top;

    @Input("type")
    public type = TabTypes.tab;

    @Input("pophover")
    public pophover = false;

    @Input("message")
    public message = "Click to select tab. Use arrow keys to navigate to other tabs.";

	@Input("flexibleId")
	public flexibleId = '';

	@Input("collapsed")
	public collapsed = false;
	
	@Output('onchange')
	private onchange = new EventEmitter();

    constructor() {}

	ngAfterContentInit() {
		let defaultIndex =  this.pophover ? -1 : 0;
		this.tabs = [];
		this.isIconified = false;

		this.children.forEach((tabInstance, index) => {
			tabInstance.index = index;
			tabInstance.flexibleId = this.flexibleId;
			if(tabInstance.selected) {
				defaultIndex = index;
			}
				this.isIconified = true;
			if (tabInstance.tabicon || tabInstance.tabalticon) {
				this.isIconified = true;
			}
			this.tabs.push(tabInstance);
		});
		if (this.tabs.length) {
			this.selectTab( defaultIndex );
		} else {
			this.selectedIndex = defaultIndex;
		}
	}

	keyup(event: any, index: number) {
		const code = event.which;
		let id!: any;
		
		if (code === 13) {
			event.target.click();
		} else if (code === 37 && (this.position === 'top' || this.position === 'bottom')) { // left arrow
			id = document.getElementById(this.flexibleId + '-tab-' + (index - 1));
		} else if (code === 39 && (this.position === 'top' || this.position === 'bottom')) {// rght arrow
			id = document.getElementById(this.flexibleId + '-tab-' + (index + 1));
		} else if (code === 38 && (this.position === 'left' || this.position === 'right')) { // up arrow
			id = document.getElementById(this.flexibleId + '-tab-' + (index + 1));
		} else if (code === 40 && (this.position === 'left' || this.position === 'right')) {// down arrow
			id = document.getElementById(this.flexibleId + '-tab-' + (index - 1));
		}
		if (id) {
			event.preventDefault();
			event.stopPropagation();
			id.focus();
			return false;
		}
		return true;
	}
	selectTab(index: number) {
		if (this.selectedIndex != index) {
			this.tabs.map((tab)=>{
				tab.deactivate(true);
			});
			if (index > -1) {
				this.tabs[index].activate();
				this.selectedIndex = index;
				this.popped = true;
				this.onchange.emit({
					selectedIndex: index,
					selectedTitle: this.tabs[index].title
				});
			}
		}
	}
	hoverTab(index: number, flag: boolean) {
		if (this.pophover) {
			this.tabs.map((tab)=>{
				tab.deactivate(false);
			});
			if (index > -1){
				this.tabs[index].hover(flag);
			}
			this.popped = this.selectedIndex > -1 || flag;
		}
	}
}
