import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSizeComponent } from './detail-size.component';

describe('DetailSizeComponent', () => {
  let component: DetailSizeComponent;
  let fixture: ComponentFixture<DetailSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
