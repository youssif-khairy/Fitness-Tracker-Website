import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { TrainingService } from '../training/training-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import * as fromRoot from "../app.reducer";
import * as fromAuth from "./auth.actions"

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  constructor(private router:Router,
    private dbAuth:AngularFireAuth,
    private trainingService:TrainingService,
    private snackbar:MatSnackBar,
    private store:Store<fromRoot.State>) { }

  register(email:string,password:string){

    this.dbAuth.auth.createUserWithEmailAndPassword(email,password)
    .then( _ =>{
      this.store.dispatch(new fromAuth.SetAuthenticated())
      this.router.navigate(['/training'])
    }).catch(e=>{
      this.snackbar.open(e.message,'',{
        duration:3000
      })
    })
    
  }
  login(email:string,password:string){
    this.dbAuth.auth.signInWithEmailAndPassword(email,password)
    .then(result=>{
      //this.user.next({id,email,password})
      this.store.dispatch(new fromAuth.SetAuthenticated())
      this.router.navigate(['/training'])
    }).catch(e=>{
      this.snackbar.open(e.message,'',{
        duration:3000
      })
    })
  }
  logout(){
    this.trainingService.cancelAllSubscriptions()
    this.store.dispatch(new fromAuth.SetUnauthenticated())
    this.dbAuth.auth.signOut()
    this.router.navigate(['/login'])
  }
}
