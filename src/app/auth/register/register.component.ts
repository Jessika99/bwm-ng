import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  errors = [];

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  register(lala) {	
  	this.authService.register(this.formData).subscribe(
  		() => {
  			this.router.navigate(['/login', {M: "REGISTERED"}]);
  		},(invalidResponse: any) => {
        this.errors = invalidResponse.error.errors;
      })
  }

}
