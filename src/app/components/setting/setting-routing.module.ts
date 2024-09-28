import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { GeneralComponent } from './general/general.component';


const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    data: {
      title: "General",
      breadcrumb: "General"
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: "Profile",
      breadcrumb: "Profile"
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
