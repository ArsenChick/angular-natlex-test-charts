import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDatepickerComponent } from './chart-datepicker.component';

describe('ChartDatepickerComponent', () => {
  let component: ChartDatepickerComponent;
  let fixture: ComponentFixture<ChartDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDatepickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
