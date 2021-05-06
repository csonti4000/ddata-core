import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseModelInterface } from '../../models/base/base-model.model';
import { BaseListComponent } from './base-list.component';
import { SelectableListComponentInterface } from './selectable-list.component.interface';

// @dynamic
@Component({
  template: '',
})
export abstract class SelectableListComponent<T extends BaseModelInterface<T>>
  extends BaseListComponent<T>
  implements SelectableListComponentInterface<T> {

  @Input() isModal = true;
  @Input() multipleSelectEnabled = true;
  @Input() isSelectionList = true;
  @Input() loadData = false;
  @Input() selectedElements: T[] = [];

  @Output() removeSelection: EventEmitter<T[]> = new EventEmitter();
  @Output() setSelection: EventEmitter<T[]> = new EventEmitter();
  @Output() emitSelected: EventEmitter<T[]> = new EventEmitter();

  datasArrived: BehaviorSubject<number> = new BehaviorSubject(0);
  select: BehaviorSubject<T[]> = new BehaviorSubject(null);

  toggleSelect(model: T): void {
    const index = this.selectedElements.indexOf(model);

    if (index === -1) {
      this.selectedElements.push(model);
      this.setSelection.emit(this.selectedElements);
    } else {
      this.selectedElements.splice(index, 1);
      this.removeSelection.emit(this.selectedElements);
    }

    this.select.next(this.selectedElements);
  }

  chooseSelect(): void {
    this.emitSelected.emit(this.selectedElements);
  }
}
