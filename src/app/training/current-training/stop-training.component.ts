import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector:'app-stop-training',
    template:`<h1 mat-dialog-title>Are You sure</h1>
                <mat-dialog-content>Your progress is {{passedData.progress}}%</mat-dialog-content>
                <button [mat-dialog-close]='true' mat-button >YES</button>
                <button [mat-dialog-close]='false' mat-button>NO</button>`
})
export class StopTrainingComponent{

    constructor( @Inject(MAT_DIALOG_DATA) public passedData:any ){}
}