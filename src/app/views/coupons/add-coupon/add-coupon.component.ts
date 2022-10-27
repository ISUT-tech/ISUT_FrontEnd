import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UtilityService } from "../../../shared/services/utility.service";
import { CouponsService } from "../coupons.service";

@Component({
  selector: "app-add-coupon",
  templateUrl: "./add-coupon.component.html",
  styleUrls: ["./add-coupon.component.scss"],
})
export class AddCouponComponent implements OnInit {
  CouponData: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    public matDialogRef: MatDialogRef<AddCouponComponent>,
    public _couponService: CouponsService,
    public _utilityService : UtilityService
  ) {}

  ngOnInit() {
    this.CouponData = this._couponService.formGroup;
  }
  sumit() {
    const data = this.CouponData.getRawValue();
    this._couponService.addCouponCode(data).then((response: any) => {
      this.CouponData.reset();
      this.matDialogRef.close(response);
      this._utilityService.openMatSnackBar(response.message, response.status);
    });
  }
 

}
