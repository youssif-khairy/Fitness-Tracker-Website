import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training-service.service';
import { Exercise } from '../exercise.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from "../training.reducer";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() returnTraining = new EventEmitter();
  progress:number = 0;
  timer:number;
  currentExercise$:Observable<Exercise>;
  constructor(private dialoge:MatDialog,private trainingService:TrainingService,private store:Store<fromTraining.State>) { }


  ngOnInit(): void {
    this.currentExercise$ = this.store.select(fromTraining.getTraining);
    this.startOrResumeTraining();
  }
  startOrResumeTraining(){
    this.currentExercise$.subscribe((ex)=>{
      if (ex){
        const t = ex.duration /100 * 1000;
        this.timer = +setInterval(()=>{
          this.progress+=1;
          if (this.progress >= 100) {
            this.trainingService.completeTraining()
            clearInterval(this.timer)
          }
        },  t)//milliseconds
      }
      
    })
    
  }
  stopInterval(){
    clearInterval(this.timer)
    let dialogReff = this.dialoge.open(StopTrainingComponent,{data:{
      progress:this.progress
    }})
    dialogReff.beforeClosed().subscribe(result =>{
      if (result) 
        this.trainingService.cancelTraining(this.progress)
      else
        this.startOrResumeTraining()
    })
  }

}
