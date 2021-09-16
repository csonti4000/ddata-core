import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DdataUiInputModule, InputHelperService } from 'ddata-ui-input';
import { DdataCoreModule, ValidatorService } from 'ddata-core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DdataUiInputModule,
    DdataCoreModule,
    RouterModule.forRoot([]),
    FormsModule
  ],
  providers: [
    InputHelperService,
    ValidatorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
