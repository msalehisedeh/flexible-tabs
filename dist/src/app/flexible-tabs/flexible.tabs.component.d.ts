import { QueryList, AfterContentInit, ChangeDetectorRef, Injector, ComponentFactoryResolver, ElementRef, ApplicationRef } from '@angular/core';
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
    data: any;
}
export declare class FlexibleTabComponent {
    private componentFactoryResolver;
    private appRef;
    private injector;
    private host;
    detector: ChangeDetectorRef;
    hovered: boolean;
    dynamicComponent: any;
    selected: boolean;
    title: string;
    component: any;
    tabalticon: string;
    tabicon: string;
    template: any;
    sourceData: any;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector, host: ElementRef, detector: ChangeDetectorRef);
    templateContext(): {
        data: any;
    };
    dynamicallyLoadedComponent(): boolean;
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
    private onchange;
    constructor();
    ngAfterContentInit(): void;
    keyup(event: any): void;
    selectTab(index: number): void;
    hoverTab(index: number, flag: boolean): void;
}
