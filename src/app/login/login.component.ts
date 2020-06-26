import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  constructor(public router: Router,
              private formBuilder: FormBuilder) {
                this.loginForm = this.formBuilder.group({
                  emailId: ["", [Validators.required]],
                  password:["", [Validators.required,Validators.minLength(4)]]
                })
  }

  get formControls(){
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  login() {
    const emailId = this.loginForm.value.emailId;
    const password = this.loginForm.value.password;
    if (emailId === "parthc21@gmail.com" && password === "parth1996") {
      this.router.navigate(["/dashboard"]);
    } else {
      this.errorMessage = "Please enter email as parthc21@gmail.com and password as parth1996";
    }
  }
}
