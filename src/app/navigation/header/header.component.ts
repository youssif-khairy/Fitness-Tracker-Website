import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import * as fromRoot from "../../app.reducer";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  isAuth$:Observable<boolean>;
  constructor(private authService:AuthServiceService,private store:Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated)
  }
  toggleSidenavFunc(){
    this.toggleSidenav.emit();
  }
  onLogout(){
    this.authService.logout();
  }
}
