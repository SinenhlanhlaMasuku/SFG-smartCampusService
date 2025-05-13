import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Trainer/login/login.component';
import { RegisterComponent } from './Trainer/register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { ForgotPasswordComponent } from './Trainer/forgot-password/forgot-password.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserManagementComponent } from './Admin/admin-dashboard/user-management/user-management.component';
import { ViewUsersComponent } from './Admin/view-users/view-users.component';
import { AddEventComponent } from './Admin/add-event/add-event.component';
import { CalendarComponent } from './Admin/calendar/calendar.component';
import { StdLoginComponent } from './Student/std-login/std-login.component';
import { StdRegisterComponent } from './Student/std-register/std-register.component';
import { StdDashboardComponent } from './Student/std-dashboard/std-dashboard.component';
import { LecturerDashboardComponent } from './Trainer/lecturer-dashboard/lecturer-dashboard.component';
import { BookRoomsComponent } from './Student/book-rooms/book-rooms.component';
import { ViewScheduleComponent } from './Student/view-schedule/view-schedule.component';
import { ViewAnnouncementsComponent } from './Student/view-announcements/view-announcements.component';
import { ManageScheduleComponent } from './Trainer/manage-schedule/manage-schedule.component';
import { ManageAnnouncementsComponent } from './Trainer/manage-announcements/manage-announcements.component';
import { ViewBookingComponent } from './Admin/view-bookings/view-bookings.component';
import { AnalyzeDataComponent } from './Admin/analyze-data/analyze-data.component';
import { UsersComponent } from './Admin/users/users.component';

@NgModule({
  declarations: [
    
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LandingPageComponent,

 
    AdminLoginComponent,
    ForgotPasswordComponent,
    ProfileManagementComponent,
 
    UserManagementComponent,
    ViewUsersComponent,
    ViewBookingComponent,
 
    AddEventComponent,
    CalendarComponent,
    StdLoginComponent,
    StdRegisterComponent,
    StdDashboardComponent,
    LecturerDashboardComponent,
    BookRoomsComponent,
    ViewScheduleComponent,
    ViewAnnouncementsComponent,
    ManageScheduleComponent,
    ManageAnnouncementsComponent,
    AnalyzeDataComponent,
    UsersComponent,
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
