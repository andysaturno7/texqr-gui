import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../authentication.service";

@Component({
  selector: "lib-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
  }

  isLoggedIn() {
    return this.authenticationService.isUserAuthenticated();
  }
}
