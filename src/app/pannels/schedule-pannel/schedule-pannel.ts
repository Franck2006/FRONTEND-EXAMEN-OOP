import { Component, OnInit, signal } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { CommonModule } from '@angular/common';
import { ModelAppInterfaces } from '../../../models/type.model';
import { MessageService } from '../../../services/message.service';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-schedule-pannel',
  imports: [CommonModule],
  templateUrl: './schedule-pannel.html',
  styleUrl: './schedule-pannel.css',
})
export class SchedulePannel implements OnInit {
  constructor(
    private schedule: ScheduleService,
    private messageService: MessageService,
    private doctorService: DoctorService,
  ) {}

  ngOnInit(): void {
    this.getAllSchedules();
    this.getAllPatientMessages();
  }

  allSchedules: ModelAppInterfaces.Schedule[] = [];
  getAllSchedules() {
    this.schedule.getAllSchedules().subscribe({
      next: (schedules: any) => {
        console.log(schedules);
        console.log(this.allSchedules);
      },
      error: (error) => {
        console.error(' something went wrong !!!');
      },
    });
  }

  doctor_id = signal<string | undefined>('');
  patientsUserRequests = signal<any>([]);
  getAllPatientMessages() {
    const profile_id = localStorage.getItem('id');

    console.log(profile_id);
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors: ModelAppInterfaces.Doctor[]) => {
        const doctor = doctors.filter((doctor) => doctor?.profile?.id);

        this.doctor_id.set(doctor[0].id);
      },
      error: () => {
        console.log(' someting went wrong ');
      },
    });

    this.messageService.getOneMessageForDoctor(this.doctor_id).subscribe({
      next: (message) => {
        console.log(message);
        this.patientsUserRequests.set(message);
      },
    });
  }
}
