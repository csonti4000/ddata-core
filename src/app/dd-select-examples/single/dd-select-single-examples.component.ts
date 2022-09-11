
import { Component } from '@angular/core';
import { DialogContentWithOptionsInterface } from 'ddata-ui-input';
import { AddressInterface } from '../address.interface';
import { Address } from '../address.model';
import { CountryListComponent } from '../country-list/country-list.component';
import { DdSelectExampleService } from '../dd-select-example.service';

@Component({
  selector: 'app-dd-select-single-examples',
  templateUrl: './dd-select-single-examples.component.html',
})
export class DdSelectSingleExamplesComponent {
  address: AddressInterface = new Address();
  dialogSettings: DialogContentWithOptionsInterface;

  constructor(private readonly service: DdSelectExampleService) {
    this.dialogSettings = {
      createEditComponent: undefined,

      listComponent: CountryListComponent,
      listOptions: {
        isModal: true,
        multipleSelectEnabled: false,
        isSelectionList: true,
        models: [this.address.country],
        loadData: true,
      }
    };
  }
}
