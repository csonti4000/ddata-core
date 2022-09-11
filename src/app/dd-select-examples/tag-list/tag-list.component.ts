import { Component, OnInit } from '@angular/core';
import { SelectableListComponent } from 'ddata-core';
import { TagInterface } from 'src/app/dd-select-examples/tag.interface';
import { Tag } from '../tag.model';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
})
export class TagListComponent extends SelectableListComponent<TagInterface> implements OnInit {
  tags: TagInterface[] = [];

  constructor() {
    super(Tag);
  }

  ngOnInit(): void {}

  load(): void {}

  selected(model: TagInterface): void {
    model.is_selected = !model.is_selected;

    if (model.is_selected) {
      this._selectedElements.add(model);
    } else {
      this._selectedElements.delete(model);
    }
  }
}
