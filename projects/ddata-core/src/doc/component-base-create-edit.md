# Base Create Edit Component

If you build a large application you need implement several point of your app some basic function. We
colleced these functions in the `HelperService` but this is still a service. My experience is services
needs further implementation in components and this results code repeating too.

This is the reason the birth of this `BaseCreateEditComponent` as an abstract class.

This abscract component class implements some basic functionality, like `load()`, `save()`,
`saveAsNew()` and `stepBack()` as you need to implement this methods in a component.

The experience led me to implement some inputs in this class to be widely used as a single component,
a child component, or a component shown is a dialog.


# How to use

Basic usage for your custom component:

```typescript
@Component({
  selector: 'app-company-create-edit',
  templateUrl: './company-create-edit.component.html',
  styleUrls: ['./company-create-edit.component.scss']
})
export class CompanyCreateEditComponent extends BaseCreateEditComponent<CompanyInterface> implements OnInit {
  // your custom fields

  constructor() {
    super(Company);

    // your custom code
  }

  // your custom methods
}
```

In your template:

```html
<div class="container">

  <div class="row">
    <div class="col-12">
      <h1>Edit {{ model.fields.name.label }}</h1>
    </div>
  </div>

  <div class="row">
    <div class="col-3">
      {{ model.fields.name.label }}:
    </div>
    <div class="col-9">
      <input type="text" [(ngModel)]="model.name" name="name">
    </div>
  </div>

  <div class="row">
    <div class="col-3">
      {{ model.fields.phone.label }}:
    </div>
    <div class="col-9">
      <input type="text" [(ngModel)]="model.phone" name="phone">
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <button type="button" class="btn btn-success" (click)="save()">
        Save
      </button>
      <button type="button" class="btn btn-secondary" (click)="saveAsNew()">
        Save as new
      </button>
      <button type="button" class="btn btn-light" (click)="stepBack()">
        Cancel
      </button>
    </div>
  </div>

</div>
```

So to use the `BaseCreateEditComponent` you need to define a [model](models.md) with it's own
[interface](models.md#use-interfaces). Another important thing is to send the model with `super()` call
to the `BaseCreateEditComponent`.

The `implement OnInit` isn't neccessary at this point, but it's useful to leaves a reminder in the
code: this component is implement `OnInit`, and don't overwrite it if you don't want to loose their built-in
functionality.


## What's the functionality of built-in `OnInit`?

That's it:

```typescript
  ngOnInit(): void {
    this.load();
  }
```

Just start the `load()` method. So if you overwrite the `ngOnInit()` with a custom implementation, you
have to take care to start the `load()` method.


### How to rewrite the `load()` method?

Sometimes you need a custom solution to load your datas and you need to know what's happening in my base
component when datas are loading. Here is the code of `load()` method:

```typescript
  load(): void {
    this.helperService.getOne(this.model, this.isModal).subscribe();
  }
```

Now you can decide wisely when you overwrite it to keep or drop this code. The line of code care about load
a single model from storage.


## Inputs

My experiences led to me to implement inputs to the class to be used more widely. Of course you can simply
overwrite in your component with a common variable.


### Input reference

| Name            | Type      | Default            | Description                                                                                                                                                                                                        |
|-----------------|-----------|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `isModal`       | `boolean` | `false`            | Define this component show as a modal dialog or an a child component. Affect is on all functions. If this is true, then `load()` isn't load datas, but wait a `model` input and `save()` isn't send HTTP requests. |
| `saveToStorage` | `boolean` | `true`             | Set the `save()` method must send to the storage to save model or just simply emit on `saveModel` output.                                                                                                          |
| `model`         | `T`       | an empty `T` model | Set an instance of `T` model.                                                                                                                                                                                      |
| `data`          | `object`  | `null`             | You can set any properties of the component with `data`.                                                                                                                                                           |


## Outputs

My experiences led to me to implement output to the class to be used more widely. Of course you can simply
overwrite in your component.


### Output reference

| Name        | Type              | Description                                 |
|-------------|-------------------|---------------------------------------------|
| `saveModel` | `EventEmitter<T>` | Emitting when the `save()` method finished. |

