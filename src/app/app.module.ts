import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TestComponent, TestComponent2 } from './test.component';
import { AppComponent } from './app.component';
import { FlexibleTabsModule } from './flexible-tabs/flexible-tabs-module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TestComponent2
  ],
  entryComponents: [
    TestComponent,
    TestComponent2
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
