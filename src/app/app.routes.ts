import { Routes } from '@angular/router';
import { Medicamentos } from './pages/medicamentos/medicamentos';
import { fabricantes } from './pages/fabricantes/fabricantes';

export const routes: Routes = [
  { path: 'medicamentos', component: Medicamentos },
  { path: 'fabricantes', component: fabricantes }
];
