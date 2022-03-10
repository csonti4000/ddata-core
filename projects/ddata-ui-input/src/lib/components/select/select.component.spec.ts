import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModel, BaseModelInterface, DdataCoreModule, SelectableListComponent, ValidatorService } from 'ddata-core';
import { DdataUiInputModule } from '../../ddata-ui-input.module';
import { InputHelperService } from '../../services/input/helper/input-helper.service';
import { DdataSelectComponent } from './select.component';

interface MockModelInterace extends BaseModelInterface<MockModelInterace> {
    name: string;
}

class MockModel extends BaseModel implements MockModelInterace {
    items: any[] = [];
    name: string;
    init(data?: any): MockModelInterace {
        data = !!data ? data : {};
        this.name = !!data.name ? data.name : '';
        return this;
    }
}
class MockListComponent extends SelectableListComponent<MockModelInterace> {
    constructor() {
        super(MockModel);
    }
}

describe('SelectInputComponent', () => {
    let component: DdataSelectComponent;
    let fixture: ComponentFixture<DdataSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DdataUiInputModule, DdataCoreModule],
            declarations: [
                MockListComponent
            ],
            providers: [
                {
                    provide: InputHelperService,
                    useValue: jasmine.createSpyObj('InputHelperService', ['get', 'randChars'])
                },
                {
                    provide: ValidatorService,
                    useValue: jasmine.createSpyObj('ValidatorService', ['get'])
                },
                {
                    provide: Router,
                    useValue: jasmine.createSpyObj('Router', ['get'])
                },
                {
                    provide: ActivatedRoute,
                    useValue: jasmine.createSpyObj('ActivatedRoute', ['get'])
                },
                {
                    provide: 'env',
                    useValue: jasmine.createSpyObj('EnvService', ['get'])
                },
                {
                    provide: HttpClient,
                    useValue: jasmine.createSpyObj('HttpClient', ['get'])
                }
            ],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(DdataSelectComponent);
                component = fixture.componentInstance;

                fixture.detectChanges();
            });
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select twice items', () => {
        component.multipleSelect = true;
        component._model = new MockModel();
        component._field = 'items';
        component.dialogSettings = {
            createEditComponent: null,
            listComponent: MockListComponent,
            listOptions: {
                models: [],
                isModal: true,
                multipleSelectEnabled: true,
                isSelectionList: true,
                loadData: false,
                selectedElements: []
            }
        };

        component.showModal('list');

        component.componentRef.instance.select.next([new MockModel().init({ name: 'test1' })]);

        expect((component._model as MockModel).items.length).toBe(1);
        expect(component.isModalVisible).toBeFalse();

        component.showModal('list');

        component.componentRef.instance.select.next([new MockModel().init({ name: 'test1' }), new MockModel().init({ name: 'test2' })]);
        expect(component.isModalVisible).toBeFalse();

        expect((component._model as MockModel).items.length).toBe(2);
    });
});
