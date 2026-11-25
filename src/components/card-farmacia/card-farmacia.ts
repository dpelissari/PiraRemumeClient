import { Component, input, output } from '@angular/core';
import { Farmacia } from '../../app/core/models/farmacia.models';

@Component({
  selector: 'app-card-farmacia',
  templateUrl: './card-farmacia.html',
  styleUrl: './card-farmacia.css',
})
export class CardFarmacia {
  farmacia = input.required<Farmacia>();
  abrir = output();
}
