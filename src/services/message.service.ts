import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../app/env/enviment.env';
import { ModelAppInterfaces } from '../models/type.model';
import { SupabaseService } from '../supabase/client.supabase';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private http: HttpClient,
    private supabaseClient: SupabaseService,
  ) {}

  createMessage(message_data: ModelAppInterfaces.Message) {
    return this.http.post(environment.API + `/message/send-message`, message_data);
  }

  getAllMessages() {
    return this.http.get(environment.API + '/message/get-all-messages');
  }

  getOneMessage(id: string) {
    return this.http.get(environment.API + `/message/get-message/${id}`);
  }

  getOneMessageForDoctor(id: string | any) {
    return this.http.get(environment.API + `/message/get-for-doctor/${id}`);
  }

  messageRealTimeData = new BehaviorSubject<any>([]);
  getOneMessageForDoctorRealTime() {
    this.refreshRealTimeData();
  }

  refreshRealTimeData() {}

  updateMessage(message_data: any, id: string) {
    return this.http.patch(environment.API + `/message/update-message/${id}`, message_data);
  }

  deleteMessage(id: string) {
    return this.http.delete(environment.API + `/message/delete-message/${id}`);
  }
}
