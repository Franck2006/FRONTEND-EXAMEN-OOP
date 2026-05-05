import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModelAppInterfaces, ModelHardCodedValues } from '../models/type.model';

@Injectable({
  providedIn: 'root',
})
export class EnablingModelHook {
  private subjectEnableChangeRole =
    new BehaviorSubject<ModelHardCodedValues.EnablingChangeUserRole>({
      status: false,
      profile: null,
    });
  EnableChangeRole = this.subjectEnableChangeRole.asObservable();
  setEnableChangeRole(status: boolean, profile: ModelAppInterfaces.Profile | null) {
    this.subjectEnableChangeRole.next({
      status,
      profile,
    });
  }

  private subjectEnableProfilEditModel =
    new BehaviorSubject<ModelHardCodedValues.EnableProfilEditModel>({ status: false, data: null });
  EnableProfilEditModel = this.subjectEnableProfilEditModel.asObservable();
  setEnableProfilEditModel(status: boolean, data: any) {
    this.subjectEnableProfilEditModel.next({ status, data });
  }

  private subjectEnableSendMessageModel =
    new BehaviorSubject<ModelHardCodedValues.EnableSendMessageModel>({
      status: false,
      data: null,
      patient: null,
    });
  EnableSendMessageModel = this.subjectEnableSendMessageModel.asObservable();
  setEnableSendMessageModel(status: boolean, data: any, patient: any) {
    this.subjectEnableSendMessageModel.next({ status, data, patient });
  }

  private subjectEnableUpdateUserAppointmentModel =
    new BehaviorSubject<ModelHardCodedValues.EnableUpdateUserAppointmentModel>({
      status: false,
      schedule: null,
      patient: null,
    });
  EnableUpdateUserAppointmentModel = this.subjectEnableUpdateUserAppointmentModel.asObservable();
  setEnableUpdateUserAppointmentModel(status: boolean, schedule: any, patient: any) {
    this.subjectEnableUpdateUserAppointmentModel.next({ status, schedule, patient });
  }
}
