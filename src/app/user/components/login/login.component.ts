import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  myLoginForm: FormGroup;
  returnUrl:string;
  message: string;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.myLoginForm=this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.returnUrl= '/todo';
  }

  get f() { return this.myLoginForm.controls; }  
  login()
  {
    this.myLoginForm.markAllAsTouched();
     console.log(this.myLoginForm);
     
    if (this.authService.authenticate(this.myLoginForm.get('username').value, this.myLoginForm.get('password').value)) {  
      console.log("Login successful");
      this.router.navigate([this.returnUrl]);
      this.myLoginForm.reset();
      }
     else
      {
        if(!sessionStorage.getItem('username') && this.myLoginForm.valid)
        {
          this.message = "Please signup first"; 
        }
        else if(this.myLoginForm.valid){
          this.message = "Please check your userid and password"; 
        }
      }
     }
  get username()
  {
    return this.myLoginForm.get('username');
  }
  get password()
  {
    return this.myLoginForm.get('password');
  }

}
