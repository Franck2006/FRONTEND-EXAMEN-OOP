import { Component, OnInit, signal } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { CommonModule } from '@angular/common';
import { ModelAppInterfaces } from '../../../models/type.model';
import { MessageService } from '../../../services/message.service';
import { DoctorService } from '../../../services/doctor.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointementService } from '../../../services/appointment.service';

@Component({
  selector: 'app-schedule-pannel',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schedule-pannel.html',
  styleUrl: './schedule-pannel.css',
})
export class SchedulePannel implements OnInit {
  availabilityForm: FormGroup;
  constructor(
    private schedule: ScheduleService,
    private messageService: MessageService,
    private doctorService: DoctorService,
    private fromBuilder: FormBuilder,
    private appoitmentService: AppointementService,
    private scheduleService: ScheduleService,
  ) {
    this.availabilityForm = this.fromBuilder.group({
      available_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllSchedules();
    this.getAllPatientMessages();
  }

  public isInvalid(controlName: string): boolean {
    const control = this.availabilityForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  allSchedules: ModelAppInterfaces.Schedule[] = [];
  getAllSchedules() {
    this.schedule.getAllSchedules().subscribe({
      next: (schedules: any) => {},
      error: (error) => {
        console.log(' something went wrong !!!');
      },
    });
  }

  patientsUserRequests = signal<any>([]);
  profile_id = signal<string>(localStorage.getItem('id') || '');
  getAllPatientMessages() {
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors: ModelAppInterfaces.Doctor[]) => {
        const doctor = doctors.filter((doctor) => doctor?.profile?.id === this.profile_id());

        this.messageService.getOneMessageForDoctor(doctor[0].id).subscribe({
          next: (message: Partial<Observable<ModelAppInterfaces.Patient>>) => {
            console.log(message);
            this.patientsUserRequests.set(message);
          },
        });
      },
      error: () => {
        console.log(' someting went wrong ');
      },
    });
  }

  patient_id = signal<string>('');
  doctor_id = signal<string | undefined>('');
  schedule_id = signal<string | undefined>('');
  setPatientSchedule(message: ModelAppInterfaces.Message) {
    this.patient_id.set(message.patient?.id || '');

    this.doctorService.getAllDoctors().subscribe({
      next: (doctors: ModelAppInterfaces.Doctor[]) => {
        const doctor = doctors.filter((doctor) => doctor?.profile?.id === this.profile_id());
        this.doctor_id.set(doctor[0]?.id);
      },
      error: () => {
        console.log(' someting went wrong ');
      },
    });
  }

  onAppointmenetSubmit() {
    const { available_date, start_time, end_time } = this.availabilityForm.value;
    const available = new Date(available_date).toISOString();
    const start = new Date(`${available_date}T${start_time}:00`).toISOString();
    const end = new Date(`${available_date}T${end_time}:00`).toISOString();

    this.scheduleService
      .createSchedule({
        available_date: available,
        start_time: start,
        end_time: end,
      })
      .subscribe({
        next: (schedule_data: Partial<Observable<ModelAppInterfaces.Schedule>>) => {
          console.log(schedule_data);
          // this.appoitmentService.createAppointement({
          //        patient_id:this.patient_id(),
          // doctor_id: this.doctor_id() || "",
          // schedule_id:schedule_data.
          // schedule_id: schedule_data.,
          // patient_id: this.patient_id(),
          // doctor_id: this.doctor_id(),
          // })
        },
      });
  }
}
