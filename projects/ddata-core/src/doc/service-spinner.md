# Spinner Service

## Reference

| Method name | Description |
|-------------|-------------|
| `watch()` | You can subscribe to the spinner service observable subject to react the spinner's change. |
| `on(name)` | Switch on the spinner with a given name. You can switch off it with this name only. The helps prevent multiple spinner. |
| `off(name)` | Switch off the spinner. Switch happens only if the `name` equal the starter's name. |
| `getStatus()` | You can get the current state of the spinner as a boolean. `true` means spinner is on. |

## How to use

### Imperative style

```typescript
export class MyCustomComponent {
  spinner: SpinnerServiceInterface = DdataCoreModule.InjectorInstance.get(SpinnerService);
  companyService: ProxyService<CompanyInterface> = new ProxyFactoryService<CompanyInterface>().get(Company);
  companies: CompanyInterface[] = [];

  constructor() {}

  load() {
    this.spinner.on('companies');

    this.companyService.getAll().subscribe((result: CompanyInterface[]) => {
      this.companies = result;
      this.spinner.off('companies');
    });
  }
}
```


### Reactive style

Use RxJS functions:

```typescript
export class MyCustomComponent {
  spinner: SpinnerServiceInterface = DdataCoreModule.InjectorInstance.get(SpinnerService);
  companyService: ProxyService<CompanyInterface> = new ProxyFactoryService<CompanyInterface>().get(Company);
  companies$: Observable<CompanyInterface[]> = [];

  constructor() {}

  load() {
    this.companies$ = pipe(
      tap(() => spinner.on('companies')),
      switchMap(() => this.companyService.getAll()),
      tap(() => this.spinner.off('companies'),
    );
  }
}
```
