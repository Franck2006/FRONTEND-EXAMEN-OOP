import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AppointementService } from '../../../services/appointment.service';
import { ModelAppInterfaces } from '../../../models/type.model';
import { Observer } from 'rxjs';
import { CommonPreloader } from '../../shared/common-preloader/common-preloader';

@Component({
  selector: 'app-apponitement-pannel',
  imports: [CommonModule, CommonPreloader],
  templateUrl: './apponitement-pannel.html',
  styleUrl: './apponitement-pannel.css',
})
export class ApponitementPannel implements OnInit {
  constructor(
    private profile: ProfileService,
    private appointmentService: AppointementService,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.getAllPatientAppointment();
  }

  allPatientsAppointment = signal<ModelAppInterfaces.Appointement[]>([]);
  isLoadingAppointment = signal<boolean>(false);
  getAllPatientAppointment() {
    const profile_id = localStorage.getItem('id');
    this.isLoadingAppointment.set(true);

    this.profileService.getAllPatients().subscribe({
      next: (profiles: Partial<ModelAppInterfaces.Profile[]>) => {
        const profile = profiles.filter(
          (profile: ModelAppInterfaces.Profile | undefined) => profile?.id === profile_id,
        );

        const patient_id = profile[0]?.patient?.id;

        this.appointmentService
          .getAllPatientAppointments(patient_id)
          .subscribe(
            (patientAppointMents: Partial<Observer<ModelAppInterfaces.Appointement[]>> | any) => {
              this.allPatientsAppointment.set(patientAppointMents);
              this.isLoadingAppointment.set(false);
            },
          );
      },
      error: (e) => {
        console.log(e);
        console.log('not getting users');
      },
    });
  }
}
