import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBar } from "../../shared/nav-bar/nav-bar";
import { LeftBar } from "../../shared/left-bar/left-bar";
import { ContentPannel } from "../../shared/content-pannel/content-pannel";

@Component({
  selector: 'app-dashboard-page',
  imports: [
    CommonModule,
    NavBar,
    LeftBar,
    ContentPannel
],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {}
