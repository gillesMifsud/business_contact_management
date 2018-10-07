import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { FirebaseService } from "./services/firebase.service";

import { AppComponent } from './app.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDG9Al0aJ5Dc4DLfd8GPwmK0Z1gypk9bN8',
  authDomain: 'businesscontacts-bfabb.firebaseapp.com',
  databaseURL: 'https://businesscontacts-bfabb.firebaseio.com',
  storageBucket: '',
  messagingSenderId: "162274761953"
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
