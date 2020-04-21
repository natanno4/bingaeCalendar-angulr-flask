import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../auth/authentication.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css', './register.component.css']
})
export class RegisterComponent implements OnInit {

  alertMessage: string;
  showAlert : boolean;

  constructor(private authenticationServic : AuthenticationService,
    private router: Router) {}

  ngOnInit(): void {
    this.showAlert = false;
  }

  onSubmit(f: NgForm ) {
    if (f.invalid){
      f.getError
      this.alertMessage ="one or more fields are invalid.";
      this.setElert();
      return;
    }
    return this.authenticationServic.register(f.value.email, f.value.password,
      f.value.firstName, f.value.email.lastName, f.value.phone)
    .subscribe(
      resp => {
        if(resp){
          this.router.navigate(['/login']);
          return;
        }
        this.alertMessage = this.authenticationServic.responseMessage;
        this.setElert();
      }
    );
  }

  setElert(){
    if (this.alertMessage === null){
      this.showAlert = false;
      return;
    }
    this.showAlert = true;
  }
}
