import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';

const routes: Routes = [
  {path:'',redirectTo:'create-user',pathMatch:'full'},
  {path:'create-user',component:FormComponent},
  {path:'users',component:UsersDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
