import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ModelAppInterfaces } from '../../../models/type.model';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors implements OnInit {
  constructor(private profile: ProfileService) {}

  ngOnInit(): void {
    this.getAllDoctors();
    this.getAllPatients();
  }

  doctors = signal<ModelAppInterfaces.Profile[]>([]);
  getAllDoctors() {
    this.profile.getAllDoctors().subscribe({
      next: (doctors) => {
        this.doctors.set(doctors);
      },
    });
  }

  patients = signal<ModelAppInterfaces.Patient[]>([]);
  getAllPatients() {
    this.profile.getAllPatients().subscribe({
      next: (patient) => {
        console.log(patient);
      },
    });
  }
}
