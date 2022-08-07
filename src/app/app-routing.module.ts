import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './AppLayout/AppLayout.component';

const routes: Routes = [

  {path:'',component:AppLayoutComponent},

  {
    path: 'Category-setting',
    loadChildren: () =>
      import('../app/Category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'Faqs-setting',
    loadChildren: () =>
      import('../app/FAQ/faq.module').then((m) => m.FAQModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
