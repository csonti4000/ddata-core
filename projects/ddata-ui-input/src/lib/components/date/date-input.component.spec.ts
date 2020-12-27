// tslint:disable: max-line-length
import 'zone.js/dist/zone-testing';
import { ChangeDetectorRef, DebugElement, Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { BaseModel, BaseModelInterface, DdataCoreModule, FieldContainerInterface, FieldsInterface, ISODate, ValidatorService } from 'ddata-core';
import { DdataInputDateComponent } from './date-input.component';

class FakeModel extends BaseModel implements BaseModelInterface<any>, FieldsInterface<HasTestDateField>, HasTestDateField {
  testDateField = '1970-01-02' as ISODate;
  fields: FieldContainerInterface<HasTestDateField> = {
    testDateField: {
      title: 'testDateField - test title',
      label: 'testDateField - test label',
      placeholder: 'testDateField - test placeholder'
    }
  };
}

interface HasTestDateField {
  testDateField: ISODate;
}

describe('DateFieldComponent', () => {
  let component: DdataInputDateComponent;
  let fixture: ComponentFixture<DdataInputDateComponent>;
  let debugElement: DebugElement;
  let element: any;
  const testModel: FakeModel = new FakeModel();

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DdataInputDateComponent],
      providers: [
        Injector,
        ValidatorService,
        ChangeDetectorRef
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    DdataCoreModule.InjectorInstance = TestBed;
    fixture = TestBed.createComponent(DdataInputDateComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;

    // set model to test model
    component.model = testModel;

    // set default to selectedValue
    component.selectedValue = '';
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should change selectedValue', () => {
    component.model = testModel;

    component.ngOnInit();

    expect(component.selectedValue).toBe('1970-01-02');
  });

  it('change() should set selectedValue from empty string to "2020-07-06"', () => {
    const fakeData = {
      startDate: {
        _d: {
          getTime(): number {
            return 1;
          },
          getTimezoneOffset(): number {
            return -26567000;
          },
        }
      },
    };

    component.change(fakeData);

    expect(component.selectedValue).toBe('2020-07-06');
  });

  it('change() should set selected from empty string to "2020-01-01"', () => {
    const fakeDate = {
      target: {
        value: '2020-01-01'
      }
    };

    component.change(fakeDate);

    expect(component.selectedValue).toBe('2020-01-01');
  });

  it('should emit on "changed" when change() called with valid data', () => {});
  it('should NOT emit on "changed" when change() called with invalid data', () => {});

  // input tests
  it('model input should set _model', () => {});
  it('model input should set _model on falsy to BaseModel()', () => {});
  it('model input should set _title, _placeholder, _label, _append and _prepend', () => {});
  it('model input should set _isRequired to false if field is not required', () => {});
  it('model input should set _isRequired to true if field is required', () => {});
  it('model getter should get back the _model', () => {});

  it('field input should set _field', () => {});
  it('field input should set _field on falsy to "isValid"', () => {});

  it('prepend input should set _prepend', () => {});
  it('prepend input should set _prepend on falsy to empty string', () => {});

  it('append input should set _append', () => {});
  it('append input should set _append on falsy to empty string', () => {});

  it('labelText input should set _label', () => {});
  it('labelText input should set _label on falsy to empty string', () => {});


});
