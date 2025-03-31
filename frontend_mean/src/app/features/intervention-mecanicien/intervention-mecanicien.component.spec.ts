import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionMecanicienComponent } from './intervention-mecanicien.component';

describe('InterventionMecanicienComponent', () => {
  let component: InterventionMecanicienComponent;
  let fixture: ComponentFixture<InterventionMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
