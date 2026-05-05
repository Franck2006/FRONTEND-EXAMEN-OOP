import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ScheduleService } from '../../../services/schedule.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';
import { ModelAppInterfaces } from '../../../models/type.model';

@Component({
  selector: 'app-updating-patient-schedule',
  imports: [CommonModule, MatSnackBarModule, ReactiveFormsModule],
  templateUrl: './updating-patient-schedule.html',
  styleUrl: './updating-patient-schedule.css',
})
export class UpdatingPatientSchedule implements OnInit {
  availabilityForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private scheduleService: ScheduleService,
    private enablingModel: EnablingModelHook,
  ) {
    this.availabilityForm = this.formBuilder.group({
      available_date: [''],
      start_time: [''],
      end_time: [''],
    });
  }

  ngOnInit(): void {
    this.getPatientUpdateAppointmentdata();
  }

  choosen_patient = signal<boolean>(false);
  patientData = signal<ModelAppInterfaces.Patient | null>(null);
  scheduleData = signal<ModelAppInterfaces.Schedule | null>(null);

  getPatientUpdateAppointmentdata() {
    this.enablingModel.EnableUpdateUserAppointmentModel.subscribe({
      next: (updateParientAppointment) => {
        this.patientData.set(updateParientAppointment.patient);
        this.scheduleData.set(updateParientAppointment.schedule);

        this.availabilityForm.patchValue({
          available_date: this.formatDate(this.scheduleData()?.available_date ?? ''),
          start_time: this.formatTime(this.scheduleData()?.start_time ?? ''),
          end_time: this.formatTime(this.scheduleData()?.end_time ?? ''),
        });

        console.log(this.availabilityForm.value);
      },
    });
  }

  isSubmittingNewAppoint = signal<boolean>(false);
  onNewAppointmentSubmit() {
    this.isSubmittingNewAppoint.set(true);

    const { available_date, start_time, end_time } = this.availabilityForm.value;

    const available = new Date(available_date).toISOString();
    const start = new Date(`${available_date}T${start_time}:00`).toISOString();
    const end = new Date(`${available_date}T${end_time}:00`).toISOString();

    const id = this.scheduleData()?.id;

    this.scheduleService
      .updateSchedule(
        {
          available_date: available,
          start_time: start,
          end_time: end,
        },
        id,
      )
      .subscribe({
        next: (data) => {
          this.isSubmittingNewAppoint.set(false);
        },
        error: () => {
          this.isSubmittingNewAppoint.set(false);
        },
      });
  }

  formatDate(date: string) {
    return new Date(date).toISOString().split('T')[0];
  }

  formatTime(time?: string) {
    if (!time) return '';

    const date = new Date(time);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }
}
