// tslint:disable: variable-name

export class PaginateInterface {
  current_page: number;
  per_page: number;
  from: number;
  to: number;
  data: any[] = [];
  total: number;
  last_page: number;
}
