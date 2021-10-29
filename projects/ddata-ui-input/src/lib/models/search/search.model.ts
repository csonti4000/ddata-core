import { SearchModelFunctions } from './search-model-functions';
import { SearchInterface } from './search.interface';

export abstract class Search extends SearchModelFunctions implements SearchInterface {
  // tslint:disable: variable-name
  readonly api_endpoint = '/search';
  readonly model_name = 'Search';
  searchText: string;

  init(data?: any): SearchInterface {
    data = !!data ? data : {};

    super.init(data);

    this.initAsStringWithDefaults(['searchText'], data);

    return this;
  }

  prepareToSave(): any {
    return {
      term: !!this.searchText ? this.searchText : '',
    };
  }

}
