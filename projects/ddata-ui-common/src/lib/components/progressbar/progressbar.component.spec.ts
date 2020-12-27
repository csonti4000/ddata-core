import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdataUiProgressbarComponent } from './progressbar.component';

describe('DdataUiProgressbarComponent', () => {
  let component: DdataUiProgressbarComponent;
  let fixture: ComponentFixture<DdataUiProgressbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdataUiProgressbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdataUiProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
