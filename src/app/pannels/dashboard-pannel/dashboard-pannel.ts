import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-pannel',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard-pannel.html',
  styleUrl: './dashboard-pannel.css',
})
export class DashboardPannel implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getAllTheCount();
  }

  lineChardData = {
    labels: ['sun', 'mon', 'tues', 'wed', 'fri', 'sat'],
    datasets: [
      {
        data: [43, 65, 65, 34, 43, 43, 43],
        label: 'sales',
        fill: 'origin',
      },
      {
        data: [43, 45, 45, 34, 43, 43, 43],
        label: 'height',
        // fill: true,
      },
    ],
  };

  lineChartOption = {
    reponsive: false,
  };

  allNumbers = signal<any>({});

  getAllTheCount() {}
}
