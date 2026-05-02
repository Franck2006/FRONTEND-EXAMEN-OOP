import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';

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
    this.profile.me(localStorage.getItem('id') || '').subscribe({
      next:(profile)=>{
        console.log(`profile: ${JSON.stringify(profile)}`);
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}
