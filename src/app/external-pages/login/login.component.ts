import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CreateFormService } from '../../shared/services/create-form.service';
import { UtilityService } from '../../shared/services/utility.service';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'portal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private _createFormService: CreateFormService,
    private _utilityService: UtilityService,
    private _loginService: LoginService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.loginForm = this._createFormService.createLoginForm();
  }

  ngOnInit(): void {
  }

  login(): void {
    const data = this.loginForm.getRawValue();
    //if (this._utilityService.validateEmail(data.username)) {
    this.loading = true;
    this._loginService.login(data).then((response: any) => {
      this.loading = false;
      if (response && response.status === 'OK') {
        localStorage.setItem('userToken', response.data.token);
        const user = {
          id: response.data.user_details.id,
          createdAt:response.data.user_details.createdAt,
          fullName: response.data.user_details.fullName,
          password:response.data.user_details.password,
          mobileNumber:response.data.user_details.mobileNumber,
          appId:response.data.user_details.appId,
          profileImage: response.data.user_details.profilePhoto,
          role: response.data.user_details.role
        };
        this._loginService.setSessionUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        this._loginService.isLoginSubject.next(true);
        this.router.navigate(['/user']);
      } else {
        this._utilityService.openMatSnackBar(response.message, response.status);
      }
    }, error => {
      this.loading = false;
        this._utilityService.openMatSnackBar('Invalid credentials', "ERROR");
    });
    // } else {
    //   this._utilityService.openMatSnackBar('Please enter a valid e-mail address ', 'Try Again');
    // }
  }

  forgotPassword(): void {
    this.router.navigate(['/external/forgot-password']);
  }


}
