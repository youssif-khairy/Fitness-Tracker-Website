import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations:[
        SignupComponent,
        LoginComponent,
    ],
    imports:[
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        AuthRoutingModule,
    ],
    exports:[]
})
export class AuthModule{

}