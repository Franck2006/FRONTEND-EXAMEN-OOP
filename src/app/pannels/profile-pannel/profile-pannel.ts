import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ModelAppInterfaces } from '../../../models/type.model';

@Component({
  selector: 'app-profile-pannel',
  imports: [],
  templateUrl: './profile-pannel.html',
  styleUrl: './profile-pannel.css',
})
export class ProfilePannel implements OnInit{
  constructor(
    private profile: ProfileService
  ) { }

  
  ngOnInit(): void {
    this.getMyProfile()
  }

  user_profile: ModelAppInterfaces.Profile | any = {}
  getMyProfile(){
    this.profile.me(localStorage.getItem('id') || '').subscribe({
      next:(profile)=>this.user_profile = profile,
      error:(err)=> console.log(err)
    })
  }
}
