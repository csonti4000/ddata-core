import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataServiceAbstract } from '../data/data-service.abstract';
import { ProxyServiceInterface } from '../proxy/proxy-service.interface';
import { ProxyService } from '../proxy/proxy.service';
import { SpinnerService } from '../spinner/spinner.service';
import { HelperActivatedRouteService } from './helper-activated-route.service';
import { DdataCoreModule } from '../../ddata-core.module';
import { BaseModelInterface } from '../../models/base/base-model.model';
import { PaginateInterface } from '../../models/paginate/paginate.interface';
import { Paginate } from '../../models/paginate/paginate.model';
import { ID } from '../../models/base/base-data.type';

@Injectable({
  providedIn: 'root'
})

export class HelperService<T extends BaseModelInterface<T>> extends DataServiceAbstract<T> {
  private proxy: ProxyServiceInterface<T>;
  private router: Router;
  private spinner: SpinnerService;
  private route: HelperActivatedRouteService;
  private activatedRoute: ActivatedRoute;
  private modelTypeName: string;

  constructor(
    private instance: T,
  ) {
    super(instance);
    this.spinner = DdataCoreModule.InjectorInstance.get<SpinnerService>(SpinnerService);
    this.router = DdataCoreModule.InjectorInstance.get<Router>(Router);
    this.activatedRoute = DdataCoreModule.InjectorInstance.get<ActivatedRoute>(ActivatedRoute);
    this.route = new HelperActivatedRouteService();
    this.proxy = new ProxyService(this.instance);
  }

  booleanChange(model: T, fieldName: string): Observable<boolean | Observable<boolean>> {
    if (!model) {
      return of(false);
    }

    this.modelTypeName = Object.getPrototypeOf(model).constructor.name;
    const starterName = 'booleanChange - ' + this.modelTypeName + ' - ' + fieldName;
    this.spinner.on(starterName);
    model[fieldName] = !model[fieldName];
    return this.proxy.save(model).pipe(map( respose => {
      this.spinner.off(starterName);

      // save wasn't success
      if (!respose) {
        model[fieldName] = !model[fieldName];

        return false;
      }

      return true;
    }, (error: any) => {
      model[fieldName] = !model[fieldName];
      this.spinner.on(starterName);

      return false;
    }));
  }

  save(
    model: T,
    isModal: boolean = false,
    emitter: EventEmitter<T> = new EventEmitter(),
    saveBackend: boolean = true
  ): Observable<boolean | Observable<boolean> | number | Observable<number>> {
    model.validate();
    if (!model.isValid) {
      return of(false);
    }

    if (isModal && !saveBackend) {
      emitter.emit(model);

      return of(true);
    }

    this.spinner.on('save');

    return this.proxy.save(model).pipe(map((result: number) => {
      model.id = result as ID;
      if (isModal) {
        emitter.emit(model);
        model = this.createNewInstanceFrom(model, {});
      } else {
        const url = model.api_endpoint + '/list' + (this.route.getUniqueListId() !== 0 ? '/' + this.route.getUniqueListId() : '');
        this.router.navigateByUrl(url);
      }
      this.spinner.off('save');

      return true;
    }));
  }

  saveAsNew(model: T): Observable<boolean | Observable<boolean> | number | Observable<number>>  {
    model.id = 0 as ID;
    return this.save(model);
  }

  stepBack(model: T, isModal: boolean, emitter: EventEmitter<T> = new EventEmitter()): void {
    if (isModal) {
      emitter.emit(null);
    } else {
      this.router.navigateByUrl(model.api_endpoint + '/list');
    }
  }

  edit(model: T, reference: any): void {
    if (reference.isModal) {
      reference.editModel.emit(model);
    } else {
      this.router.navigate([model.api_endpoint, 'edit', model.id ]);
    }
  }

  delete(model: T, reference: any): Observable<boolean> {
    this.modelTypeName = model.model_name;

    if (reference.isModal) {
      reference.deleteModel.emit(model);

      return of(false);
    }

    this.spinner.on(this.modelTypeName);
    return this.proxy.delete(model, reference.paginate).pipe(map((resultPaginate: PaginateInterface) => {
      reference.models = resultPaginate.data;
      reference.paginate = resultPaginate;

      this.spinner.off(this.modelTypeName);

      return true;
    }));
  }

