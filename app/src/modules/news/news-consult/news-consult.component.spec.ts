import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsConsultComponent } from './news-consult.component';

describe('NewsConsultComponent', () => {
  let component: NewsConsultComponent;
  let fixture: ComponentFixture<NewsConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
