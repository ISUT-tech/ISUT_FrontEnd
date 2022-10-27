import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Color } from "ng2-charts";
import { Subscription } from "rxjs";
import { DeshboardDetailsComponent } from "../../dashboards/analytics/deshboard-details/deshboard-details.component";
import { LayoutService } from "../../layouts/layout.service";
import { ConstantService } from "../../shared/services/constants.service";
import { UtilityService } from "../../shared/services/utility.service";
import { DashboardService } from "../dashboard/dashboard.service";
import { UserService } from "../user/user-service.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  performanceTitle: string = 'Annual';
  barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
      xPadding: 5,
      yPadding: 5,
      displayColors: false
    },
    scales: {
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: true
      }]
    }
  };
  barChart:any;
  chartdatas:any;
  barChartLabels: string[] = [];
  barChartDatasets: any[] = [
    {
      data: []
    }
  ];
  barChartColors: any[] = [
    {
      backgroundColor: [this.colorLuminance('#03A9F4', -0.3), this.colorLuminance('#03A9F4', -0.2), this.colorLuminance('#03A9F4', -0.1), '#03A9F4', this.colorLuminance('#03A9F4', 0.1), this.colorLuminance('#03A9F4', 0.2), this.colorLuminance('#03A9F4', 0.3), this.colorLuminance('#03A9F4', 0.4), this.colorLuminance('#03A9F4', 0.5), this.colorLuminance('#03A9F4', 0.6), this.colorLuminance('#03A9F4', 0.7), this.colorLuminance('#03A9F4', 0.8), this.colorLuminance('#03A9F4', 0.9), this.colorLuminance('#03A9F4', 0.95)],
      borderColor: '#03A9F4',
      hoverBackgroundColor: '#FF4081'
    }
  ];

  colorSubscription: Subscription;

  displayedColumns: string[] = [
    "driverId",
    "userId",
    "userMobileNumber",
    "sourceLocation",
    "destinationLocation",
    "createdAt",
  ];
  dataSource: any;
  pagination: any;
  filter: any;
  pageNumber: any = 1;

  constructor(
    public dialog: MatDialog,
    private _dashboardService: DashboardService,
    public _utilityService: UtilityService,
    public _constantService: ConstantService,
    private layoutService: LayoutService,
  ) {
    this.barChart = this._dashboardService.graphData;
    this.chartdatas=this.barChart.graphYearDto;
    let month:any[] = [];
    let count:any[] = [];
   this.chartdatas.forEach(element => {
      month.push(this._dashboardService.getMonthName(element.month - 1));
      count.push(element.count);
    });

    this.barChartDatasets[0].data= count;
    this.barChartLabels=month;

    this.barChartDatasets[0].data= [5,8,9,8,4];
  }
  randomActiveUsers(): number {
    return Math.floor((Math.random() * 100) + 1);
  }

  setNewData(): void {
    const numberOfData = this.barChartDatasets[0].data.length;
    let _barChartDataset = new Array(1);
    _barChartDataset[0] = {data: new Array(numberOfData)};

    for (let j = 0; j < numberOfData; j++) {
      _barChartDataset[0].data[j] = this.randomActiveUsers();
    }
    this.barChartDatasets = _barChartDataset;

  }

  changeSales(title: string) {
    this.setNewData();
    this.performanceTitle = title;
  }

  // Changes the opacity of a hex colour.
  colorLuminance(hex, lum): string {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i*2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00"+c).substr(c.length);
    }
    return rgb;
  }

  ngOnInit(): void {
    this.pagination = this._utilityService.pagination;
    this.getDataList();
    // chart
    this.colorSubscription = this.layoutService.currentTheme()
    .subscribe((theme) => {
      if (null !== theme) {
        const newChartColors = [...this.barChartColors];
        newChartColors[0].backgroundColor = [this.colorLuminance(theme.primary, -0.3), this.colorLuminance(theme.primary, -0.2), this.colorLuminance(theme.primary, -0.1), theme.primary, this.colorLuminance(theme.primary, 0.1), this.colorLuminance(theme.primary, 0.2), this.colorLuminance(theme.primary, 0.3), this.colorLuminance(theme.primary, 0.4), this.colorLuminance(theme.primary, 0.5), this.colorLuminance(theme.primary, 0.6), this.colorLuminance(theme.primary, 0.7), this.colorLuminance(theme.primary, 0.8), this.colorLuminance(theme.primary, 0.9), this.colorLuminance(theme.primary, 0.95)];
        newChartColors[0].borderColor = [this.colorLuminance(theme.primary, -0.3), this.colorLuminance(theme.primary, -0.2), this.colorLuminance(theme.primary, -0.1), theme.primary, this.colorLuminance(theme.primary, 0.1), this.colorLuminance(theme.primary, 0.2), this.colorLuminance(theme.primary, 0.3), this.colorLuminance(theme.primary, 0.4), this.colorLuminance(theme.primary, 0.5), this.colorLuminance(theme.primary, 0.6), this.colorLuminance(theme.primary, 0.7), this.colorLuminance(theme.primary, 0.8), this.colorLuminance(theme.primary, 0.9), this.colorLuminance(theme.primary, 0.95)];
        newChartColors[0].hoverBackgroundColor = theme.accent;
        this.barChartColors = newChartColors;
      }
    });
  }

  getNextPageData(page: any) {
    this.pagination.currentPage = page.pageIndex + 1;
    this.pagination.perPage = page.pageSize;
    this.getDataList();
  }
  getDataList() {
    let json = {
      pagination: this.pagination,
      filter: {
        driverId: 0,
        userId: 0,
      },
    };
    this._dashboardService.getData(json).then((response: any) => {
      if (response && response.status === "OK") {
        this.pagination = response.data;
        this.dataSource = this.pagination.data;
        console.log(">>>>>>>>", this.dataSource);
      }
    });
  }
}
