import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { NavBar } from '../../shared/nav-bar/nav-bar';
import { LeftBar } from '../../shared/left-bar/left-bar';
import { ContentPannel } from '../../shared/content-pannel/content-pannel';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, NavBar, LeftBar, ContentPannel],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  constructor(private enablingModelHook: EnablingModelHook) {}

  ngOnInit(): void {
    this.getLeftbarStatus();
  }

  isLeftBarOpen = signal<boolean>(false);
  getLeftbarStatus() {
    this.enablingModelHook.leftBarModel.subscribe((status) => {
      this.isLeftBarOpen.set(status);
    });
  }
}
