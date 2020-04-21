import { Component, OnInit } from '@angular/core';
import { User} from '../models/user'
import {AuthenticationService} from '../auth/authentication.service'
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  alertMessage: string;
  showAlert : boolean;

  constructor(private authenticationServic : AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.showAlert = false;
  }

  onSubmit(f: NgForm){
    this.alertMessage = null
    this.setElert();
    let email = f.value.email;
    let password = f.value.password;
    this.authenticationServic.getResponseMessage = null;
    if (!email || !password || f.invalid){
      this.alertMessage = 'Incorrect username or password.'
      this.setElert();
      return;
    }
    this.authenticationServic.login(email, password).subscribe(
      resp => {
        if(resp){
          this.router.navigate(['/dashboard']);
        } else{          
          this.alertMessage = this.authenticationServic.responseMessage;
          this.setElert();
        }
      }
    )

      
  }

  setElert(){
    if (this.alertMessage === null){
      this.showAlert = false;
      return;
    }
    this.showAlert = true;
  }

}
