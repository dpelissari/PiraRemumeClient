import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMedicamento } from './card-medicamento';

describe('CardMedicamento', () => {
  let component: CardMedicamento;
  let fixture: ComponentFixture<CardMedicamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMedicamento],
    }).compileComponents();

    fixture = TestBed.createComponent(CardMedicamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
