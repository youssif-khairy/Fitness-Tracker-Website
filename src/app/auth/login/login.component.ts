import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.authService.login(form.value.email,form.value.password)
  }
}
