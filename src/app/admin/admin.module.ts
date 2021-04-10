import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CreatePageComponent } from "./pages/create-page/create-page.component";
import { DashboardPageComponent } from "./pages/dashboard-page/dashboard-page.component";
import { EditPageComponent } from "./pages/edit-page/edit-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { SearchPipe } from "./shared/pipes/search.pipe";
import { AuthGuard } from "./shared/services/auth.guard";
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from "./shared/services/alert.service";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent,
  ],
  imports: [
    //CommonModule for base directives, pipes ...
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: AdminLayoutComponent,
        children: [
          { path: "", redirectTo: "/admin/login", pathMatch: "full" },
          { path: "login", component: LoginPageComponent },
          {
            path: "dashboard",
            component: DashboardPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "post/edit/:id",
            component: EditPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "create",
            component: CreatePageComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AlertService],
})
export class AdminModule {}
