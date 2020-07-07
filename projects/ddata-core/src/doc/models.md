# Models

## What is a model?

Model is a simple class of JavaScript with fields and methods. In our case if it's possible we want to use an extension of `BaseModel`. The `BaseModel` is the most basic model what is working with the services without any errors.

## How to prevent & avoid undefined and null errors

The most common error is the `Uncaught TypeError: Cannot read property '...' of undefined`. And this is because your object hasn't a field what you want to read.

But if you initialize your models before use, you can prevent this types of errors. And you can save many developer hours to yourself and your team.

### Minimal example to initialize a model

The `BaseModel` define the `init()` method, but you should to implement it. Here is a simple example with `id` and `name` fields:

```typescript
init(data?: any): YourModelInterface {
  data = !!data ? data : {};

  this.id = !!data.id ? Number(data.id) : 0;
  this.name = !!data.name ? data.name : '';

  return this;
}
```

So what's happening here? Go through step by step:

```typescript
  data = !!data ? data : {};
```
We prevent a scenario when `data` is `undefined` itself. If data is defined we use it. Otherwise we create an empty object into `data`.

```typescript
  this.id = !!data.id ? Number(data.id) : 0;
```
If `data.id` is truthy we set it into `this.id` as a number. Otherwise we set `0` as `this.id`. So we prevent undefined or null values in the `this.id` field.

```typescript
  this.name = !!data.name ? data.name : '';
```
If `data.name` is truthy we set it into `this.name` without any type checking in this case. We trust and suppose it's a string. Otherwise we set `''` (empty string) as `this.name`. So we prevent undefined or null values in the `this.name` field.

```typescript
  return this;
```
Lastly we return the model itself to enable the function chaining. Because we do this we can use our class later like this:

```typescript
  const yourModel = new YourModel().init();
```
or like this:
```typescript
  const yourModelName = new YourModel().init(incomingDatas).name;
```
...and in this last case you can be sure the `yourModelName` always has a value.

## Base model

`BaseModel` is a most basic model what satisfy the needs of services to parse, validate and save datas.

A basic model must have these fields and methods:

```typescript
readonly api_endpoint: string;
readonly use_localstorage: boolean;
readonly model_name: string;
id: ID;
isValid: boolean;
validationErrors: string[];
validationRules: ValidationRuleInterface;
fields: FieldContainerInterface<ModelWithId>;
init(data?: any): any;
prepareToSave(): any;
```

### Field & function references

#### Fileds

| Name | Type | Description | Default | Example |
|------|------|-------------|---------|---------|
| `api_endpoint` | string | It should be `readonly`. Contains the URI of the model's. Must start with `/` | `/you/must/be/define/api_endpoint/in/your/model` | `/company` |
| `use_localstorage` | boolean | It should be `readonly`. You can set at this point your model use LocalStorage or not. If does, you should add the model to the InitialData to load when your application is started. | `false` | `true` |
| `model_name` | string | It should be `readonly`. Unique name of your model in the application. Neccessary to avoid bugs in production version. | `NotDefined` | `Company` |
| `id` | [`ID`](src/doc/custom-types.md) | Unique ID of the model instance. If it's `0` the save will do a `POST` request, otherwise `PUT`. | `0` | `42` |
| `isValid` | boolean | Current state of model based on `validationRules`. You can use `validate()` built-in method to validate the model. | `false` | |
| `validationErrors` | string[] | Containes the result of `validate()` method. If `validate()` found errors, it will be add it to this array. | `[]` | |
| `validationRules` | [`ValidationRuleInterface`](src/doc/validation-rules.md) | Validation rule collection to validate the model's fields. | `{}` | [Examples](src/doc/validation-rules.md) |
| `fields` | [`FieldContainerInterface<T>`](src/doc/field-container.md) | You can set language parameters to your model's fields. | `{}` | [Examples](src/doc/field-container.md) |

#### Methods

| Name | Description | Result |
|------|-------------|--------|
| `init()` | This method initialize your model with given datas. It MUST handle `undefined` and `null` incoming datas, and replace it to a correct default value. | MUST return the type of your model. [See examples here](src/doc/model-init.md) |
| `prepareToSave()` | This method prepare the datas from the model to save. This method MUST handle array and child models too. | Pure JSON object from your model. [See examplex here](src/doc/model-preapretosave.md) |

## Your custom model

If you use this package, you can create your custom models. In this case you need to follow some rules. If you follow these rules then you can easyly use my other packages to build your application.

### Use interfaces

You need to separate your interface to two parts:

1. UI fields part
2. Application field parts

If you want to create an interface to companies do like this:

```typescript
export interface CompanyUIFieldsInterface {
  name: string;
  phone: string;
  email: string;
  // other fields what your users can modify
}

export interface CompanyInterface extends
  CompanyUIFieldsInterface,
  BaseModelWithoutTypeDefinitionInterface {

  id: ID;
  users: UserInterface[];
  // other fields what your users can not modify
  // method definitions
}
```

#### UI Fields Interface

This interface define fields what your users can modify. This interface can NOT contain methods or hidden fields. The fields what are defined here sould show to your users.

The naming convention in this type of interfaces is the `UIFieldsInterface` ending. For example:

- `CompanyUIFieldsInterface`
- `UserUIFieldsInterface`
- `ProductUIFieldsInterface`

Other convention: this type of interfaces needs to has a pair form `Application Fields Interface` type of interfaces.

This interface will be used in your model's `fields` field like this:

```typescript
export class Company extends BaseModel implements CompanyInterface {
  readonly api_endpoint = '/company';
  readonly model_name = 'Company';
  id: ID;
  name: string;
  phone: string;
  email: string;

  users: UserInterface[];

  fields: FieldContainerInterface<CompanyUIFieldsInterface> = {
    name: {
      title: 'Name',
      label: 'Name',
      placeholder: 'Type here your name',
    },
    phone: {
      title: 'Phone number',
      label: 'Phone number',
      placeholder: 'Phone number, for example: +1 789 555 4588',
    },
    email: {
      title: 'E-mail',
      label: 'E-mail',
      placeholder: 'E-mail, for example: my@email.com',
    }
  }

  init(data?: any): CompanyInterface {
    // ...
  }
  prepareToSave(): any {
    // ...
  }
}
```

### Application Fields Interface

The name `Application Fields Interface` is only use to differentiate it from the `UI Fileds Interface` type of interfaces.

Basically this type of interfaces are the real interface of the models.

To create this type of interfaces follow these rules:

- always use in pair with `UI Fields Interface` type of interfaces
- always extend the `BaseModelWithoutTypeDefinitionInterface`
- always define here methods and fields what your users can NOT modify (only use these fields in your application)

### Naming Conventions

1. Boolean fields always start with `is` prefix. Fox example: `is_active`, `is_handle_storage`, `is_draft`.
2. `_id` suffixed fields must have a pair without suffix. For example: `user_id` - `user`, `warehouse_id` - `warehouse`, `parent_category_id` - `parent_category`.
3. Array calld always pluralized. For example: `users: UserInterface[];`, `companies: CompanyInterface[];`, `categories: CategoryInterface[];`

## Other built-in models

This package arrives with few type of built-in models like `Pagination` or `Notifiaction`, etc.

[Read more here.](models-built-in.md)
