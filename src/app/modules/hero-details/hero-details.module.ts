import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeroDetailsRoutingModule } from './hero-details-routing.module';
import { HeroDetailsComponent } from './hero-details.component';

@NgModule({
  declarations: [HeroDetailsComponent],
  imports: [CommonModule, HeroDetailsRoutingModule, SharedModule]
})
export class HeroDetailsModule {}
