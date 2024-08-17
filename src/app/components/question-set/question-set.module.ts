import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionSetListComponent } from './question-set-list/question-set-list.component';
import { QuestionSetFormComponent } from './question-set-form/question-set-form.component';
import { QuestionSetRoutingModule } from './question-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    QuestionSetListComponent,
    QuestionSetFormComponent
  ],
  imports: [
    CommonModule,
    QuestionSetRoutingModule,
    ReactiveFormsModule
  ]
})
export class QuestionSetModule { }
