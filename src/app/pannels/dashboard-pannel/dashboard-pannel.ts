import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard-pannel',
  imports: [CommonModule],
  templateUrl: './dashboard-pannel.html',
  styleUrl: './dashboard-pannel.css',
})
export class DashboardPannel implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getAllTheCount();
  }

  allNumbers = signal<any>({});

  getAllTheCount() {}
}
