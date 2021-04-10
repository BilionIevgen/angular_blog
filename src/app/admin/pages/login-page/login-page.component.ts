import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interface';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public isSubmitted: boolean;
  public form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  public message: string;
  
  constructor(
    public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params)=>{
        if(params['loginAgain']){
          this.message = 'You are not authorised,please login'
        }else if(params['authFailed']){
          this.message = 'Authorithation error'
        }
      }
    )
  }

  submit(){
    this.form.markAllAsTouched()
    if(this.form.invalid){
      return
    }
    this.isSubmitted = true;

    const user: User = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe(()=>{
      this.form.reset();
      this.router.navigate(['/admin','dashboard'])
      this.isSubmitted = false;
    },()=>{
      this.isSubmitted = false;
    })
  }

}
