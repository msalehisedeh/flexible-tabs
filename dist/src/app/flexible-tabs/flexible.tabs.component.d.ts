import { QueryList, AfterContentInit } from '@angular/core';
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
export declare class FlexibleTabComponent {
    hovered: boolean;
    selected: boolean;
    title: string;
    tabalticon: string;
    tabicon: string;
    template: any;
    sourceData: any;
    constructor();
    templateContext(): {
        data: any;
    };
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
    selectTab(index: any): void;
    hoverTab(index: any, flag: any): void;
}
