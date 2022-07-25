# Selectable list abstract component

This component extends `BaseListComponent` with selectable list component properties and functions.

With this component you can create list components what you can show in modal dialog and easily connect to
`dd-select` UI component as single select or multiple select lists.

## Usage

Create a list component, like this:

```typescript
@Component({
  selector: 'app-my-awesome-list',
  templateUrl: './my-awesome-list.component.html',
  styleUrls: ['./my-awesome-list.component.scss']
})
export class MyAwesomeListComponent extends SelectableListComponent<MyAwesomeInterface> implements OnInit {
  // your custom defined codes here

  myCustomSelectionHandler(): void {
    // ... here you can define how to 
  }
}
```

## How to add selectable elements to HTML template?

In your `my-awesome-selectable-list.component.html` file you can use `dd-choose-selected-button` component to
handle event when user want to add selected elements to a `dd-select` multiple select component.

```html
<div class="container">

  <!-- choose selected button -->
  <div class="row">
    <div class="col-12">
      <dd-choose-selected-button
        [multipleSelectEnabled]="multipleSelectEnabled"
        (choosed)="chooseSelect()">

        <!-- here you can define button text and icon, like this: -->
        <fa-icon [icon]="faCheck"></fa-icon>
        Add all selected
      </dd-choose-selected-button>
    </div>
  </div>

  <div class="row">

    <!-- selectable list element button -->
    <div class="col-12 col-md-1">
      <dd-selectable-list-element-button
        [model]="model"
        (choosed)="toggleSelect($event)">

        <!-- here you can define button text and icon, like this: -->
        <fa-icon [icon]="faCheck"></fa-icon>
      </dd-selectable-list-element-button>
    </div>

    <!-- define here all your listed fields, function buttons -->

  </div>
</div>
```

The `chooseSelect()` and `toggleSelect()` functions are defined in `SelectableListComponent`.

The `chooseSelect()` function will emit the `selectedElements` array, what contains all the
selected elements.

The `toggleSelect()` function will emit `setSelection` or `removeSelection` events with the
affected model. The emit type depends on what event happend with the model. Both case the
`select` observable triggered with new list of selected elements.
