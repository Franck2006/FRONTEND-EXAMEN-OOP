import { Component, OnInit, signal } from '@angular/core';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';
import { ModelHardCodedValues } from '../../../models/type.model';
import { ProfileService } from '../../../services/profile.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
        this.dismiss_model(false);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
