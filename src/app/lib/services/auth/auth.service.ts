import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularfireauth:AngularFireAuth) { }
  userState$ = this.angularfireauth.authState;

  signIn(email:string, password: string){


    return this.angularfireauth.signInWithEmailAndPassword(email, password);
  }
  signUp(email: string, password: string){
    return this.angularfireauth.createUserWithEmailAndPassword(email, password);
  }

  
  signout(){
    return this.angularfireauth.signOut();
  }

  
}
