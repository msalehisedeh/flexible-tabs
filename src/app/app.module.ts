import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {TestComponent } from './test.component';
import { AppComponent } from './app.component';
import { FlexibleTabsModule } from './flexible-tabs/flexible-tabs-module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  entryComponents: [
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FlexibleTabsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
