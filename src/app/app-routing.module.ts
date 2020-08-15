import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './user/components/sign-up/sign-up.component';
import { LoginComponent } from './user/components/login/login.component';
import { TodoComponent } from './components/todo/todo.component';
import { AuthGuardService } from './service/auth-guard.service';





const routes: Routes = [
  {path:'', component:LoginComponent},
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  // otherwise redirect to home
  {path:'user', loadChildren:'./user/user.module#UserModule'},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
