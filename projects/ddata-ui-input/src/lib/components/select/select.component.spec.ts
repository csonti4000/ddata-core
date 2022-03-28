import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModel, BaseModelInterface, DdataCoreModule, ID, SelectableListComponent, ValidatorService } from 'ddata-core';
import { DdataUiInputModule } from '../../ddata-ui-input.module';
import { InputHelperService } from '../../services/input/helper/input-helper.service';
import { DdataSelectComponent } from './select.component';

interface MockModelInterace extends BaseModelInterface<MockModelInterace> {
    name: string;
    is_selected: boolean;
}

class MockModel extends BaseModel implements MockModelInterace {
    id: ID;
    items: any[] = [];
    name: string;
    is_selected = false;
    init(data?: any): this {
        data = !!data ? data : {};
        this.id = !!data.id ? data.id : 0;
        this.name = !!data.name ? data.name : '';
        this.items = !!data.items ? data.items : [];
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


    it('should not show element after deleted', () => {
        const mockMode1 = new MockModel().init({id: 1, name: 'test1'});
        const mockMode2 = new MockModel().init({id: 2, name: 'test2'});
        const mainMocModel = new MockModel().init({items: [mockMode1, mockMode2]});
        component.multipleSelect = true;
        component._model = mainMocModel;
        component._field = 'items';
        component.dialogSettings = {
            createEditComponent: null,
            listComponent: MockListComponent,
            listOptions: {
                models: [mockMode1, mockMode2],
                isModal: true,
                multipleSelectEnabled: true,
                isSelectionList: true,
                loadData: false,
                selectedElements: []
            }
        };

        component.showModal('list');

        component.componentRef.instance.select.next([mockMode1, mockMode2]);

        component.deleteFromMultipleSelectedList(mockMode1);

        expect(component.dialogSettings.listOptions.selectedElements.length).toEqual(1);

        expect(mainMocModel.items.length).toEqual(1);

        component.showModal('list');

        expect(component.componentRef.instance.selectedElements.length).toEqual(1);

        const selectedItems = component.componentRef.instance.models.filter( (obj: MockModelInterace) => obj.is_selected);

        expect(selectedItems.length).toEqual(1);
    });
});
