import { Component, OnInit, signal } from '@angular/core';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';
import { ModelHardCodedValues } from '../../../models/type.model';
import { ProfileService } from '../../../services/profile.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-update-user-role',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user-role.html',
  styleUrl: './update-user-role.css',
})
export class UpdateUserRole implements OnInit {
  roleData: FormGroup;

  constructor(
    private enablingModel: EnablingModelHook,
    private profile: ProfileService,
    private fromBuilder: FormBuilder,
    private patientService: PatientService,
    private doctorService: DoctorService,
  ) {
    this.roleData = this.fromBuilder.group({
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getModelStatusWithData();
  }

  enable_data_store = signal<ModelHardCodedValues.EnablingChangeUserRole | any>({});
  getModelStatusWithData() {
    this.enablingModel.EnableChangeRole.subscribe(
      (enable_data: ModelHardCodedValues.EnablingChangeUserRole) => {
        this.enable_data_store.set(enable_data);
      },
    );
  }

  dismiss_model(status: boolean) {
    this.enablingModel.setEnableChangeRole(status, null);
  }

  onChangeRole() {
    const { role } = this.roleData.value;

    console.log(`the role is ${role}`);

    this.profile.updateProfile({ role }, this.enable_data_store().profile.id).subscribe({
      next: (profile) => {
        if (profile.role.toLowerCase() === 'patient') {
          this.patientService.createpatient({ profile_id: profile.id }).subscribe({
            next: () => {
              console.log('patient created');
            },
            error: (e) => {
              console.log(e);
              console.log('something went wrong on creating the patient');
            },
          });
        } else if (profile.role.toLowerCase() === 'doctor') {
          this.doctorService.createDotor({ profile_id: profile.id }).subscribe({
            next: () => {
              console.log('doctor created');
            },
            error: () => {
              console.log('something went wrong on creating the doctor');
            },
          });
        }
        this.dismiss_model(false);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
