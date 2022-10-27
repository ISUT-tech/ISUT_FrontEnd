import { Injectable } from "@angular/core";
import { id } from "@swimlane/ngx-charts/release/utils";
import { ApiService } from "../../shared/services/api.service";

@Injectable({
  providedIn: "root",
})
export class CabService {
  displayedColumns: string[] = [
    "carImages",
    "carName",
    "carNumber",
    "city",
    "state",
    "carModel",
    "licenseNumber",
    "action",
  ];

  constructor(public _apiService: ApiService) {}
  getData(data): Promise<any> {
    return this._apiService.post("cabs/pagination/filter", data);
  }
  getCabDetails(id): Promise<any> {
    return this._apiService.get(`cab/${id}/cabs`);
  }
}
