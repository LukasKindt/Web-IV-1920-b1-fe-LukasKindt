import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, delay } from 'rxjs/operators';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(){
    const $loggedOut = document.getElementById("loggedOut");
    const $loggedIn = document.getElementById("loggedIn");
    const $welcome = document.getElementById("welcome");

    if (this.authService.user$.getValue()) {
      $loggedOut.classList.add(`hidden`);
      $loggedIn.classList.remove(`hidden`);
      $welcome.classList.remove(`hidden`);
      this.makeLogoutClickable();
    } else {
      $loggedIn.classList.add(`hidden`);
      $loggedOut.classList.remove(`hidden`);
      $welcome.classList.add(`hidden`);
    }
  }

  makeLogoutClickable(){
    const $logOut = document.getElementById("logOut");
    $logOut.addEventListener("click", () => {this.handleLogOut()});
  }

  handleLogOut(){
    this.authService.logout();
  }

  get activeUser(){
    return this.authService.user$.getValue();
  }

  
}
