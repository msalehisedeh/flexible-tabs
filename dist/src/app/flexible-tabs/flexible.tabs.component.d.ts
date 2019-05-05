import { QueryList, AfterContentInit, ChangeDetectorRef, Injector, ComponentFactoryResolver, ElementRef, ApplicationRef, Renderer2, OnInit } from '@angular/core';
export declare enum TabTypes {
    button = "button",
    tab = "tab",
    plain = "plain",
    icon = "icon",
    radio = "radio",
}
export declare enum TabPositions {
    top = "top",
    left = "left",
    right = "right",
    bottom = "bottom",
}
export interface DynamicTabContentComponent {
    activate(data: any, template?: any, helper?: any): void;
    deactivate(): void;
}
export declare class FlexibleTabComponent implements OnInit {
    private componentFactoryResolver;
    private host;
    private appRef;
    private injector;
    private renderer;
    private detector;
    hovered: boolean;
    index: number;
    flexibleId: string;
    dynamicComponent: any;
    selected: boolean;
    title: string;
    component: any;
    tabalticon: string;
    tabicon: string;
    template: any;
    sourceData: any;
    handler: any;
    constructor(componentFactoryResolver: ComponentFactoryResolver, host: ElementRef, appRef: ApplicationRef, injector: Injector, renderer: Renderer2, detector: ChangeDetectorRef);
    ngOnInit(): void;
    templateContext(): {
        data: any;
    };
    deactivate(deselect: boolean): void;
    activate(): void;
    hover(flag: boolean): void;
    private initializeDynamicComponent();
}
export declare class FlexibleTabsComponent implements AfterContentInit {
    tabs: any[];
    selectedIndex: number;
    isIconified: boolean;
    popped: boolean;
    children: QueryList<FlexibleTabComponent>;
    position: TabPositions;
    type: TabTypes;
    pophover: boolean;
    message: string;
    flexibleId: string;
    collapsed: boolean;
    private onchange;
    constructor();
    ngAfterContentInit(): void;
    keyup(event: any, index: number): boolean;
    selectTab(index: number): void;
    hoverTab(index: number, flag: boolean): void;
}
