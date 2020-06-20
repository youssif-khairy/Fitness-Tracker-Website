
import { TrainingActions,GET_AVAIAILABLE_EXERCISES,GET_PAST_EXERCISES,SET_TRAINING,STOP_TRAINING } from "./training.actions";
import * as fromRoot from '../app.reducer';
import { Exercise } from './exercise.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface TrainingState {
    availabelExercises:Exercise[],
    pastExercises:Exercise[],
    activeTraining:Exercise,
}
export interface State extends fromRoot.State{
    training:TrainingState;
}

const initialState:TrainingState = {
    availabelExercises:[],
    pastExercises:[],
    activeTraining:null
}

export function trainingReducer(state:TrainingState = initialState, action:TrainingActions){

    switch(action.type){
        case GET_AVAIAILABLE_EXERCISES : {
            return {
                ...state,
                availabelExercises:action.payload,
            }
        }
        case GET_PAST_EXERCISES : {
            return {
                ...state,
                pastExercises:action.payload
            }
        }
        case SET_TRAINING : {
            return {
                ...state,
                activeTraining: state.availabelExercises.find(ex => ex.id == action.payload)
            }
        }
        case STOP_TRAINING : {
            return {
                ...state,
                activeTraining: null
            }
        }
        default :{
            return state
        } 
    }
}

export const getTraninigState = createFeatureSelector<TrainingState>('training')

export const getAvailableExercises = createSelector(getTraninigState, (state:TrainingState) => state.availabelExercises)
export const getPastExercises = createSelector(getTraninigState,(state:TrainingState) => state.pastExercises)
export const getTraining = createSelector(getTraninigState,(state:TrainingState) => state.activeTraining)
export const getIsTraining = createSelector(getTraninigState,(state:TrainingState) => state.activeTraining != null)
