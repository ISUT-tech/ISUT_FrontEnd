import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { CreateFormService } from '../../shared/services/create-form.service';
import { UtilityService } from '../../shared/services/utility.service';
import { User } from '../../shared/models/user.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  formGroup: FormGroup;
  passwordForm: FormGroup;
  notificationsForm: FormGroup;
  user: User = new User();

  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  statefilteredOptions: Observable<string[]>;
  cityfilteredOptions: Observable<string[]>;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _userService: UserService,
    private _createFormService: CreateFormService,
    public _utilityService: UtilityService
  ) {
    this.formGroup = this._createFormService.createUserForm(this.user);
    this.getCountries();
    this.statefilteredOptions = this.formGroup.controls['state'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.cityfilteredOptions = this.formGroup.controls['city'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCity(value))
      );
    let user = JSON.parse(localStorage.getItem("user"));
    this._userService.getUserById(user.id).then((response: any) => {
      this.user = response.data;
      this.formGroup = this._createFormService.createUserForm(this.user);

      this.statefilteredOptions = this.formGroup.controls['state'].valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

      this.cityfilteredOptions = this.formGroup.controls['city'].valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCity(value))
        );
    })

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.stateInfo.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityInfo.filter(option => option.toLowerCase().includes(filterValue));
  }

  getCountries() {
    // var data2 = require('../../shared/services/all-country.json');
    // this.countryInfo = data2.Countries;
    // if (this.user.country) {
    //   this.onChangeCountry(this.user.country);
    // }
  }

  onChangeCountry(countryValue) {
    this.stateInfo = [];
    for (let i = 0; i < this.countryInfo[countryValue].states.length; i++) {
      this.stateInfo.push(this.countryInfo[countryValue].states[i].stateName);
    }
    if (this.user.state) {
      this.onChangeState(this.user.state);
    }
    this.statefilteredOptions = this.formGroup.controls['state'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  onChangeState(stateValue) {
    for (let i = 0; i < this.countryInfo[0].states.length; i++) {
      if (this.countryInfo[0].states[i].stateName == stateValue) {
        this.cityInfo = [];
        for (let j = 0; j < this.countryInfo[0].states[i].cities.length; j++) {
          this.cityInfo.push(this.countryInfo[0].states[i].cities[j]);
        }
      }
    }
    this.cityfilteredOptions = this.formGroup.controls['city'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCity(value))
      );
    //console.log(this.cityInfo);
  }

  showSnackbar(): void {
    this.snackBar.open('Settings Updated', '', {
      duration: 3000,
    });
  }

  update() {
    const data = this.formGroup.getRawValue();
    let formData = new FormData();
    delete data['confirmPassword'];
    // formData.append('file', this.multipart);
    formData.append('details', JSON.stringify(data));
    this.loading = true;
    this._userService.addOrSaveUser(formData, 'edit').then((response: any) => {
      this.loading = false;
      if (response && response.status === 'OK') {
        this._utilityService.openMatSnackBar(response.message, response.status);
      } else {
        this._utilityService.openMatSnackBar(response.message, response.status);
      }
    }, error => {
      this.loading = false;
      this._utilityService.openMatSnackBar(error.error.message, 'ERROR');
    });
  }
}
