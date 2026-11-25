import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MedicamentoDetalhePage } from './pages/medicamento-detalhe/medicamento-detalhe';
import { FarmaciasPage } from './pages/farmacias/farmacias';
import { FarmaciaDetalhePage } from './pages/farmacia-detalhe/farmacia-detalhe';
import { Sobre } from './pages/sobre/sobre';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'farmacias', component: FarmaciasPage },
  { path: 'farmacias/:slug', component: FarmaciaDetalhePage },
  { path: 'sobre', component: Sobre },
  { path: 'medicamentos', redirectTo: '', pathMatch: 'full' },
  { path: 'medicamentos/:id', component: MedicamentoDetalhePage },
];
