import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionPreviewComponent } from './question-preview/question-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuestionRoutingModule } from './question-routing.module';



@NgModule({
  declarations: [
    QuestionFormComponent,
    QuestionListComponent,
    QuestionPreviewComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuestionModule { }
