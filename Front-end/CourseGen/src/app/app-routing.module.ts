import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Trainer/login/login.component';
import { RegisterComponent } from './Trainer/register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { ForgotPasswordComponent } from './Trainer/forgot-password/forgot-password.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { UserManagementComponent } from './Admin/admin-dashboard/user-management/user-management.component';
import { ViewUsersComponent } from './Admin/view-users/view-users.component';

import { AddEventComponent } from './Admin/add-event/add-event.component';
import { CalendarComponent } from './Admin/calendar/calendar.component';
import { StdDashboardComponent } from './Student/std-dashboard/std-dashboard.component';
import { StdLoginComponent } from './Student/std-login/std-login.component';
import { StdRegisterComponent } from './Student/std-register/std-register.component';
import { LecturerDashboardComponent } from './Trainer/lecturer-dashboard/lecturer-dashboard.component';
import { BookRoomsComponent } from './Student/book-rooms/book-rooms.component';
import { ViewScheduleComponent } from './Student/view-schedule/view-schedule.component';
import { ViewAnnouncementsComponent } from './Student/view-announcements/view-announcements.component';
import { ManageAnnouncementsComponent } from './Trainer/manage-announcements/manage-announcements.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Default landing page
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'manage-schedule', component: ManageAnnouncementsComponent },
  { path: 'manage-announcements', component: ManageAnnouncementsComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'profile-management', component: ProfileManagementComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'view-users', component: ViewUsersComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'lecturer-dashboard', component: LecturerDashboardComponent }, // Assuming this is the correct path for the lecturer dashboard
  {path: 'add-event', component: AddEventComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'std-register', component: StdRegisterComponent},
  {path: 'std-login', component: StdLoginComponent},
  {path: 'std-dashboard', component: StdDashboardComponent},
  {path: 'book-rooms', component: BookRoomsComponent}, 
  {path: 'view-schedule', component: ViewScheduleComponent}, 
  {path: 'view-announcements', component: ViewAnnouncementsComponent}, // Assuming this is the correct path for the view announcements component
  { path: '**', redirectTo: '' }  // Redirect unknown routes to the landing page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
