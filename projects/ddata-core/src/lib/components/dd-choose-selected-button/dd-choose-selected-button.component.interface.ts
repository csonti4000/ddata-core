import { EventEmitter } from '@angular/core';

export interface DdataChooseSelectedButtonComponentInterface {
  multipleSelectEnabled;
  choosed: EventEmitter<any>;

  chooseSelect(): void;
}
