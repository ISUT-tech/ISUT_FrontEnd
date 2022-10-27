import { Component, OnInit, OnDestroy, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../shared/services/user.service';

import { LayoutService } from './../../../../layouts/layout.service';

@Component({
  selector: 'portal-dashboard-tabbed-chart-widget',
  templateUrl: './tabbed-chart-widget.component.html',
  styleUrls: ['./tabbed-chart-widget.component.scss']
})
export class TabbedChartWidgetComponent implements OnInit, OnDestroy {

  @Input("data") data;

  tabs: Tab[] = [
    {
      title: 'Executions',
      value: '0',
      change: 0,
      min: 200,
      max: 2000,
    },
    {
      title: 'Results',
      value: '0',
      change: 0,
      min: 200,
      max: 2000,
    }
  ]

  activeTab: Tab = this.tabs[0];

  // lineChart
  lineChartData: any[] = [];

  lineChartLabels: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  monthList: any = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: true,
      backgroundColor: '#00ABEE',
      titleFontColor: '#ffffff',
      bodyFontColor: 'rgba(255,255,255,0.6)',
      xPadding: 20,
      yPadding: 20,
      displayColors: false
    }
  };

  lineChartColors: any[] = [{
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: '#00ABEE',
    borderWidth: '2',
    pointBackgroundColor: '#FF397C',
    pointBorderColor: '#FF397C',
    lineTension: 0.45
  }];

  executions: any[] = [0, 0, 0, 0, 0, 0];
  results: any[] = [0, 0, 0, 0, 0, 0];

  colorSubscription: Subscription;
  dashboardData: any;

  constructor(
    private layoutService: LayoutService
  ) {
    this.changeTab(this.activeTab);
  }

  fillTabData() {

    this.tabs[0].value = this.dashboardData.executionsCount;
    this.tabs[1].value = this.dashboardData.resultsCount;

    //For execution graph data
    let listExecution = this.dashboardData.executions ? this.dashboardData.executions : [];
    //listExecution.sort((a, b) => (a.key > b.key) ? 1 : -1);
    let listOfExecution = [];
    listExecution.forEach((ele, elementIndex) => {
      listOfExecution.push(ele.value);
    });
    this.executions = listOfExecution;

    //For result graph data
    let listResult = this.dashboardData.results ? this.dashboardData.results : [];
    //listResult.sort((a, b) => (a.key > b.key) ? 1 : -1);
    let listOfResult = [];
    listResult.forEach((ele, elementIndex) => {
      listOfResult.push(ele.value);
    });
    this.results = listOfResult;

    this.changeTab(this.activeTab);
  }

  ngOnInit(): void {
    this.colorSubscription = this.layoutService.currentTheme()
      .subscribe((theme) => {
        if (null !== theme) {
          const newChartColors = [...this.lineChartColors];
          newChartColors[0].borderColor = theme.primary;
          newChartColors[0].pointBackgroundColor = theme.accent;
          newChartColors[0].pointBorderColor = theme.accent;
          this.lineChartColors = newChartColors;

          this.lineChartOptions.tooltips.backgroundColor = theme.primary;
          this.lineChartOptions.tooltips.titleFontColor = theme.accent;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.data;
    this.dashboardData = currentItem.currentValue;
    console.log('prev value: ', currentItem);
    this.fillTabData();
    this.changeTab(this.activeTab);
  }

  ngOnDestroy(): void {
    this.colorSubscription.unsubscribe();
  }

  changeTab(tab: Tab): void {
    const newChartData: any[] = [{
      label: tab.title,
      data: []
    }];
    let data = [];
    for (let series = 0; series < newChartData.length; series++) {
      if (tab.title == 'Executions') {
        newChartData[series].data = this.executions;
        if (this.dashboardData) {
          this.dashboardData.executions.forEach(element => {
            data.push(this.monthList[parseInt(element.key) - 1]);
          });
        }
      }
      else if (tab.title == 'Results') {
        newChartData[series].data = this.results;
        if (this.dashboardData) {
          this.dashboardData.results.forEach(element => {
            data.push(this.monthList[parseInt(element.key) - 1]);
          });
        }
      }
    }
    this.lineChartLabels = Object.assign([], data);
    this.lineChartData = newChartData;

    this.activeTab = tab;
  }
}

interface Tab {
  title: string;
  value: string;
  change: number;
  min: number;
  max: number;
}
