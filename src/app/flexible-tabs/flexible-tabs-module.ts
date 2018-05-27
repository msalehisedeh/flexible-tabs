/*
* Provides rendering of flexible tabs in a lazy load fashion.
*/
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexibleTabsComponent, FlexibleTabComponent } from './flexible.tabs.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FlexibleTabsComponent,
        FlexibleTabComponent
    ],
    exports: [
        FlexibleTabsComponent,
        FlexibleTabComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class FlexibleTabsModule {}
