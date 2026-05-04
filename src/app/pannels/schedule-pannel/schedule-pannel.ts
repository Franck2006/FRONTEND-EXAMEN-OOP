import { Component, OnInit, signal } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { CommonModule } from '@angular/common';
import { ModelAppInterfaces } from '../../../models/type.model';
import { MessageService } from '../../../services/message.service';
import { DoctorService } from '../../../services/doctor.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointementService } from '../../../services/appointment.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-schedule-pannel',
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule],
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
    private appointment: AppointementService,
    private snackBar: MatSnackBar,
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
    this.getAllPatientMessages();
    this.getAllDoctorAppointments();
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

  isGettingPatientsUserRequests = signal<boolean>(false);
  patientsUserRequests = signal<any>([]);
  profile_id = signal<string>(localStorage.getItem('id') || '');
  getAllPatientMessages() {
    this.isGettingPatientsUserRequests.set(true);
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors: ModelAppInterfaces.Doctor[]) => {
        const doctor = doctors.filter((doctor) => doctor?.profile?.id === this.profile_id());

        this.messageService.getOneMessageForDoctor(doctor[0].id).subscribe({
          next: (message: Partial<Observable<ModelAppInterfaces.Patient>>) => {
            console.log(message);
            this.patientsUserRequests.set(message);
            this.isGettingPatientsUserRequests.set(false);
          },
        });
      },
      error: () => {
        this.isGettingPatientsUserRequests.set(false);
        console.log(' someting went wrong ');
        this.showSnackMsgBar('check your network', 'ok');
      },
    });
  }

  choosen_patient = signal<ModelAppInterfaces.Profile | null>(null);
  patient_id = signal<string>('');
  doctor_id = signal<string | undefined>('');
  schedule_id = signal<string | undefined>('');
  setPatientSchedule(message: ModelAppInterfaces.Message | any) {
    this.patient_id.set(message.patient?.id || '');

    this.choosen_patient.set(message.patient.profile);

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

  submittingAppoint = signal<boolean>(false);
  onAppointmenetSubmit() {
    this.submittingAppoint.set(true);
    const { available_date, start_time, end_time } = this.availabilityForm.value;
    const available = new Date(available_date).toISOString();
    const start = new Date(`${available_date}T${start_time}:00`).toISOString();
    const end = new Date(`${available_date}T${end_time}:00`).toISOString();

    this.scheduleService
      .createSchedule({
        available_date: available,
        start_time: start,
        end_time: end,
        doctor_id: this.doctor_id() || '',
      })
      .subscribe({
        next: (schedule_data: Partial<Observable<ModelAppInterfaces.Schedule>> | any) => {
          console.log(schedule_data);
          this.appoitmentService
            .createAppointement({
              patient_id: this.patient_id(),
              doctor_id: this.doctor_id() || '',
              schedule_id: schedule_data.id,
            })
            .subscribe({
              next: (appointment) => {
                this.getAllDoctorAppointments();
                this.submittingAppoint.set(false);
                this.showSnackMsgBar('you have made the appointment, check onto the table', 'ok');
              },
              error: (e) => {
                this.showSnackMsgBar(
                  'someting went wrong on creating the appointment check your network ',
                  'ok',
                );
              },
            });
        },
      });
  }

  isLoadingDoctorAppointments = signal<boolean>(false);
  doctorAppointments = signal<ModelAppInterfaces.Appointement[]>([]);
  getAllDoctorAppointments() {
    const profile_id = localStorage.getItem('id');
    this.isLoadingDoctorAppointments.set(true);

    this.doctorService.getAllDoctors().subscribe({
      next: (doctors: ModelAppInterfaces.Doctor[]) => {
        const doctor = doctors.filter((doctor) => doctor?.profile?.id === profile_id);
        this.doctor_id.set(doctor[0]?.id);

        console.log('the doctor is: ');
        console.log(doctor);
        console.log('the doctor is: ');

        if (this.doctor_id()) {
          this.appointment.getAllDoctorAppointments(doctor[0]?.id).subscribe({
            next: (appointments: Partial<ModelAppInterfaces.Appointement[]> | any) => {
              this.doctorAppointments.set(appointments);
              this.isLoadingDoctorAppointments.set(false);
            },
            error: () => {
              this.isLoadingDoctorAppointments.set(false);
              this.showSnackMsgBar(
                'someting went wrong on creating the appointment check your network ',
                'ok',
              );
            },
          });
        }
      },
      error: () => {
        console.log(' someting went wrong ');
      },
    });
    console.log(' this is the code of the doctor:    ' + this.doctor_id());
  }

  cancel_appointment(id: string | undefined) {
    this.appoitmentService.deleteAppointement(id).subscribe({
      next: () => {
        this.showSnackMsgBar('the appoinment delete !!', 'ok');
        this.getAllDoctorAppointments();
      },
      error: (e) => {
        console.log(e);
        this.showSnackMsgBar('something wen wrong on delete the appointment', 'ok');
      },
    });
  }

  isCancelAppointmentStatus = signal<boolean>(false);
  closeModalCancelAppointment(isCancelAppointment: boolean) {
    this.isCancelAppointmentStatus.set(isCancelAppointment);
  }

  showSnackMsgBar(msg: string, action: string) {
    const snackBarRef = this.snackBar.open(msg, action, { duration: 3000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log(' this is the atttt');
    });
    snackBarRef.onAction().subscribe(() => {
      console.log(' this is the action');
    });
  }
}
