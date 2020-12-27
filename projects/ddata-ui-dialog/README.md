# DData UI Dialog

This module has two components for handle dialogs easier in `ddata` world.

## Modal dialog with component

If you want to show a component in dialog and then handle events in dialog, you should use this component.

### Usage

HTML
```html
<button (click)="showDialog = true">Show dialog</button>

<dd-modal-dialog
  title="My awesome dialog title"
  [model]="model"
  [dialogContent]="dialogContent"
  [showDialog]="showDialog"
  [overlayClickCloseDialog]="false"
  closeButtonText="Close"
  (success)="save()"
  (fail)="cancel()"
  ></dd-modal-dialog>
```

TypeScript
```typescript
@Component({
  selector: 'app-awesome-component',
  templateUrl: './awesome.component.html',
  styleUrls: ['./awesome.component.scss']
})
export class AwesomeComponent implements OnInit {
  model: BaseModelInterface = new BaseModel(); // your model definition
  showDialog = false;
  dialogContent: DialogContentInterface = {
    createEditComponent: ProductCreateEditComponent,
    createEditOptions: {
      // ...
    },
    listComponent: ProductListComponent,
    listOptions: {
      // ...
    },
  };

  ngOnInit(): void {
    // ...
  }

  save(): void {
    // ...
    this.showDialog = false;
  }

  cancel(): void {
    this.showDialog = false;
  }
}
```

### API

| Input                     | Type                                      | Default                                             | Description                                                                                |
|---------------------------|-------------------------------------------|-----------------------------------------------------|--------------------------------------------------------------------------------------------|
| `title`                   | `string`                                  | empty string                                        | Title of the dialog.                                                                       |
| `model`                   | `BaseModelWithoutTypeDefinitionInterface` | `new BaseModel()`                                   | Model of the dialog.                                                                     |
| `dialogContent`           | `DialogContentItem`                       | `new DialogContentItem(DdataUiNoDataComponent, {})` | Dialog type. Can be `message`, `delete`, `warning` or any other string.                    |
| `showDialog`              | `false`                                   | `false`                                             | Dialog is visible or not.                                                                  |
| `overlayClickCloseDialog` | `boolean`                                 | `true`                                              | The ovrelay div is clickable or not. If clickable it cause a `pressed` event with `false`. |
| `closeButtonText`         | `string`                                  | `Close`                                             | Title text of the close button.                                                            |

| Output    | Type                    | Description                                                                                                                                      |
|-----------|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `success` | `EventEmitter<BaseModelWithoutTypeDefinitionInterface>`     | Emit when user clicks on the success button (OK, Yes, Agree, Allow, etc.) in your component.                                                                       |
| `fail` | `EventEmitter<string>` | Emit when user clicks on any button. The emitted value is depends on user clicked on success button (value is `true`) or not (value is `false`). |



### DialogContentInterface

| Name                    | Required | Type              | Default | Description                                                                                                                   |
|-------------------------|----------|-------------------|---------|-------------------------------------------------------------------------------------------------------------------------------|
| `saveModel`             | no       | `Observable<any>` | `null`  | You can define a custom observable what is emit when user click on your component's save button.                              |
| `select`                | no       | `Observable<any`> | `null`  | You can define a custom observable what is emit when user select an element in your list.                                     |
| `isModal`               | no       | `boolean`         | `false` | Set `true` if this is a modal dialog.                                                                                         |
| `multipleSelectEnabled` | no       | `boolean`         | `false` | If this is a list component, you can control single select or multiple select lists behavioir.                                |
| `isSelectionList`       | no       | `boolean`         | `false` | If this is a list component, you can control this is a selectable list component.                                             |
| `selectedElements`      | no       | `any[]`           | `[]`    | Define previously selected models.                                                                                            |
| `models`                | no       | `any[]`           | `[]`    | Define preloaded models.                                                                                                      |
| `loadData`              | no       | `boolean`         | `false` | Control data loading when your component is showed in the dialog. Set `false` if you have preloaded models to list component. |
| `filter`                | no       | `any`             | `{}`    | Control your search/filter parameters on the listed models.                                                                   |
| `datasArrived`          | no       | `number`          | `0`     | Set a random number is datas arrived from the backend on the parent component.                                                |


## Confirm dialog

If you wan to open a simple confirm or message dialog to the user, you should to use this component.

### Usage

HTML
```html
<dd-confirm-dialog
  title="Are you sure?"
  content="Are you sure to delete this element?"
  type="delete"
  successButtonText="Delete"
  cancelButtonText="Cancel"
  closeButtonText="Close"
  [isModalVisible]="showDeleteDialog"
  [overlayClickCloseDialog]="false"
  (confirm)="deleteIsConfirmed()"
  (pressed)="buttonPressedOnDialog($event)"
  ></dd-confirm-dialog>
```

TypeScript
```typescript
@Component({
  selector: 'app-awesome-component',
  templateUrl: './awesome.component.html',
  styleUrls: ['./awesome.component.scss']
})
export class AwesomeComponent implements OnInit {
  showDeleteDialog = false;

  ngOnInit(): void {
    // ...
  }

  deleteIsConfirmed(): void {
    // delete button pressed...
  }

  buttonPressedOnDialog(isConfirmed: boolean): void {
    if (isConfirmed) {
      // delete button pressed...
    } else {
      // cancel or close button pressed...
    }
  }
}
```

### API

| Input                     | Type         | Default      | Description                                                                                |
|---------------------------|--------------|--------------|--------------------------------------------------------------------------------------------|
| `title`                   | `string`     | empty string | Title of the dialog.                                                                       |
| `content`                 | `string`     | empty string | Content of the dialog.                                                                     |
| `type`                    | `DialogType` | `message`    | Dialog type. Can be `message`, `delete`, `warning` or any other string.                    |
| `showDialog`              | `boolean`    | `false`      | Dialog is visible or not.                                                                  |
| `overlayClickCloseDialog` | `boolean`    | `true`       | The ovrelay div is clickable or not. If clickable it cause a `pressed` event with `false`. |
| `successButtonText`       | `string`     | `OK`         | Text on the success button.                                                                |
| `cancelButtonText`        | `string`     | `Cancel`     | Text on the cancel button.                                                                 |
| `closeButtonText`         | `string`     | `Close`      | Title text of the close button.                                                            |

| Output    | Type                    | Description                                                                                                                                      |
|-----------|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `confirm` | `EventEmitter<any>`     | Emit when user clicks on the success button (OK, Yes, Agree, Allow, etc.)                                                                        |
| `pressed` | `EventEmitter<boolean>` | Emit when user clicks on any button. The emitted value is depends on user clicked on success button (value is `true`) or not (value is `false`). |
