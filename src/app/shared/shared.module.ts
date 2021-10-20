import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { UpperCaseDirective } from './directives/uppercase.directive';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [UpperCaseDirective],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, ReactiveFormsModule],
  providers: [],
  exports: [CommonModule, MaterialModule, FlexLayoutModule, ReactiveFormsModule, UpperCaseDirective]
})
export class SharedModule {}
