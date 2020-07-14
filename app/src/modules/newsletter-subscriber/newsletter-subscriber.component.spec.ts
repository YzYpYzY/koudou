import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterSubscriberComponent } from './newsletter-subscriber.component';

describe('NewsletterSubscriberComponent', () => {
  let component: NewsletterSubscriberComponent;
  let fixture: ComponentFixture<NewsletterSubscriberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterSubscriberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
