import { QueryList, AfterContentInit } from '@angular/core';
export declare class FlexibleTabComponent {
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
    children: QueryList<FlexibleTabComponent>;
    position: string;
    type: string;
    message: string;
    private onchange;
    constructor();
    ngAfterContentInit(): void;
    keyup(event: any): void;
    selectTab(index: any): void;
}