  deleteMultiple(models: T[], reference: any): Observable<boolean> {
    this.modelTypeName = models[0] ? models[0].model_name : 'NotSet';

    if (reference.isModal) {
      reference.deleteMultiple.emit(models);

      return of(false);
    }

    this.spinner.on(this.modelTypeName);
    return this.proxy.deleteMultiple(models, reference.paginate).pipe(map((resultPaginate: PaginateInterface) => {
      reference.models = resultPaginate.data;
      reference.paginate = resultPaginate;

      this.spinner.off(this.modelTypeName);

      return true;
    }));
  }

  changeToPage(turnToPage: number, paginate: PaginateInterface, models: T[]): Observable<boolean> {
    if (!turnToPage) {
      return of(false);
    }

    this.spinner.on('changeToPage');

    return this.proxy.getPage(turnToPage).pipe(map( (result: PaginateInterface) => {
      paginate = result;
      models = paginate.data;
      this.spinner.off('changeToPage');

      return true;
    }));
  }

  getOne(model: T, isModal: boolean, handleLoader: boolean = true): Observable<boolean | Observable<boolean>> {
    if (!model) {
      return of(false);
    } else {
      if (isModal && !model.id) {
        return of(false);
      }
    }

    this.modelTypeName = Object.getPrototypeOf(model).constructor.name;

    if (isModal && !!model.id) {
      const paramId = model.id;
      if (handleLoader) {
        this.spinner.on('getOne Modal mode ' + this.modelTypeName);
      }

      return this.proxy.getOne(Number(paramId)).pipe(map((result: T) => {
        Object.assign(model, result);

        if (handleLoader) {
          this.spinner.off('getOne Modal mode ' + this.modelTypeName);
        }

        return true;
      }));
    } else {
      return this.route.params().pipe(map(param => {
        if ( param.id !== undefined && param.id !== 0 ) {
          if (handleLoader) {
            this.spinner.on('getOne Route mode ' + this.modelTypeName);
          }

          this.proxy.getOne(Number(param.id)).subscribe((result: T) => {
            Object.assign(model, result);

            if (handleLoader) {
              this.spinner.off('getOne Route mode ' + this.modelTypeName);
            }

            return true;
          });
        } else {
          // if (handleLoader) {
          //   this.spinner.off('getOne ' + this.modelTypeName);
          // }

          return false;
        }
      }));
    }
  }

  getAll(paginate: PaginateInterface, models: T[], isModal: boolean = false): Observable<PaginateInterface> {
    const spinnerName = 'getAll ' + Math.random();
    this.spinner.on(spinnerName);

    if (!this.activatedRoute.snapshot.queryParams.filter) {
      return this.proxy.getAll().pipe(map((result: PaginateInterface) => {
        // set paginate reference
        Object.assign(paginate, result);
        // clear models[]
        models.splice(0, models.length);
        // upload models[]
        models.push(...paginate.data);

        this.spinner.off(spinnerName);

        return result;
      }));
    }

    if (!isModal && !!this.activatedRoute.snapshot.queryParams.filter) {
      const filter = JSON.parse(this.activatedRoute.snapshot.queryParams.filter) || {};

      return this.search(filter, 0).pipe(map((result: PaginateInterface) => {
        this.spinner.off(spinnerName);

        return result;
      }));
    }

    return of(new Paginate(this.instance));
  }

  search(data: any, pageNumber: number): Observable<PaginateInterface> {
    this.spinner.on('search');
    return this.proxy.search(data, pageNumber).pipe(map((result: PaginateInterface) => {
      this.spinner.off('search');
      return result;
    }));
  }

  searchWithoutPaginate(data: any): Observable<T[]> {
    this.spinner.on('searchWithoutPaginate');
    return this.proxy.searchWithoutPaginate(data).pipe(map((result: T[]) => {
      this.spinner.off('searchWithoutPaginate');
      return result;
    }));
  }
}
