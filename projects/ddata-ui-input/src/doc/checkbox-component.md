# Checkbox Component

A simple checkbox UI form element.


## Usage

```html
<dd-input-checkbox [model]="my_custom_model" field="is_inactive"></dd-input-checkbox>
```


## API


### Input

| Parameter name | Type | Required | Default value | Description |
|----------------|------|----------|---------------|-------------|
| `model` | `BaseModelInterface<any> & FieldsInterface<any>` | yes | `new BaseModel()` | The model what you want to handle. |
| `field` | `string` | yes | `isValid` | The model's field what you want to handle. |
| `disabled` | `boolean` | no | `false` | If `true` the button will be disabled. |
| `showLabel` | `boolean` | no | `true` | If `true` the label will be visible. |
| `showLabelAfter` | `boolean` | no | `true` | If `true` the label will shown after the button. If `false` label will shown before the button. It has any effect only `showLabel` is `true`. |
| `labelClass` | `string` | no | `col pl-2 col-form-label` | CSS classes for the `label` element. |
| `wrapperClass` | `string` | no | `d-flex` | CSS classes for the wrapper `div` element. It contains the `label` and `button` elements. |
| `iconOn` | `IconDefinition` | no | `faCheckSquare` | FontAwesome icon for `true` state |
| `iconOff` | `IconDefinition` | no | `faSquare` | FontAwesome icon for `false` state |


### Output

| Parameter name | Type | Description |
|----------------|------|-------------|
| `changed` | `boolean` | Fire when `field` is changed inside the component. |
