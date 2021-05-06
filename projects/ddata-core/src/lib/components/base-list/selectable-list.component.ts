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
  @Input() selectedElements: Set<T> = new Set();

  @Output() removeSelection: EventEmitter<T[]> = new EventEmitter();
  @Output() setSelection: EventEmitter<T[]> = new EventEmitter();
  @Output() emitSelected: EventEmitter<T[]> = new EventEmitter();

  datasArrived: BehaviorSubject<number> = new BehaviorSubject(0);
  select: BehaviorSubject<T[]> = new BehaviorSubject(null);

  toggleSelect(model: T): void {
    const found: boolean = this.selectedElements.has(model);

    if (found) {
      this.selectedElements.delete(model);
      this.removeSelection.emit(Array.from(this.selectedElements));
    } else {
      this.selectedElements.add(model);
      this.setSelection.emit(Array.from(this.selectedElements));
    }

    this.select.next(Array.from(this.selectedElements));
  }

  chooseSelect(): void {
    this.emitSelected.emit(Array.from(this.selectedElements));
  }
}
