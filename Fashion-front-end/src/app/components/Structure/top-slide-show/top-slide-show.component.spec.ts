import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSlideShowComponent } from './top-slide-show.component';

describe('TopSlideShowComponent', () => {
  let component: TopSlideShowComponent;
  let fixture: ComponentFixture<TopSlideShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSlideShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSlideShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
