import { Component, input } from '@angular/core';
import { Medicamento } from '../../app/core/models/medicamento.models';

@Component({
  selector: 'app-card-medicamento',
  imports: [],
  templateUrl: './card-medicamento.html',
  styleUrl: './card-medicamento.css',
})
export class CardMedicamento {

  medicamento = input<Medicamento>();


}
