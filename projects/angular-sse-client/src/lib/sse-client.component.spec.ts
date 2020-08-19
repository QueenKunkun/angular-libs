import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SseClientComponent } from './sse-client.component';

describe('AngularSseClientComponent', () => {
  let component: SseClientComponent;
  let fixture: ComponentFixture<SseClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SseClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SseClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
