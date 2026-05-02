import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ModelAppInterfaces } from '../../../models/type.model';

@Component({
  selector: 'app-profile-pannel',
  imports: [],
  templateUrl: './profile-pannel.html',
  styleUrl: './profile-pannel.css',
})
export class ProfilePannel implements OnInit {
  constructor(
    private profile: ProfileService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getMyProfile();
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
}
