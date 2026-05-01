import { Component, OnInit } from '@angular/core';
import { DashboardPannel } from "../../pannels/dashboard-pannel/dashboard-pannel";
import { SchedulePannel } from "../../pannels/schedule-pannel/schedule-pannel";
import { ApponitementPannel } from "../../pannels/apponitement-pannel/apponitement-pannel";
import { ProfilePannel } from "../../pannels/profile-pannel/profile-pannel";
import { SelectPannelHook } from '../../../hooks/select-file.hook';
import { Doctors } from "../../pannels/doctors/doctors";
import { Users } from "../../pannels/users/users";
import { Patients } from "../../pannels/patients/patients";

@Component({
  selector: 'app-content-pannel',
  imports: [
    DashboardPannel,
    SchedulePannel,
    ApponitementPannel,
    ProfilePannel,
    Doctors,
    Users,
    Patients
],
  templateUrl: './content-pannel.html',
  styleUrl: './content-pannel.css',
})
export class ContentPannel implements OnInit{
  constructor(
    private selectedPannelHook: SelectPannelHook
  ){}

  ngOnInit(): void {
    this.getSelectedPannel()
  }

  selectedPannel: string = ""
  getSelectedPannel(){
    this.selectedPannelHook.pannel.subscribe(
      pannel=> {
        this.selectedPannel = pannel}
    )
  }
}
