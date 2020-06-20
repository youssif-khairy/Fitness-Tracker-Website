import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from "@angular/fire/firestore";
import { map, take } from 'rxjs/operators';
import * as fromTraining from "./training.reducer"
import { Store } from '@ngrx/store';
import { GetAvaialableExercises, SetTraining, StopTraining, GetPastExercises } from './training.actions';

@Injectable({
    providedIn:'root'
})
export class TrainingService{
    
    fbSubscription:Subscription[] = [];
    constructor(private db:AngularFirestore,private store:Store<fromTraining.State>){}

    getAllExercises(){
    this.fbSubscription.push(this.db.collection('availableExercises').snapshotChanges()
    .pipe(map((dataArray:any[]) =>{
      return dataArray.map((el)=>{
        return{
          id:el.payload.doc.id,
          ...el.payload.doc.data()
        }
      })
    })).subscribe((exercises:Exercise[])=>{
        this.store.dispatch(new GetAvaialableExercises(exercises))
    }))
    }
    setRuningExercise(id:string){
      this.store.dispatch(new SetTraining(id))
    }
    cancelTraining(progress:number){
        this.store.select(fromTraining.getTraining).pipe(take(1)).subscribe((ex)=>{
          if (ex){
            this.addDataToDB({...ex,
              calories:ex.calories * (progress / 100),
              duration:ex.duration * (progress /100),
              date:new Date(),
              state:'cancelled'})
              this.store.dispatch(new StopTraining())
          }
        })        
    }
    completeTraining(){
      this.store.select(fromTraining.getTraining).pipe(take(1)).subscribe((ex)=>{
        if (ex){
          this.addDataToDB({...ex,
            date:new Date(),
            state:'completed'})
            this.store.dispatch(new StopTraining())
        }
      })
      
    }

    fetchPastExercises(){
      this.fbSubscription.push(this.db.collection('finishedExercises').valueChanges().
      subscribe((ex:any)=>{
        this.store.dispatch(new GetPastExercises(ex))
      }))
      
    }
    private addDataToDB(exercise:Exercise){
        this.db.collection('finishedExercises').add(exercise)
    }
    cancelAllSubscriptions(){
      this.fbSubscription.forEach(sb => sb.unsubscribe())
    }
}