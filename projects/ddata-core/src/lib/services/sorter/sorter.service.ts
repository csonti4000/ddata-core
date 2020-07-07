import { SorterServiceInterface } from './sorter-service.interface';

export class SorterService<T> implements SorterServiceInterface<T> {
  sortBy(objects: T[], key: string): T[] {
    const elements = !!objects ? objects : [];

    if (elements === []) {
      return [];
    }

    elements.sort((a: T, b: T) => (!!a[key] ?
      a[key].toString().localeCompare(b[key].toString(), 'hu', {numeric: true}) : 0));

    return elements;
  }

  sortByDesc(objects: T[], key: string): T[] {
    return this.sortBy(objects, key).reverse();
  }
}
