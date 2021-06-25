import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// App COmponents
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FabricCanvasComponent } from './components/fabric-canvas/fabric-canvas.component';

// Auth Service
import { AuthService } from './shared/services/auth.service';
import { StorageService } from './shared/services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    FabricCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angularWhiteboard'),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
