import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ModelAppInterfaces } from '../../../models/type.model';
import { Message } from '../../components/message/message';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule, Message],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors implements OnInit {
  constructor(
    private profile: ProfileService,
    private enablingModel: EnablingModelHook,
  ) {}

  ngOnInit(): void {
    this.getAllDoctors();
    this.getAllPatients();
    this.getMessageModelStatus();
  }

  doctors = signal<ModelAppInterfaces.Profile[]>([]);
  getAllDoctors() {
    this.profile.getAllDoctors().subscribe({
      next: (doctors) => {
        this.doctors.set(doctors);
      },
    });
  }

  modelStatus = signal<boolean>(false);
  getMessageModelStatus() {
    this.enablingModel.EnableSendMessageModel.subscribe(({ status }) => {
      this.modelStatus.set(status);
    });
  }

  openMessageModel(status: boolean, doctor: ModelAppInterfaces.Doctor | null) {
    const profile_id = localStorage.getItem('id') || '';
    const profile = this.profiles().filter((patient: ModelAppInterfaces.Profile) => {
      return patient.id === profile_id;
    });

    const { patient } = profile[0];

    this.enablingModel.setEnableSendMessageModel(status, doctor, patient);
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
