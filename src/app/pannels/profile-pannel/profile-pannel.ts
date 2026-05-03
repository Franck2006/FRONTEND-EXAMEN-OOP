import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ModelAppInterfaces } from '../../../models/type.model';
import { EditProfile } from '../../components/edit-profile/edit-profile';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';

@Component({
  selector: 'app-profile-pannel',
  imports: [EditProfile],
  templateUrl: './profile-pannel.html',
  styleUrl: './profile-pannel.css',
})
export class ProfilePannel implements OnInit {
  constructor(
    private profile: ProfileService,
    private enablingModel: EnablingModelHook,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getMyProfile();
    this.getEditProfileStatus();
  }

  user_profile = signal<ModelAppInterfaces.Profile | any>({});
  getMyProfile() {
    this.profile.me(localStorage.getItem('id') || '').subscribe({
      next: (profile) => {
        this.user_profile.set(profile);
        // this.cdr.detectChanges();
      },
      error: (err) => console.log(err),
    });
  }

  edit_profile(status: boolean) {
    console.log(status);
    this.enablingModel.setEnableProfilEditModel(status, '');
  }

  editModelStatus = signal<boolean>(false);
  getEditProfileStatus() {
    this.enablingModel.EnableProfilEditModel.subscribe(({ status }) =>
      this.editModelStatus.set(status),
    );
  }
}
