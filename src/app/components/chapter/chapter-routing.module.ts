import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { ChapterFormComponent } from './chapter-form/chapter-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ChapterListComponent,
        data: {
          title: "Chapter List",
          breadcrumb: "Chapter List"
        }
      },
      {
        path: 'form',
        component: ChapterFormComponent,
        data: {
          title: "Chapter Form",
          breadcrumb: "Chapter Form"
        }
      },
      {
        path: 'form/:id',
        component: ChapterFormComponent,
        data: {
          title: "Chapter Form",
          breadcrumb: "Chapter Form"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChapterRoutingModule { }
