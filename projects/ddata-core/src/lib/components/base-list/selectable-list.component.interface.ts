import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

export interface SelectableListComponentInterface<T> {
  isModal: boolean;
  multipleSelectEnabled: boolean;
  isSelectionList: boolean;
  loadData: boolean;
  selectedElements: T[];

  removeSelection: EventEmitter<T[]>;
  setSelection: EventEmitter<T[]>;
  emitSelected: EventEmitter<T[]>;

  datasArrived: Observable<number>;
  select: Observable<T[]>;

  toggleSelect(model: T): void;
  chooseSelect(): void;
}
