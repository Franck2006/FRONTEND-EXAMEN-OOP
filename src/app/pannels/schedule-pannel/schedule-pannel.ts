import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'app-schedule-pannel',
  imports: [],
  templateUrl: './schedule-pannel.html',
  styleUrl: './schedule-pannel.css',
})
export class SchedulePannel implements OnInit{
  constructor(
    private schedule: ScheduleService
  ){}

  ngOnInit(): void {
    // this is returning all the schedule 
    this.getAllSchedules()
  }

  getAllSchedules(){
    this.schedule.getAllSchedules().subscribe({
      next:(schedules: any)=>{
        console.log(schedules)
      },
      error:(error)=>{
        console.error(" something went wrong !!!")
      }
    })
  }
}
