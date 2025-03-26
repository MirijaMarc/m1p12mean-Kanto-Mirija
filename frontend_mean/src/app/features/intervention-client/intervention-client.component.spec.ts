import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionClientComponent } from './intervention-client.component';

describe('InterventionClientComponent', () => {
  let component: InterventionClientComponent;
  let fixture: ComponentFixture<InterventionClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
