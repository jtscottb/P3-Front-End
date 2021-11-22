import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ButtonComponent } from './components/button/button.component';
import { NurseComponent } from './components/nurse/nurse.component';
import { HttpClientModule } from '@angular/common/http';

import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { NurseService } from './services/nurse.service';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RegistrationComponent,
    NurseComponent,
    ButtonComponent,
    NurseComponent,
    ProfileEditComponent,
    DoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [NurseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
