import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import * as fromRoot from "../../app.reducer";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  isAuth$:Observable<boolean>;
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private authService:AuthServiceService,private store:Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated)
  }
  closeSidenav(){
    this.sidenavToggle.emit();
  }
  onLogout(){
    this.sidenavToggle.emit();
    this.authService.logout();
  }

}
