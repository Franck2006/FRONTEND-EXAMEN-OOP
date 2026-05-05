import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ModelAppInterfaces } from '../../../models/type.model';
import { Message } from '../../components/message/message';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';
import { CommonPreloader } from '../../shared/common-preloader/common-preloader';
import { DoctorDetails } from '../../components/doctor-details/doctor-details';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule, Message, CommonPreloader, DoctorDetails],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors implements OnInit {
  constructor(
    private profile: ProfileService,
    private enablingModelHook: EnablingModelHook,
  ) {}

  ngOnInit(): void {
    this.getAllDoctors();
    this.getAllPatients();
    this.getMessageModelStatus();
    this.getDoctorModelData();
  }

  doctors = signal<ModelAppInterfaces.Profile[]>([]);
  isLoadingDoctors = signal<boolean>(false);
  getAllDoctors() {
    this.isLoadingDoctors.set(true);
    this.profile.getAllDoctors().subscribe({
      next: (doctors) => {
        this.isLoadingDoctors.set(false);
        this.doctors.set(doctors);
      },
      error: () => {
        this.isLoadingDoctors.set(false);
      },
    });
  }

  modelStatus = signal<boolean>(false);
  getMessageModelStatus() {
    this.enablingModelHook.EnableSendMessageModel.subscribe(({ status }) => {
      this.modelStatus.set(status);
    });
  }

  openMessageModel(status: boolean, doctor: ModelAppInterfaces.Doctor | null) {
    const profile_id = localStorage.getItem('id') || '';
    const profile = this.profiles().filter((profile: ModelAppInterfaces.Profile) => {
      return profile.id === profile_id;
    });

    const { patient } = profile[0];

    this.enablingModelHook.setEnableSendMessageModel(status, doctor, patient);
  }

  seeDoctorDetails(doctor: ModelAppInterfaces.Profile | null) {
    this.enablingModelHook.setDoctorDetailsModel(true, doctor);
  }

  doctorModelStatus = signal<boolean>(false);
  getDoctorModelData() {
    this.enablingModelHook.DoctorDetailsModel.subscribe(
      (data: Partial<ModelAppInterfaces.Doctor[] | null> | any) => {
        this.doctorModelStatus.set(data.status);
      },
    );
  }

  profiles = signal<ModelAppInterfaces.Profile[]>([]);
  getAllPatients() {
    this.profile.getAllPatients().subscribe({
      next: (profile) => {
        this.profiles.set(profile);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
