import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ModelAppInterfaces } from '../../../models/type.model';
import { UpdateUserRole } from '../../components/update-user-role/update-user-role';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';

@Component({
  selector: 'app-users',
  imports: [CommonModule, UpdateUserRole],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  constructor(
    private profile: ProfileService,
    private cdr: ChangeDetectorRef,
    private enablingModel: EnablingModelHook,
  ) {}

  ngOnInit(): void {
    this.getAllProfiles();
    this.getModelStatusWithData();
  }

  allProfiles = signal<ModelAppInterfaces.Profile[] | any>([]);
  getAllProfiles() {
    this.profile.getAllProfiles().subscribe({
      next: (profiles) => {
        console.log(profiles);
        this.allProfiles.set(profiles);
        // this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  modelStatus!: boolean;
  getModelStatusWithData() {
    this.enablingModel.EnableChangeRole.subscribe((enable_data) => {
      this.modelStatus = enable_data.status;
    });
  }

  changeUserRole(profile: ModelAppInterfaces.Profile, id: string) {
    this.enablingModel.setEnableChangeRole(true, profile);
  }
}
