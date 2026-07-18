import { Component, input } from '@angular/core';
import { Medicamento } from '../../app/core/models/medicamento.models';
import { FormaFarmaceuticaPipe } from '../../app/pipes/forma-farmaceutica-pipe';
import { ClasseTerapeuticaPipe } from '../../app/pipes/classe-terapeutica-pipe';

@Component({
  selector: 'app-card-medicamento',
  imports: [FormaFarmaceuticaPipe, ClasseTerapeuticaPipe],
  templateUrl: './card-medicamento.html',
  styleUrl: './card-medicamento.css',
})
export class CardMedicamento {

  medicamento = input<Medicamento>();


}
