import { Observable } from 'rxjs';

export interface SpinnerServiceInterface {
  watch(): Observable<any>;

  on(starter: string): boolean;

  off(starter: string): boolean;

  getStatus(): boolean;
}
