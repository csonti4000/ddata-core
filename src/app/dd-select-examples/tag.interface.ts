import { BaseModelInterface, ID, SelectableInterface } from 'ddata-core';

export interface TagUIFieldsInterface {
  name: string;
}

export interface TagInterface
  extends
    TagUIFieldsInterface,
    BaseModelInterface<TagInterface>,
    SelectableInterface {
      id: ID;
    }
