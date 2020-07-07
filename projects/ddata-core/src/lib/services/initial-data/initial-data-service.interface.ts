import { Observable } from 'rxjs';

export interface InitialDataServiceInterface {
  refresh(): Observable<boolean>;
}
