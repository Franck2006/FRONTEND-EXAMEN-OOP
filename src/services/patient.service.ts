import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../app/env/enviment.env';
import { ModelAppInterfaces } from '../models/type.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  createpatient(patient: ModelAppInterfaces.Patient) {
    this.http
      .post<ModelAppInterfaces.Patient>(environment.API + 'patient/create-patient', patient)
      .pipe(
        tap((patient_res: ModelAppInterfaces.Patient) => {
          localStorage.setItem('patient_id', patient_res.id || '');
        }),
      );
  }
}
