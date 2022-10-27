import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, } from 'rxjs';
import { ApiService } from "../../shared/services/api.service";
import { tap } from "rxjs/operators";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: "root",
})
export class DashboardService  implements Resolve<any> {
  constructor(private _apiService: ApiService) {}
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);

  onGraphDataChanged: BehaviorSubject<any> = new BehaviorSubject(null);
  graphData: any;

  booking(): any {
    return this._apiService.get(`customer/{id}/bookings
    =2`);
  }

  getData(data): Promise<any> {
    return this._apiService.post(
      `bookings/pagination/filter
      `,
      data
    );
  }

  graph(): any {
    return this._apiService.getNew(`graph`);
  }


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getDataForResolve()
      ]).then(() => {
        resolve(null);
      }, reject);
    });
  }

    /**
   * Get Data
   *
   * @returns {Promise<any>}
   */
     getDataForResolve(): Promise<any> {
      return new Promise((resolve, reject) => {
          this.graph().subscribe((response: any) => {
              this.graphData = response.data;
              this.onGraphDataChanged.next(this.graphData);
              resolve(response);
            }, reject);
      });
    }

    getMonthName(month: any) {
      let mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return mlist[month];
    }
  }
