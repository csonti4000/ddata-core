import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DdataUiInputModule, InputHelperService } from 'ddata-ui-input';
import { DdataCoreModule, ValidatorService } from 'ddata-core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DdataUiInputModule,
    DdataCoreModule,
    RouterModule.forRoot([]),
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
  ],
  providers: [
    InputHelperService,
    ValidatorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
