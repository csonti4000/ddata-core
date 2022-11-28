import {
  ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ViewContainerRef
} from '@angular/core';
import { BaseModelInterface, FieldsInterface } from 'ddata-core';
import pluralize from 'pluralize';
import { DialogContentInterface, DialogContentWithOptionsInterface } from '../../../../models/dialog/content/dialog-content.interface';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SelectType } from '../../select.type';
import { DialogContentItem } from 'ddata-ui-dialog';

@Component({
  selector: 'multiple-select-dialog',
  templateUrl: './multiple-select-dialog.component.html',
  styleUrls: ['./multiple-select-dialog.component.scss']
})
export class DdataMultipleSelectDialogComponent implements OnInit {
  private componentRef: any;
  private subscription: Subscription = new Subscription();
  private selectedModelName = '';
  private selectedModel: any;

  @Input() settings: DialogContentWithOptionsInterface;
  @Input() method: 'create-edit' | 'list' = 'list';
  @Input() mode: SelectType = 'multiple';
  @Input() model: BaseModelInterface<any> & FieldsInterface<any>;
  @Input() field = 'id';
  @Input() text = 'name';
  @Input() valueField = 'id';
  @Input() items: any[] = [];
  @Input() modalTitle = 'Dialog';

  @Output() selectionFinished: EventEmitter<any> = new EventEmitter();
  @Output() selected: EventEmitter<any> = new EventEmitter();
  @Output() selectModel: EventEmitter<any> = new EventEmitter();

  @ViewChild('dialogHost', { read: ViewContainerRef }) dialogHost: ViewContainerRef;

  // close dialog on esc
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
    this.selectionFinished.emit();
  }

  constructor(private readonly changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (!!this.items) {
      this.selectedModel = this.items.find(item => item.id === this.model[this.field]);
    }

    if (this.mode === 'single') {
      const pluralFieldName = this.getObjectFieldNamePrular();

      this.selectedModelName = !!this.model[pluralFieldName] && !!this.model[pluralFieldName][0]
        ? this.model[pluralFieldName][0][this.text]
        : '';
    }

    this.renderComponent(this.method);
  }

  hideModal(): void {
    const instance = this.componentRef.instance as DialogContentInterface;

    this.emitEvents(instance.selectedElements);
  }

  private renderComponent(method: 'create-edit' | 'list' = 'list'): void {
    const dialogContent: DialogContentItem = method === 'create-edit' ?
      new DialogContentItem(this.settings?.createEditComponent, this.settings?.createEditOptions) :
      new DialogContentItem(this.settings?.listComponent, this.settings?.listOptions);

    this.changeDetector.detectChanges();

    this.dialogHost.clear();

    this.componentRef = this.dialogHost.createComponent(dialogContent.component);

    if (!this.componentRef) {
      console.error('componentRef is not set', this.componentRef);

      return;
    }

    if (method === 'list') {
      this.setListComponent(dialogContent);
    }

    this.componentRef.instance.model = dialogContent.data.model;

    const instance = this.componentRef.instance as DialogContentInterface;

    instance.isModal = true;

    this.subscription.add(instance.saveModel.subscribe((model: any) => this.setModel(model)));
  }

  private setListComponent(dialogContent: DialogContentItem): void {
    if (!this.settings || !this.settings.listComponent) {
      return;
    }

    if (!!dialogContent.data) {
      const instance = this.componentRef.instance as DialogContentInterface;

      instance.isModal = true;
      instance.multipleSelectEnabled = dialogContent.data.multipleSelectEnabled;
      instance.isSelectionList = dialogContent.data.isSelectionList;
      instance.loadData = dialogContent.data.loadData;
      instance.filter = dialogContent.data.filter ?? {};

      // if there is preset models
      if (!dialogContent.data.loadData && !!dialogContent.data.models) {
        // set preset models
        instance.models = dialogContent.data.models;

        // send a notification to the list component to update their material table and other things
        instance.datasArrived.next(Math.random());
      }

      // if there is selected elements...
      if (this.mode === 'multiple') {
        instance.selectedElements = [...this.model[this.field]];
      } else {
        instance.selectedElements = this.model[this.field] !== 0
          ? [this.model[this.getObjectFieldName()]]
          : [];
      }

      this.subscription.add(
        instance.select.pipe(
          tap(() => {
            if (this.mode === 'multiple') {
              this.model[this.field] = [];
              this.settings.listOptions.selectedElements = [];
            }
          }),

          map((models: any[]) => {
            if (models === null) {
              return models;
            }

            this.emitEvents(models);

            return models;
          }),
        ).subscribe()
      );
    }
  }

  private emitEvents(models: any[]): void {
    models.forEach((model: any) => {
      this.selectedModelName = model[this.text];

      if (models.length === 1 && this.mode === 'single') {
        // single select - only a single element can be selected
        this.model[this.field] = model.id;
        this.model[this.getObjectFieldName()] = model;
        this.setSelected(model[this.valueField], true, model);
      } else if (this.mode === 'multiple') {
        if (!(this.model[this.field] instanceof Array)) {
          console.error(`The ${this.model.model_name}'s ${this.field} field is not an array. If you use select-box as multipleSelect, then the 'field' parameter must be array.`);
        }

        this.model[this.field].push(model);
        this.settings.listOptions.selectedElements.push(model);
      }

      // this must be happen on multiple select and on signle select case too
      this.selectModel.emit(model);
    });

    this.selectionFinished.emit(models);

  }

  private getObjectFieldName(): string {
    return this.field.split('_id')[0];
  }

  private getObjectFieldNamePrular(): string {
    return pluralize(this.getObjectFieldName());
  }

  private setModel(model: any): any {
    if (!!model) {
      this.model[this.field.split('_id')[0]] = model;
      this.model[this.field] = model.id;
      this.items.push(model);
      this.selectedModel = model;

      this.selected.emit(model[this.valueField]);
    }

    this.selectModel.emit(this.selectedModel);

    this.selectionFinished.emit(this.model[this.field]);
  }

  private setSelected(selectedValue: any, emit: boolean = true, model?: any): void {
    this.model[this.field] = selectedValue;

    this.selectedModel = this.items.find(item => item[this.field] === selectedValue);
  }

}
