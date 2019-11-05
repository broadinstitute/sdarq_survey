import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import {FormComponent} from './form/form.component';
import {NonDSPformComponent} from './non-dspform/non-dspform.component';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'questionnaire', component: FormComponent},
  { path: 'notDSPquestionnaire', component: NonDSPformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
