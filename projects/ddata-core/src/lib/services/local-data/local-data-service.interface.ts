import { Observable } from 'rxjs';
import { DataServiceAbstractInterface } from '../data/data-service-abstract.interface';

export interface LocalDataServiceInterface<T> extends DataServiceAbstractInterface<T> {
  watch(): Observable<any>;
  allFromLocal(): T[];
  save(model: T, id: number): void;
  delete(model: T): boolean;
  updateLocalstorage(data: T[]): void;
  allFromLocalSortedBy(fieldName: string): T[];
  allFromLocalSortedByDesc(fieldName: string): T[];
  findById(id: number): T;
  findByField(field: string, value: any): T;
  filterByField(field: string, value: any): T[];
}
