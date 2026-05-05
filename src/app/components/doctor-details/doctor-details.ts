import { Component, OnInit, signal } from '@angular/core';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';
import { ModelAppInterfaces } from '../../../models/type.model';

@Component({
  selector: 'app-doctor-details',
  imports: [],
  templateUrl: './doctor-details.html',
  styleUrl: './doctor-details.css',
})
export class DoctorDetails implements OnInit {
  constructor(private enablingModelHook: EnablingModelHook) {}

  ngOnInit(): void {
    this.getDoctorModelData();
  }

  dismiss_model(status: boolean) {
    this.enablingModelHook.setDoctorDetailsModel(false, null);
  }

  doctorModelStatus = signal<boolean>(false);
  doctorModelData = signal<ModelAppInterfaces.Profile | null>(null);
  getDoctorModelData() {
    this.enablingModelHook.DoctorDetailsModel.subscribe({
      next: ({ doctor }) => {
        this.doctorModelData.set(doctor);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
