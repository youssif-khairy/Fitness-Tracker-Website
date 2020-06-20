import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training-service.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromTraining from "../training.reducer";
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  availableExercises$:Observable<Exercise[]>;
  constructor( private trainingService:TrainingService,private store:Store<fromTraining.State>) { }

  ngOnInit(): void {

    this.trainingService.getAllExercises()
    this.availableExercises$ = this.store.select(fromTraining.getAvailableExercises) 

  }
  startTraining(form:NgForm){
    this.trainingService.setRuningExercise(form.value.selected)
  }

}
