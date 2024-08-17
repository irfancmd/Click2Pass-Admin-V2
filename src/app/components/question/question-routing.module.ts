import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionPreviewComponent } from './question-preview/question-preview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: QuestionListComponent,
        data: {
          title: "Question List",
          breadcrumb: "Question List"
        }
      },
      {
        path: 'form',
        component: QuestionFormComponent,
        data: {
          title: "Question Form",
          breadcrumb: "Question Form"
        }
      },
      {
        path: 'form/:id',
        component: QuestionFormComponent,
        data: {
          title: "Question Form",
          breadcrumb: "Question Form"
        }
      },
      {
        path: 'preview/:id',
        component: QuestionPreviewComponent,
        data: {
          title: "Question Preview",
          breadcrumb: "Question Preview"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
