import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSseClientComponent } from './angular-sse-client.component';

describe('AngularSseClientComponent', () => {
  let component: AngularSseClientComponent;
  let fixture: ComponentFixture<AngularSseClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularSseClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularSseClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
