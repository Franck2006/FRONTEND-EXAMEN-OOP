import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { AppointementService } from '../../../services/appointment.service';
import { ProfileService } from '../../../services/profile.service';
import { ModelHardCodedValues } from '../../../models/type.model';

@Component({
  selector: 'app-dashboard-pannel',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard-pannel.html',
  styleUrl: './dashboard-pannel.css',
})
export class DashboardPannel implements OnInit {
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getAllUserWithRoles();
  }

  lineChardData = {
    labels: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    datasets: [
      {
        data: [1, 45, 65, 34, 43, 43, 43],
        label: 'messages',
        fill: 'origin',
      },
      {
        data: [43, 3, 45, 34, 43, 43, 43],
        label: 'rendez-vous',
        fill: true,
      },
    ],
  };

  lineChartOption = {
    reponsive: false,
  };

  // export interface Root

  isLoadingUserWithRole = signal<boolean>(false);
  allUserWithRoles = signal<ModelHardCodedValues.UsRootersWithRolesModel[]>([]);
  getAllUserWithRoles() {
    this.isLoadingUserWithRole.set(true);
    this.profileService.getUsersBasedOnRole().subscribe({
      next: (usersWithRoles: any) => {
        this.allUserWithRoles.set(usersWithRoles);
        this.isLoadingUserWithRole.set(false);
      },
    });
  }

  isLoadingSomeUser = signal<boolean>(true);
}
