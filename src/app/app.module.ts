import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FlexibleTabsModule } from './flexible-tabs/flexible-tabs-module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
	CommonModule,
    FlexibleTabsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
