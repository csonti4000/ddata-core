import { BaseModel } from 'src/app/models/base-model/base-model.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { AppModule } from 'src/app/app.module';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture;


  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
}
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextareaComponent],
      providers: [ValidatorService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    AppModule.InjectorInstance = TestBed;
    fixture = TestBed.overrideComponent(TextareaComponent, {
      set: {
        template: '<div class="input-group">\
        <label [class]="labelClass" [for]="field" *ngIf="showLabel">\
            Label:\
            <ng-container *ngIf="true">\
              <span *ngIf="true"> *</span>\
            </ng-container>\
        </label>\
        <textarea *ngIf="!isViewOnly"\
            [id]="field"\
            [class.invalid]="false"\
            [class]="textareaClass"\
            [rows]="rowsNumber"\
            [disabled]="disabled">\
        </textarea>\
        <div *ngIf="isViewOnly"\
          [class]="textareaClass + \' border-0 bg-light\'">\
          \
        </div>\
    </div>'
      }
    })
      .createComponent(TextareaComponent);
    fixture.detectChanges();
  });
  afterEach(() => {
    document.body.removeChild(fixture.debugElement.nativeElement);
  })

  it('should create', () => {
    component = new TextareaComponent();
    expect(component).toBeTruthy();
  });

  it('getTitle() should return title', () => {
    component = new TextareaComponent();
    component.field = 'fake';
    component.model = {
      fields: {
        fake: {
          title: 'a',
        }
      }
    } as unknown as BaseModel;

    let fakestring = component.getTitle();
    expect(fakestring).toBeDefined();
    expect(fakestring).toBe('a');

    component.model.fields = {};

    fakestring = component.getTitle();
    expect(fakestring).toBeDefined();
    expect(fakestring).toBe('');
  });

  it('getLabel() should return label', () => {
    component = new TextareaComponent();
    component.field = 'fake';
    component.model = {
      fields: {
        fake: {
          label: 'a',
        }
      }
    } as unknown as BaseModel;

    let fakestring = component.getLabel();
    expect(fakestring).toBeDefined();
    expect(fakestring).toBe('a');

    component.model.fields = {};

    fakestring = component.getLabel();
    expect(fakestring).toBeDefined();
    expect(fakestring).toBe('Az adatmező címke nincs definiálva a modelben.');
  });

  it('getPlaceholder() should return placeholder', () => {
    component = new TextareaComponent();
    component.field = 'fake';
    component.model = {
      fields: {
        fake: {
          placeholder: 'a',
        }
      }
    } as unknown as BaseModel;

    let fakestring = component.getPlaceholder();
    expect(fakestring).toBeDefined();
    expect(fakestring).toBe('a');

    component.model.fields = {};

    fakestring = component.getPlaceholder();
    expect(fakestring).toBeDefined();
    expect(fakestring).toBe('');
  });
});
