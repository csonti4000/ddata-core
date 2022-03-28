// tslint:disable: variable-name
// tslint:disable: no-string-literal
// tslint:disable: max-line-length
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BaseModel, BaseModelInterface, DdataCoreModule, FieldsInterface } from 'ddata-core';
import { Subscription } from 'rxjs';
import { DialogContentItem } from '../../models/dialog/content/dialog-content-item';
import { DialogContentInterface, DialogContentWithOptionsInterface } from '../../models/dialog/content/dialog-content.interface';
import { InputHelperServiceInterface } from '../../services/input/helper/input-helper-service.interface';
import { InputHelperService } from '../../services/input/helper/input-helper.service';

@Component({
  selector: 'dd-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class DdataSelectComponent implements OnInit, OnDestroy {
  helperService: InputHelperServiceInterface = DdataCoreModule.InjectorInstance.get<InputHelperServiceInterface>(InputHelperService);

  _field = '';
  _title = '';
  _label = '';
  _prepend = '';
  _append = '';
  _isRequired = false;
  _model: BaseModelInterface<any> & FieldsInterface<any> = new BaseModel();
  @Input() set close(value: boolean) {
    this.isModalVisible = false;
    this.changeDetector.detectChanges();
  }
  @Input() valueField = 'id';
  @Input() set model(value: BaseModelInterface<any> & FieldsInterface<any>) {
    if (!value) {
      return;
    }

    this._model = value;

    if (!this._model.fields) {
      console.error(`Your ${this._model.model_name}'s 'fields' field is`, this._model.fields);

      return;
    }

    if (!this._model.fields[this._field]) {
      console.error(`The ${this._model.model_name}'s ${this._field} field is `, this._model.fields[this._field]);

      return;
    }

    if (!!this._model && !!this._model.fields[this._field]) {
      this._title = this.helperService.getTitle(this._model, this._field);
      this._prepend = this.helperService.getPrepend(this._model, this._field);
      this._append = this.helperService.getAppend(this._model, this._field);
      this._label = this.helperService.getLabel(this._model, this._field);
    }

    if (!!this._model && !!this._model.validationRules[this._field]) {
      this._isRequired = this.helperService.isRequired(this._model, this._field);
    }
  }
  get model(): BaseModelInterface<any> & FieldsInterface<any> {
    return this._model;
  }
  @Input() set field(value: string) {
    if (value === 'undefined') {
      value = 'id';
    }

    this._field = value;
  }
  @Input() set append(value: string) {
    if (value === 'undefined') {
      value = '';
    }

    this._append = value;
  }
  @Input() set prepend(value: string) {
    if (value === 'undefined') {
      value = '';
    }

    this._prepend = value;
  }
  @Input() set labelText(value: string) {
    if (value === 'undefined') {
      value = '';
    }

    this._label = value;
  }
  @Input() text = 'name';
  @Input() items: any[] = [];
  @Input() unselectedText = 'Válassz';
  @Input() hideButton = false;
  @Input() hideAdd = false;
  @Input() hideEdit = false;
  @Input() hideList = false;
  @Input() addEmptyOption = true;
  @Input() multilanguage = false;
  @Input() isValid = false;
  @Input() disabled = false;
  @Input() disabledAppearance = false;
  @Input() disableAdditionalModelUpdate = false;
  @Input() dialogSettings: DialogContentWithOptionsInterface;
  @Input() multipleSelect = false;
  @Input() fakeSingleSelect = false;
  @Input() isViewOnly = false;
  @Input() showIcon = false;
  @Input() showLabel = true;
  @Input() labelClass = 'col-12 col-md-3 px-0 col-form-label';
  @Input() inputBlockClass = 'col-12 d-flex px-0';
  @Input() inputBlockExtraClass = 'col-md-9';
  @Input() viewOnlyClass = 'form-control border-0 bg-light';
  @Input() wrapperClass = 'd-flex flex-wrap';

  @Input() set dialogTitle(value: string) {
    if (!!value) {
      this._dialogTitle = value;

      return;
    }

    this._dialogTitle = 'kiválasztható elem';
  }
  @Input() menuLabels: {add: string, edit: string, search: string} = {
    add: 'Új hozzáadása',
    edit: 'Kiválasztott érték módosítása',
    search: 'Keresés',
  };
  @Input() set forceCloseModal(value: any) {
    this.hideModal();
  }
  @Output() selected: EventEmitter<any> = new EventEmitter();
  @Output() selectModel: EventEmitter<any> = new EventEmitter();
  _selectedModel: any;
  _dialogTitle = 'Not set';

  @ViewChild('dialogHost', { read: ViewContainerRef }) dialogHost: ViewContainerRef;
  @ViewChild('dialogEditHost', { read: ViewContainerRef }) dialogEditHost: ViewContainerRef;
  @ViewChild('dialogListHost', { read: ViewContainerRef }) dialogListHost: ViewContainerRef;
  isModalVisible = false;
  isEditModalVisible = false;
  isListModalVisible = false;
  _selectedModelName = '';

  componentRef: any;
  componentSubscription: Subscription = new Subscription();
  icon = {
    menu: faEllipsisV,
  };
  random: string = this.helperService.randChars();

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    if (!this.hideButton && this._dialogTitle === 'Not set') {
      this._dialogTitle = 'kiválasztható elem';
    }

    if (!!this.items) {
      this._selectedModel = this.items.find(item => item.id === this._model[this._field]);
    }
    if (this.fakeSingleSelect) {
      this._selectedModelName = !!this._model[this.getObjectFieldName()] && !!this._model[this.getObjectFieldName()][0] ? this._model[this.getObjectFieldName()][this.text] : '';
    }
  }

  ngOnDestroy(): void {
    this.componentSubscription.unsubscribe();
  }

  selectItem(value: any): void {
    this.setSelected(this._model[this._field]);
  }

  private setSelected(selectedValue: any, emit: boolean = true, model?: any): void {
    this._model[this._field] = selectedValue;

    if (!this.disableAdditionalModelUpdate) {
      const additionalModelFieldName = this.getObjectFieldName();

      this._model[additionalModelFieldName] = !!model ? model : this.items.find(item => item[this.valueField] === selectedValue);
    }

    this.changeDetector.detectChanges();

    this._selectedModel = this.items.find(item => item.id === selectedValue);

    if (emit) {
      this.selected.emit(selectedValue);
      this.selectModel.emit(this.items.find(item => item[this._field] === selectedValue));
    }
  }

  private getObjectFieldName(): string {
    return this._field.split('_id')[0];
  }

  hideModal(): void {
    this.changeModalStatus();
    this.componentSubscription.unsubscribe();
    this.componentSubscription = new Subscription();
  }

  showModal(method: 'create-edit' | 'list'): void {
    this.changeModalStatus();
    this.renderComponent(method);
  }

  private changeModalStatus(): void {
    this.isModalVisible = !this.isModalVisible;
    this.changeDetector.detectChanges();
  }

  renderComponent(method: 'create-edit' | 'list'): void {
    const dialogContent: DialogContentItem = method === 'create-edit' ?
      new DialogContentItem(this.dialogSettings.createEditComponent, this.dialogSettings.createEditOptions) :
      new DialogContentItem(this.dialogSettings.listComponent, this.dialogSettings.listOptions);

    this.dialogHost.clear();

    this.componentRef = this.dialogHost.createComponent(dialogContent.component);

    if (method === 'list') {
      this.setListComponent(dialogContent);
    }

    this.componentRef.instance.model = dialogContent.data.model;

    (this.componentRef.instance as DialogContentInterface).isModal = true;
    this.componentSubscription.add(
      (this.componentRef.instance as DialogContentInterface).saveModel
        .subscribe((model: any) => this.setModel(model))
    );
  }

  setModel(model: any): any {
    if (!!model) {
      this._model[this._field.split('_id')[0]] = model;
      this._model[this._field] = model.id;
      this.items.push(model);
      this._selectedModel = model;
      this.selected.emit(model[this.valueField]);
    }

    this.selectModel.emit(model);
    this.hideModal();
  }

  setListComponent(dialogContent: DialogContentItem): void {
    if (!this.dialogSettings || !this.dialogSettings.listComponent) {
      return;
    }

    if (!!dialogContent.data) {
      (this.componentRef.instance as DialogContentInterface).isModal = true;
      (this.componentRef.instance as DialogContentInterface).multipleSelectEnabled = dialogContent.data.multipleSelectEnabled;
      (this.componentRef.instance as DialogContentInterface).isSelectionList = dialogContent.data.isSelectionList;
      (this.componentRef.instance as DialogContentInterface).loadData = dialogContent.data.loadData;
      (this.componentRef.instance as DialogContentInterface).filter = dialogContent.data.filter ?? {};

      // if there is preset models
      if (!dialogContent.data.loadData && !!dialogContent.data.models) {
        // set preset models
        (this.componentRef.instance as DialogContentInterface).models = dialogContent.data.models;

        // send a notification to the list component to update their material table and other things
        (this.componentRef.instance as DialogContentInterface).datasArrived.next(Math.random());
      }

      // if there is selected elements...
      if (this.multipleSelect && !this.fakeSingleSelect) {
        (this.componentRef.instance as DialogContentInterface).selectedElements = [...this._model[this._field]];
      } else {
        (this.componentRef.instance as DialogContentInterface).selectedElements = this._model[this._field] !== 0 ? [this._model[this.getObjectFieldName()]] : [];
      }

      this.componentSubscription.add((this.componentRef.instance as DialogContentInterface).select
        .subscribe((models: any[]) => {

          // kezelni kell, hogy a korábban már kiválasztottak újra hozzáadásra kerüljenek, és amikből a user kivette
          // a pipát azok eltűnjenek. Ennek érdekében kiürítjük a tömböt.
          if (this.multipleSelect && !this.fakeSingleSelect) {
            this._model[this._field] = [];
            this.dialogSettings.listOptions.selectedElements = [];
          }

          if (!models) {
            return;
          }

          // selection return always an array
          models.forEach((model: any) => {
            this._selectedModelName = model[this.text];

            if (models.length === 1 && ( !this.multipleSelect || this.fakeSingleSelect) ) {
              // single select - only a single element can be selected
              this.setSelected(model[this.valueField], false, model);
              this.selected.emit(model[this.valueField]);
            } else {
              // multiple select - multiple elements can be selected

              // Here is a possibility to work as single select, but enable multiple selecting in the list.
              // In this case the caller component has to be handle the results.
              // If the multipleSelect is true, then this component will be handle the selection and put selected elements
              // into this._model[this.filed] array. Because in this case it MUST be an array.
              if (this.multipleSelect && !this.fakeSingleSelect) {
                if (!(this._model[this._field] instanceof Array)) {
                  console.error(`The ${this._model.model_name}'s ${this._field} field is not an array. If you use select-box as multipleSelect, then the 'field' parameter must be array.`);
                }

                this._model[this._field].push(model);
                this.dialogSettings.listOptions.selectedElements.push(model);
              }

            }

            // this must be happen on multiple select and on signle select case too
            this.selectModel.emit(model);
          });

          this.hideModal();
        })
      );
    }
  }

  deleteFromMultipleSelectedList(item: any): void {
    this._model[this._field].splice(this._model[this._field].indexOf(item), 1);
    this.dialogSettings.listOptions.selectedElements.splice(this._model[this._field].indexOf(item), 1);
  }

  getModelField(): string {
    if (!!this.items.find(item => item.id === this._model[this._field])) {
      this._selectedModel = this.items.find(item => item.id === this._model[this._field]);
      return this._selectedModel[this.text];
    }

    this._selectedModelName = !!this._model[this.getObjectFieldName()] && !!this._model[this.getObjectFieldName()][this.text] ?
      this._model[this.getObjectFieldName()][this.text] : '';

    return this._selectedModelName;
  }
}
