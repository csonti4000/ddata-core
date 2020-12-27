import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { BaseModelWithoutTypeDefinitionInterface, ID } from 'ddata-core';

export interface SearchUIFieldsInterface {
  searchText: string;
  name: string;
  description: string;
  type: string;
  found_model_name: string;
  url: string;
}

export interface SearchInterface extends
SearchUIFieldsInterface,
BaseModelWithoutTypeDefinitionInterface {

  id: ID;
  icon: IconDefinition;
}
