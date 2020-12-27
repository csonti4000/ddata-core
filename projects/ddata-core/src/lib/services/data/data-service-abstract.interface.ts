
export interface DataServiceAbstractInterface<T> {
  hydrateArray(data: any[]): T[];
  hydrate(fromModel: any, datas: any): any;
}
