import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MedicamentoDetalhePage } from './pages/medicamento-detalhe/medicamento-detalhe';
import { FarmaciasPage } from './pages/farmacias/farmacias';
import { FarmaciaDetalhePage } from './pages/farmacia-detalhe/farmacia-detalhe';
import { Sobre } from './pages/sobre/sobre';
import { LoginPage } from './pages/login/login';
import { SincronismoPage } from './pages/admin/sincronismo/sincronismo';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'farmacias', component: FarmaciasPage },
  { path: 'farmacias/:slug', component: FarmaciaDetalhePage },
  { path: 'sobre', component: Sobre },
  { path: 'login', component: LoginPage },
  { path: 'admin', redirectTo: 'admin/sincronismo', pathMatch: 'full' },
  { path: 'admin/sincronismo', component: SincronismoPage, canActivate: [adminGuard] },
  { path: 'medicamentos', redirectTo: '', pathMatch: 'full' },
  { path: 'medicamentos/:id', component: MedicamentoDetalhePage },
];
