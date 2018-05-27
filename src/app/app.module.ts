import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FlexibleTabsModule } from './flexible-tabs/flexible-tabs-module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    FlexibleTabsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
