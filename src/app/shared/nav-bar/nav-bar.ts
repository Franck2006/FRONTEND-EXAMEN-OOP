import { Component, OnInit } from '@angular/core';
import { MatBadgeModule} from '@angular/material/badge';
import { SelectPannelHook } from '../../../hooks/select-file.hook';
import { ProfileService } from '../../../services/profile.service';
import { ModelAppInterfaces } from '../../../models/type.model';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatBadgeModule
  ],

  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit{
  constructor(
    private selectedPannel: SelectPannelHook,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {
    this.getMyProfile()
    this.getMyProfile()
  }

  seletectedPannel(pannel: string) {
    this.selectedPannel.setChoosenPannel(pannel);
  }

  user_profile: ModelAppInterfaces.Profile | any = {}
  getMyProfile(){
    return this.profile.me(localStorage.getItem("id") || '').subscribe({
      next:(profile)=>{
         console.log(" this is from the profile")
    console.log(this.user_profile)
    console.log("this is from the profile")
        this.user_profile = profile
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
}
