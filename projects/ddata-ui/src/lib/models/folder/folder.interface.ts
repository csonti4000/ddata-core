import { Description, FolderName, ID, URI } from '../base-model/base-data-type.model';
import { BaseModelWithoutTypeDefinitionInterface, FieldsInterface } from '../base-model/base-model.model';

export interface FolderUIFieldsInterface {
  parent_id: ID;
  name: FolderName;
  description: Description;
  is_highlighted: boolean;
  uri: URI;
  title: string;
}
export interface FolderInterface extends
  FolderUIFieldsInterface,
  BaseModelWithoutTypeDefinitionInterface,
  FieldsInterface<FolderUIFieldsInterface> {

  id: ID;
}
