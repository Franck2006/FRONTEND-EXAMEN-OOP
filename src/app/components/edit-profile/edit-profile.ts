import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { CommonModule } from '@angular/common';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';
import { DoctorService } from '../../../services/doctor.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile implements OnInit {
  doctorData: FormGroup;
  constructor(
    private profileService: ProfileService,
    private enablingModel: EnablingModelHook,
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
  ) {
    this.doctorData = this.formBuilder.group({
      specialty: [''],
      licenceNumber: [''],
      description: [''],
    });
  }

  ngOnInit(): void {}

  dismiss_model(status: boolean) {
    this.enablingModel.setEnableProfilEditModel(status, null);
  }

  onProfileUpdate() {
    this.profileService.updateProfile;
  }

  onDoctorUpdate() {
    const { specialty, licenceNumber, description } = this.doctorData.value;
    const profile_id = localStorage.getItem('id') || '';

    console.log(this.doctorData.value);
    console.log(profile_id);

    this.doctorService
      .createDotor({
        profile_id,
        specialty,
        licenceNumber,
        description,
      })
      .subscribe({
        next: () => {
          console.log('doctor created');
        },
        error: () => {
          console.log('somthing went wrong on creating the daoctor');
        },
      });
  }
}
