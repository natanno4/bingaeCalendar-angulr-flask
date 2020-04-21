import { NgModule } from '@angular/core';
import { Routes, ActivatedRoute,RouterModule, ParamMap } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard }  from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardNavigatorGuard } from './dashboard-navigator.guard';




const routes: Routes = [
  {path : 'login', component : LoginComponent,  canActivate : [DashboardNavigatorGuard]},
  {path : 'register', component : RegisterComponent, canActivate : [DashboardNavigatorGuard]},
  {path : "dashboard", component : DashboardComponent, canActivate: [AuthGuard]},
  {path : '', redirectTo :'/dashboard', pathMatch : 'full'},
  { path: '**', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
