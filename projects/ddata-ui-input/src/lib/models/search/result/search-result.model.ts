
import { SearchModelFunctions } from '../search-model-functions';
import { SearchResultInterface } from './search-result.interface';

export abstract class SearchResult extends SearchModelFunctions implements SearchResultInterface {

  init(data?: any): SearchResultInterface {
    super.init(data);

    return this;
  }

}
