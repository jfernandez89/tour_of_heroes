import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from '../app/core/constants/route.constants';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: RouteConstants.EMPTY,
    component: DashboardComponent
  },
  {
    path: RouteConstants.HERO + RouteConstants.ID,
    loadChildren: () => import('./modules/hero-details/hero-details.module').then((m) => m.HeroDetailsModule)
  },
  {
    path: RouteConstants.OTHER,
    pathMatch: 'full',
    redirectTo: RouteConstants.EMPTY
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
