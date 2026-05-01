import { Component } from '@angular/core';
import { DashboardPannel } from "../../pannels/dashboard-pannel/dashboard-pannel";
import { SchedulePannel } from "../../pannels/schedule-pannel/schedule-pannel";
import { ApponitementPannel } from "../../pannels/apponitement-pannel/apponitement-pannel";
import { ProfilePannel } from "../../pannels/profile-pannel/profile-pannel";

@Component({
  selector: 'app-content-pannel',
  imports: [DashboardPannel, SchedulePannel, ApponitementPannel, ProfilePannel],
  templateUrl: './content-pannel.html',
  styleUrl: './content-pannel.css',
})
export class ContentPannel {}
