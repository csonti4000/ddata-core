# Select Component

A select UI form element with advanced options.


## Usage

```html
<dd-select [items]="my_selectable_elements_array" [model]="my_custom_model" field="is_inactive"></dd-select>
```


## API

| Parameter name | Type | Required | Default value | Description |
|----------------|------|----------|---------------|-------------|
| `model` | `BaseModelInterface<any> & FieldsInterface<any>` | yes | `new BaseModel()` | The model what you want to handle. |
| `field` | `string` | yes | `isValid` | The model's field what you want to handle. |
