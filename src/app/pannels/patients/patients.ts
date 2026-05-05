import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ModelAppInterfaces } from '../../../models/type.model';
import { ProfileService } from '../../../services/profile.service';
import { CommonPreloader } from '../../shared/common-preloader/common-preloader';

@Component({
  selector: 'app-patients',
  imports: [CommonModule, CommonPreloader],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class Patients implements OnInit {
  constructor(private profile: ProfileService) {}

  ngOnInit(): void {
    this.getAllPatients();
  }

  role: string = localStorage.getItem('role') || '';

  patients = signal<ModelAppInterfaces.Profile[]>([]);
  isLoadingPatients = signal<boolean>(false);
  getAllPatients() {
    this.isLoadingPatients.set(true);
    this.profile.getAllPatients().subscribe({
      next: (patient) => {
        console.log(patient);
        this.patients.set(patient);
        this.isLoadingPatients.set(false);
      },
      error: () => {
        this.isLoadingPatients.set(false);
      },
    });
  }
}
