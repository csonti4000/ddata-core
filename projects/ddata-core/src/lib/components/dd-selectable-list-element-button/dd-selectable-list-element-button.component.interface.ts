import { EventEmitter } from '@angular/core';
import { SelectableInterface } from '../../models/selectable/selectable.interface';

export interface DdataSelectableListElementButtonComponentInterface {
  model: SelectableInterface;

  choosed: EventEmitter<any>;

  chooseSelect(model: SelectableInterface): void;
}
