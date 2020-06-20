import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';

@NgModule({
    declarations:[
        TrainingComponent,
        CurrentTrainingComponent,
        PastTrainingComponent,
        NewTrainingComponent,
        StopTrainingComponent
    ],
    imports:[
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training',trainingReducer)
    ],
    exports:[],
})
export class TrainingModule{

}