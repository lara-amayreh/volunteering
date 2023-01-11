import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './lib/Components/header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './pages/auth/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { SharedModuleModule } from './lib/material/shared-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SideNavComponent } from './lib/Components/side-nav/side-nav.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { CommonModule } from '@angular/common';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { LayoutComponent } from './lib/Components/layout/layout.component';
import { NotificationComponent } from './lib/Components/notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    ContactComponent,
    SideNavComponent,
    LandingComponent,
    PagenotfoundComponent,
    LayoutComponent,
    NotificationComponent,
    
  

   
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    LayoutModule,
    BrowserAnimationsModule,
    SharedModuleModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CommonModule,
    AngularFireStorageModule
    
     ],
  providers: [
],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
