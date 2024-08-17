import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionSetListComponent } from './question-set-list/question-set-list.component';
import { QuestionSetFormComponent } from './question-set-form/question-set-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: QuestionSetListComponent,
        data: {
          title: "Question Set List",
          breadcrumb: "Question Set List"
        }
      },
      {
        path: 'form',
        component: QuestionSetFormComponent,
        data: {
          title: "Question Set Form",
          breadcrumb: "Question Set Form"
        }
      },
      {
        path: 'form/:id',
        component: QuestionSetFormComponent,
        data: {
          title: "Question Set Form",
          breadcrumb: "Question Set Form"
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionSetRoutingModule { }
