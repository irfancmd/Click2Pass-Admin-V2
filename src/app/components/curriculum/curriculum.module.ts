import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumListComponent } from './curriculum-list/curriculum-list.component';
import { CurriculumFormComponent } from './curriculum-form/curriculum-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurriculumRoutingModule } from './curriculum-routing.module';



@NgModule({
  declarations: [
    CurriculumListComponent,
    CurriculumFormComponent
  ],
  imports: [
    CommonModule,
    CurriculumRoutingModule,
    ReactiveFormsModule
  ]
})
export class CurriculumModule { }
