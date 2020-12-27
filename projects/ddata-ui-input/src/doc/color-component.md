# Color Component

A color input UI form element with color picker.


## Usage

```html
<dd-input-color [model]="my_custom_model" field="is_inactive"></dd-input-color>
```


## API


### Input

| Parameter name | Type | Required | Default value | Description |
|----------------|------|----------|---------------|-------------|
| `model` | `BaseModelInterface<any> & FieldsInterface<any>` | yes | `new BaseModel()` | The model what you want to handle. |
| `field` | `string` | yes | `isValid` | The model's field what you want to handle. |
| `append` | `string` | no | `''` | Text in input's append `div` |
| `prepend` | `string` | no | `''` | Text in input's prepend `div` |
| `labelText` | `string` | no | `''` | Text in `label` |
| `disabled` | `boolean` | no | `false` | Input is diabled or not. |
| `type` | `string` | no | `text` | Input field `type` property. |
| `inputClass` | `string` | no | `form-control` | Class of `input` element. |
| `labelClass` | `string` | no | `col-12 col-md-3 px-0 col-form-label` | Class of `label` element. |
| `inputBlockClass` | `string` | no | `col-12 d-flex px-0` | Class of input block<sup>[1]</sup> element. |
| `inputBlockExtraClass` | `string` | no | `col-md-9` | Apply this classes n input block when `showLabel` is `true`. |
| `showLabel` | `boolean` | no | `true` | Label is visible or not. |
| `autoFocus` | `boolean` | no | `false` | Set autofocus on the element. |
| `wrapperClass` | `string` | no | `d-flex flex-wrap` | Class of the wrapper `div` element. It contains the `label` and the `div.input-group` elements. |

<a name="footnote1"></a>
[1] - Input block is the element what contains the prepend div, input elemnt, append div elements.


### Output

| Parameter name | Type | Description |
|----------------|------|-------------|
| `changed` | `boolean` | Fire when `field` is changed inside the component. |


### Notes

The component prevent the browser's autosuggestion / autofill feature.

The `changed` output fires only when the input value is valid.

If you don't want to do anything - just update your model's field value - you don't need to catch the `changed` event. The
component receive only a refrence to your data model, and when user changes the input it's cause the model field updates via
˙ngModel` two-way binding.


## See also

- Validator Service
- `color_code` validation rule
