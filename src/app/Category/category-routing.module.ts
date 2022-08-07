import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { AppLayoutComponent } from '../AppLayout/AppLayout.component';
import { CreateUpdateCategoryComponent } from './Components/Create-Update-Category/Create-Update-Category.component';
import { ViewCategoryComponent } from './Components/View-Category/View-Category.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: AppLayoutComponent},
      //http://localhost:4200/Category-setting/category
      { path: 'category', component: CreateUpdateCategoryComponent } ,
      //http://localhost:4200/Category-setting/list-categories
      { path: 'list-categories', component: ViewCategoryComponent } ,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
