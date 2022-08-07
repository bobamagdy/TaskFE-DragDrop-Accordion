import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CreateUpdateCategoryComponent } from './Components/Create-Update-Category/Create-Update-Category.component';
import { ViewCategoryComponent } from './Components/View-Category/View-Category.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgDragDropModule } from 'ng-drag-drop';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    CreateUpdateCategoryComponent,
    ViewCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionModule.forRoot(),
    HttpClientModule, AngularEditorModule,
    NgDragDropModule.forRoot(),
    DragDropModule,
  ]
})
export class CategoryModule { }
