import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ModelAppInterfaces } from '../../../models/type.model';
import { UpdateUserRole } from '../../components/update-user-role/update-user-role';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';
import { CommonPreloader } from '../../shared/common-preloader/common-preloader';

@Component({
  selector: 'app-users',
  imports: [CommonModule, UpdateUserRole, CommonPreloader],
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

  isLoadingUsers = signal<boolean>(false);
  allProfiles = signal<ModelAppInterfaces.Profile[] | any>([]);
  getAllProfiles() {
    this.isLoadingUsers.set(true);
    this.profile.getAllProfiles().subscribe({
      next: (profiles) => {
        this.isLoadingUsers.set(false);
        console.log(profiles);
        this.allProfiles.set(profiles);
      },
      error: (err) => {
        console.error(err);
        this.isLoadingUsers.set(false);
      },
    });
  }

  modelStatus = signal<boolean>(false);
  getModelStatusWithData() {
    this.enablingModel.EnableChangeRole.subscribe((enable_data) => {
      this.modelStatus.set(enable_data.status);
    });
  }

  changeUserRole(profile: ModelAppInterfaces.Profile, id: string) {
    this.enablingModel.setEnableChangeRole(true, profile);
  }
}
