
## Services

This package has a bunch of services, which works together to help you create large apllications in minutes and avoid several types of bugs.

### Service Layers

Here is the fancy ASCII art to represent the idea of this package's services working together. Each layer has it's own responibility. This approach helps to keep the code clean & dry.

    +--------------------+                   +------------------------+
    | Angular HttpClient |                   | Browser's LocalStorage |
    +--------------------+                   +------------------------+
            ||                                            ||
            ||                                   +----------------+
            ||                                   | StorageService |
            ||                                   +----------------+
            ||                                            ||
    +-------------------+                       +------------------+
    | RemoteDataService |                       | LocalDataService | 
    +-------------------+                       +------------------+
              \\                                        //
               \\                                      //    
            +-----------------------------------------------+
            |                  ProxyService                 |
            +-----------------------------------------------+
                                   ||
                           +---------------+            +-----------------+
                           | HelperService | ========== | Spinner Service |
                           +---------------+            +-----------------+
                                   ||
                          +--------------------+
                          | Abstract Component |
                          +--------------------+
                                   ||
                         +----------------------+
                         | Your Final Component |
                         +----------------------+

Now I introduce you the services and it's responsibility.

### StorageService

Responsibility:
- store and remove items from LocalStorage, clear LocalStorage and provide an Observable to listen and react if localstorage is changed.

### LocalDataService

Responsibility:
- convert LocalStorage strings to models,
- provide more functions to handle LocalStorage and keep datas in the memory too as an Observable.

[Read more here.](service-local-data.md)

### RemoteDataService

Responsibility:
- communicate with backend
- convert incoming datas from plain JSON to models
- convert outgoing datas to plain JSON from models
- pass errors to DData Error Handler service

### ProxyService

Responsibility:
- decide to ask datas from LocalDataService or RemoteDataService

### HelperService

Responsibility:
- ask/send datas from/to ProxyService
- switch on/off SpinnerService
- emit incoming datas
- navigate in the applicaion if data transmitting finished

### SpinnerService

Responsibility:
- show a modal layer to prevent user touch the UI while operations in progress

[Read more here](src/doc/service-spinner.md)

### Base Components

Responsibility:
- help to avoid code repeating

[BaseListComponent](src/doc/component-base-list.md)

[BaseCreateEditComponent](src/doc/component-base-create-edit.md)

### Your Final Component

In this last component maybe you want to extend the capability of Base Components, overwrite methods, etc. Contains your custom extension of this module's goods.

# How to create your custom typed service?

Easy:

```typescript
export class MyCustomService extends ProxyService<MyCustomInterface> {
  
  constructor() {
    super(new MyCustom());
  }

  // here is your custom functions
}
```
Now you can use all functions from `ProxyService` with typed datas. The service will know your API endpoints from your model and that's all.

# Read more about expectations for remote storage API

This package has several expectations for remote storage API. You can [read more about this here](expectations-for-backend.md).
