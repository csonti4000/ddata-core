import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadProcessInterface } from '../../models/file/file-upload-process.interface';
import { PaginateInterface } from '../../models/paginate/paginate.interface';

export interface RemoteDataServiceInterface<T> {
  setupHeaders(): void;

  getAll(): Observable<PaginateInterface>;
  getAllWithoutPaginate(): Observable<T[]>;
  getPage(pageNumber: number, uniqueUrl?: string): Observable<PaginateInterface>;
  getOne(id: number): Observable<T>;
  getUri(uri: string): Observable<T>;

  save(data: T): Observable<number | boolean>;

  postUri(resource: any, uri: string): Observable<any>;

  delete(model: T): Observable<number>;
  deleteMultiple(models: T[]): Observable<{}>;

  sendFiles(uri: string, id: number, files: Set<File>, data?: any): Observable<FileUploadProcessInterface>[];

  handleError(error: HttpErrorResponse): void;
}
