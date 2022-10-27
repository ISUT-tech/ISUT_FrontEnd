import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../shared/services/api.service";

@Injectable({
  providedIn: "root",
})
export class CouponsService {
  displayedColumns: string[] = [
    "code",
    "startDate",
    "endDate",
    "description",
    "discount",
    "createdAt",
  ];
  formGroup: FormGroup;
  constructor(public _apiService: ApiService, public formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      code: ["", [Validators.required]],
      description: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      discount: ["", [Validators.required]],
    });
  }

  // deleteById(id): any {
  //   return this._apiService.delete(`cab/deleteUserById/${id}`);
  // }

  getData(data): Promise<any> {
    return this._apiService.post(
      "promocodes/pagination/filter",
      data
    );
  }
  getCouponDetails(id): Promise<any> {
    return this._apiService.get(`cab/getCouponDetailsById?id=${id}`);
  }
  addCouponCode(data): Promise<any> {
    return this._apiService.post("promoCode/add", data);
  }
  setstatus(id, active) {
    return this._apiService.post(
      `promoCode/setStatus?id=${id}&active=${active}`,
      null
    );
  }
}
