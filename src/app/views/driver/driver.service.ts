import { Injectable } from "@angular/core";
import { ApiService } from "../../shared/services/api.service";

@Injectable({
  providedIn: "root",
})
export class DriverService {
  displayedColumns: string[] = [
    "profileImage",
    "fullName",
    "mobileNumber",
    "createdAt",
    "status",
    "active",
    "action",
  ];
  constructor(private _apiService: ApiService) { }

  deleteById(id): Promise<any> {
    return this._apiService.delete(`customer/${id}/delete
    `);
  }

  acceptOrReject(id, status): any {
    return this._apiService.post(
      `cab/${id}/status/${status}
      `,

      null
    );
  }

  getData(data): Promise<any> {
    return this._apiService.post(
      "customers/pagination/filter",
      data
    );
  }
  getUserDetail(id): Promise<any> {
    return this._apiService.get(`customer/${id}
    `);
  }
  getBookingList(id): Promise<any> {
    return this._apiService.get(
      `driver/${id}/bookings
      `
    );
  }
  statusUser(id, active) {
    return this._apiService.post(
      `customer/active?id=${id}&active=${active}`,
      null
    );
  }
  driverRating(id): Promise<any> {
    return this._apiService.get(
      `driver/${id}/ratings`
    );
  }
  feedbackDetails(id): Promise<any> {
    return this._apiService.get(
      `driver/${id}/feedbacks
      `
    );
  }
  tipDetails(id): Promise<any> {
    return this._apiService.get(`driver/${id}/tips
    `);
  }
}
