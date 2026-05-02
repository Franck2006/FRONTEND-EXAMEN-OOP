import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../app/env/enviment.env';
import type { ModelAppInterfaces } from '../models/type.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  getAllSchedules() {
    return this.http.get(environment.API + '/schedule/get-all-schedules');
  }

  getOneSchedule(id: string) {
    return this.http.get(environment.API + `/schedule/get-schedule/${id}`);
  }

  updateSchedule(schedule_data: ModelAppInterfaces.Schedule, id: string) {
    return this.http.patch(environment.API + `/schedule/update-schedule/${id}`, schedule_data);
  }

  createSchedule(schedule_data: ModelAppInterfaces.Schedule) {
    return this.http.post(environment.API + '/schedule/create-schedule', schedule_data);
  }

  deleteSchedule(id: string) {
    return this.http.delete(environment.API + `/schedule/delete-schedule/${id}`);
  }
}
