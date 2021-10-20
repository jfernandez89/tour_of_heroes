import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from 'src/app/core/constants/route.constants';
import { HeroDetailsComponent } from './hero-details.component';

const routes: Routes = [{ path: RouteConstants.EMPTY, component: HeroDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroDetailsRoutingModule {}
