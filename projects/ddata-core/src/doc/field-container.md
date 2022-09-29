# Field Container

Many times we want to control the texts of input fields like title, label and placeholder.
Basicly you write these texts into your HTML template, but if your size of application grown,
you need to think about how to reduce it.

This solution helps you optimize your app's size and keep your texts in one place. Helps to
avoid code (texts) repeating in your application, and make changes much easier.

The other benefit is when you use multilanguage texts, you can translate it simply.


## Structure

Here is a sample interface and model to use `FieldContainerInterface`:

The interfaces:

```typescript
export interface CompanyUIFieldsInterface {
  name: string;
  phone: string;
  email: string;
  title: string;
}

export interface CompanyInterface extends
  CompanyUIFieldsInterface,
  BaseModelWithoutTypeDefinitionInterface {

  id: ID;
  employees: EmployeeInterface[];
}
```
When you define the `CompanyUIFieldsInterface` you actually define the fields for the
`FieldContainerInterface`, because you can use it like this:

```typescript
export class Company extends BaseModel implements CompanyInterface {
  readonly api_endpoint = '/company';
  id: ID;
  name: string;
  phone: string;
  email: string;
  title: string;
  employees: EmployeeInterface[] = [];

  fields: FieldContainerInterface<CompanyUIFieldsInterface> = {
    name: {
      title: 'Type here the name of the company',
      label: 'Name',
      placeholder: 'Company name',
    },
    phone: {
      title: 'Type here the phone number of the company, for example: +1 456 555 7894',
      label: 'Phone number',
      placeholder: 'Phone number',
    },
    email: {
      title: 'Type here the e-mail address of company, for example: info@anycompany.com',
      label: 'E-mail',
      placeholder: 'E-mail address',
    },
    title: {
      title: 'Company',
      label: 'Company',
    },
  };

  init(data?: any): CompanyInterface {
    // ...
  }

  prepareToSave(): any {
    // ...
  }
}
```

As you see, you can define all of your texts in the model file. So any part of the application
wants work with this model, you can use your texts from here.

## How to use?

You can use your fields like this:

```typescript
@Component({
  selector: 'app-my-test',
  templateUrl: './my-test.component.html',
  styleUrls: ['./my-test.component.scss']
})
export class MyTestComponent implements OnInit {
  model: CompanyInterface = new Company().init();

  constructor() { }

  ngOnInit(): void { }
}
```

```html
<h1>{{ model.fields.title.label }}</h1>

<form>
  <div>
    <label for="name">{{ model.fields.name.label }}:</label>
    <input
      type="text"
      name="name"
      id="name"
      [(ngModel)]="model.name"
      [title]="model.fields.name.title"
      [placeholder]="model.fields.name.placeholder">
  </div>

  <div>
    <label for="phone">{{ model.fields.phone.label }}:</label>
    <input
      type="text"
      name="phone"
      id="phone"
      [(ngModel)]="model.phone"
      [title]="model.fields.phone.title"
      [placeholder]="model.fields.phone.placeholder">
  </div>

  <div>
    <label for="email">{{ model.fields.email.label }}:</label>
    <input
      type="text"
      name="email"
      id="email"
      [(ngModel)]="model.email"
      [title]="model.fields.email.title"
      [placeholder]="model.fields.email.placeholder">
  </div>
</form>
```

## Use language files

You can put your `fields` text content into an importable file like this:

```typescript
export const name: FieldInterface = {
  title: 'Type here the name of the company',
  label: 'Name',
  placeholder: 'Company name',
};

export const phone: FieldInterface = {
  title: 'Type here the phone number of the company, for example: +1 456 555 7894',
  label: 'Phone number',
  placeholder: 'Phone number',
};

export const email: FieldInterface = {
  title: 'Type here the e-mail address of company, for example: info@anycompany.com',
  label: 'E-mail',
  placeholder: 'E-mail address',
};

export const title FieldInterface = {
  title: 'Company',
  label: 'Company',
},
```

If the text's file sit on this path `src/app/i18n/company.lang.ts` you can import it into your model:

```typescript
import { name, phone, email, title } from 'src/app/i18n/company.lang.ts';

export class Company extends BaseModel implements CompanyInterface {
  // ...

  fields: FieldContainerInterface<CompanyUIFieldsInterface> = {
    name,
    phone,
    email,
    title,
  };

  // ...
}
```

## Localize

Of course if you use language files probable you use multiple languages in your application's UI.

You can import language constats dynamically like this:

```typescript
export class Company extends BaseModel implements CompanyInterface {
  // ...

  fields: FieldContainerInterface<CompanyUIFieldsInterface> {
    name,
    phone,
    email,
    title,
  } = await import('assets/i18n/company.lang.ts');

  // ...
}
```
