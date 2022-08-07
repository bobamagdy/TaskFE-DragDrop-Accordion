import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { CreateUpdateFAQComponent } from './Components/Create-Update-FAQ/Create-Update-FAQ.component';
import { ViewFAQComponent } from './Components/View-FAQ/View-FAQ.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'AppComponent', pathMatch: 'full' },
      { path: 'faq', component: CreateUpdateFAQComponent } ,
      { path: 'list-faqs', component: ViewFAQComponent } ,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FAQRoutingModule { }
