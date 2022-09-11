import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BaseModelInterface, DdataCoreModule, FieldsInterface } from 'ddata-core';
import { DialogContentWithOptionsInterface } from '../../../models/dialog/content/dialog-content.interface';
import { InputHelperServiceInterface } from '../../../services/input/helper/input-helper-service.interface';
import { InputHelperService } from '../../../services/input/helper/input-helper.service';
import { SelectType } from '../select.type';

@Component({
  selector: 'multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.scss']
})
export class DdataMultipleSelectComponent implements OnInit {
  private helperService: InputHelperServiceInterface =
    DdataCoreModule.InjectorInstance.get<InputHelperServiceInterface>(InputHelperService);
  private random: string = this.helperService.randChars();

  // look & feel
  @Input() wrapperClass = 'd-flex flex-wrap';
  @Input() inputBlockClass = 'col-12 d-flex px-0';
  @Input() inputBlockExtraClass = 'col-md-9';
  @Input() unselectedText = 'Válassz';

  // behavior
  @Input() mode: SelectType = 'multiple';
  @Input() isRequire = false;
  @Input() disabledAppearance = false;
  @Input() disabled = false;
  @Input() addEmptyOption = true;

  // label
  @Input() labelClass = 'col-12 col-md-3 px-0 col-form-label';
  @Input() showLabel = true;
  @Input() labelText = '';

  // additional texts
  @Input() prepend = '';
  @Input() append = '';

  // data
  @Input() model: BaseModelInterface<any> & FieldsInterface<any>;
  @Input() field = 'id';
  @Input() items: any[] = [];
  @Input() text = 'name';
  @Input() valueField = 'id';

  // selected items
  @Input() disableShowSelectedItems = false;
  @Input() showIcon = false;
  @Input() selectedElementsBlockClass = 'col-12 d-flex flex-wrap px-0';
  @Input() selectedElementsBlockExtraClass = 'col-md-9 d-flex flex-wrap';
  // dialog
  @Input() set dialogSettings(value: DialogContentWithOptionsInterface) {
    if (!value) {
      console.error(`You try to use dd-select as multiple select, but not defined dialogSettings. Please define it.`);

      return;
    }

    this._dialogSettings = value;
  }

  get id(): string {
    return `${this.field}_${this.random}`;
  }

  get selectedModelName(): string {
    return this.model[this.getObjectFieldName()][this.text];
  }

  isModalVisible = false;
  _dialogSettings: DialogContentWithOptionsInterface;

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  showModal(method: 'create-edit' | 'list'): void {
    this.isModalVisible = true;

    this.changeDetector.detectChanges();
  }

  hideModal(): void {
    this.isModalVisible = false;
  }

  deleteFromMultipleSelectedList(item: any): void {
    this.model[this.field].splice(this.model[this.field].indexOf(item), 1);
    this._dialogSettings.listOptions.selectedElements.splice(this.model[this.field].indexOf(item), 1);
  }

  getObjectFieldName(): string {
    return this.field.split('_id')[0];
  }
}
