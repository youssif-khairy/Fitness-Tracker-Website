import { Action } from '@ngrx/store'
import { Exercise } from './exercise.model'

export const GET_AVAIAILABLE_EXERCISES = '[Training] Get Available exercises'
export const GET_PAST_EXERCISES = '[Training] Get Past exercises'
export const SET_TRAINING = '[Training] Set Training'
export const STOP_TRAINING = '[Training] Stop Training'

export class GetAvaialableExercises implements Action{
    readonly type = GET_AVAIAILABLE_EXERCISES
    
    constructor(public payload:Exercise[]){}
}
export class GetPastExercises implements Action{
    readonly type = GET_PAST_EXERCISES
    
    constructor(public payload:Exercise[]){}
}
export class SetTraining implements Action{
    readonly type = SET_TRAINING
    
    constructor(public payload:string){}
}
export class StopTraining implements Action{
    readonly type = STOP_TRAINING    
}

export type TrainingActions = GetAvaialableExercises | GetPastExercises | SetTraining | StopTraining 
