import {Component, OnInit} from '@angular/core';
import {SignUpInfo} from '../signup-infor';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  returnUrl: string;
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(
        '^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$')]),
    address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    confirmPassword: new FormControl('', [Validators.required]),

});

  constructor(private authService: AuthService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
  }

  signUp() {
    const {name, username, email, password, phone, address} = this.registerForm.value;
    const signUpInfoForm = new SignUpInfo(name, username, email, password,  phone, address);

    this.authService.signUp(signUpInfoForm).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        alert('Register Successful !');
        this.router.navigateByUrl(this.returnUrl);

      },
      err => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
