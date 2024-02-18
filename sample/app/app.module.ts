import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TestComponent, TestComponent2 } from './test.component';
import { AppComponent } from './app.component';
import { FlexibleTabsModule } from '@sedeh/flexible-tabs';

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
    FlexibleTabsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
