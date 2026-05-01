import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ModelAppInterfaces } from '../../../models/type.model';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  constructor(private profile: ProfileService) { }
  
  ngOnInit(): void {
    this.getAllProfiles();
  }

  allProfiles: ModelAppInterfaces.Profile[] | any = [];
  getAllProfiles(){
    this.profile.getAllProfiles().subscribe({
      next: (profiles) => {
        console.log(profiles);
        this.allProfiles = profiles;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
