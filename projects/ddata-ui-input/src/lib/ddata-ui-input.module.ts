import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DdataUiCommonModule } from 'ddata-ui-common';

import { DdataInputCheckboxComponent } from './components/checkbox/checkbox.component';
import { DdataInputColorComponent } from './components/color/color-input.component';
import { DdataInputComponent } from './components/input/input.component';
import { DdataInputDateComponent } from './components/date/date-input.component';
import { DdataInputSearchComponent } from './components/search/search.component';
import { DdataInputTimeComponent } from './components/time/time-input.component';
import { DdataTextareaComponent } from './components/textarea/textarea.component';
import { DdataSelectComponent } from './components/select/select.component';


@NgModule({
  declarations: [
    DdataInputCheckboxComponent,
    DdataInputColorComponent,
    DdataInputComponent,
    DdataInputDateComponent,
    DdataInputSearchComponent,
    DdataInputTimeComponent,
    DdataSelectComponent,
    DdataTextareaComponent,
  ],
  imports: [
    ColorPickerModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    DdataUiCommonModule,
  ],
  exports: [
    DdataInputCheckboxComponent,
    DdataInputColorComponent,
    DdataInputComponent,
    DdataInputDateComponent,
    DdataInputSearchComponent,
    DdataInputTimeComponent,
    DdataSelectComponent,
    DdataTextareaComponent,
  ]
})
export class DdataUiInputModule { }
