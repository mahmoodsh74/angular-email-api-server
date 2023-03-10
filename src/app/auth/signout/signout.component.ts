import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {delay} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.signout().pipe(delay(3000)).subscribe(() => {
//Redirect To Home
      this.router?.navigate(['/']);
    })
  }
}
