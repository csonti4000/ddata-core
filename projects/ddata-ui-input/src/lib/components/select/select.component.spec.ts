import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DdataSelectComponent } from 'ddata-ui-input';
import { DdataUiModule } from 'projects/ddata-ui/src/public-api';

describe('SelectComponentMultipleSelect', () => {
    let component: DdataSelectComponent;
    let fixture: ComponentFixture<DdataSelectComponent>;

    beforeEach(() => {
        // DdataUiModule.InjectorInstance = TestBed;
        fixture = TestBed.createComponent(DdataSelectComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
