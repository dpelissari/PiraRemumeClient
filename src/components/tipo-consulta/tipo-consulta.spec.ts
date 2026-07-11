import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoConsulta } from './tipo-consulta';

describe('TipoConsulta', () => {
  let component: TipoConsulta;
  let fixture: ComponentFixture<TipoConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoConsulta],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoConsulta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
