import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  mySignupForm: FormGroup;

  model: User[]=[];
  constructor(private formBuilder:FormBuilder, private authService: AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.mySignupForm= this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
  });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  save()
  {
    this.mySignupForm.markAllAsTouched();

    if(this.mySignupForm.valid)
    {
      this.authService.save(this.mySignupForm.get('username').value, 
        this.mySignupForm.get('password').value);
          console.log("save");
          this.router.navigate(['login']);
    }
   /* this.model = this.mySignupForm.value;
    console.log(this.model);
    var username, password;
    username = this.mySignupForm.get('username').value;
    password= this.mySignupForm.get('password').value;
    this.model = [username, password];
    console.log(username+": "+password);
    
    console.log(this.model);
    this.authService.save(username, password);
    this.router.navigate(['login']);
    this.mySignupForm.reset();*/


  }

  static matchingConfirmPasswords(passwordKey: any) { 
    let passwordInput = passwordKey['value']; 
    if (passwordInput.Password === passwordInput.ConfirmPassword) { 
        return null; 
    } 
    else { 
        return passwordKey.controls['ConfirmPassword'].setErrors({ passwordNotEquivalent: true }); 
    } 
}

  get username()
  {
    return this.mySignupForm.get('username');
  }
  get email()
  {
    return this.mySignupForm.get('email');
  }
  get password()
  {
    return this.mySignupForm.get('password');
  }
  
  get confirmPassword()
  {
    return this.mySignupForm.get('confirmPassword');
  }

 











}
