import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { CommonModule } from '@angular/common';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile implements OnInit {
  constructor(
    private profileService: ProfileService,
    private enablingModel: EnablingModelHook,
    private doctorService: DoctorService,
  ) {}

  ngOnInit(): void {}

  dismiss_model(status: boolean) {
    this.enablingModel.setEnableProfilEditModel(status, null);
  }

  onProfileUpdate() {
    this.profileService.updateProfile;
  }

  onDoctorUpdate(id: string) {
    this.doctorService.updateDoctor(
      {
        profile_id: '',
        specialty: '',
        licenceNumber: 4,
        description: '',
      },
      id,
    );
  }
}
