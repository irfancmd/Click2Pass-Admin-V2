import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurriculumListComponent } from './curriculum-list/curriculum-list.component';
import { CurriculumFormComponent } from './curriculum-form/curriculum-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CurriculumListComponent,
        data: {
          title: "Curriculum List",
          breadcrumb: "Curriculum List"
        }
      },
      {
        path: 'form',
        component: CurriculumFormComponent,
        data: {
          title: "Curriculum Form",
          breadcrumb: "Curriculum Form"
        }
      },
      {
        path: 'form/:id',
        component: CurriculumFormComponent,
        data: {
          title: "Curriculum Form",
          breadcrumb: "Curriculum Form"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurriculumRoutingModule { }
