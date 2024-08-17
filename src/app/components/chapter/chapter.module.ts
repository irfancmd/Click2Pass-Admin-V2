import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { ChapterFormComponent } from './chapter-form/chapter-form.component';
import { ChapterRoutingModule } from './chapter-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChapterListComponent,
    ChapterFormComponent
  ],
  imports: [
    CommonModule,
    ChapterRoutingModule,
    ReactiveFormsModule
  ]
})
export class ChapterModule { }
