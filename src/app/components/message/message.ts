import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModelAppInterfaces, ModelHardCodedValues } from '../../../models/type.model';
import { MessageService } from '../../../services/message.service';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';

@Component({
  selector: 'app-message',
  imports: [ReactiveFormsModule],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message implements OnInit {
  message: FormGroup;
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private enablingModel: EnablingModelHook,
  ) {
    this.message = this.formBuilder.group({
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getMessageModelStatus();
  }

  isLoadingMessage = signal<boolean>(false);
  sendMessageDoctor(doctor_id: string) {
    this.isLoadingMessage.set(true);
    const { message }: ModelAppInterfaces.Message = this.message.value;
    const patient_id = this.modelStatusDataStorePatient().id;

    this.messageService.createMessage({ message, doctor_id, patient_id }).subscribe({
      next: (message) => {
        console.log('message sent');
        console.log(message);
        this.isLoadingMessage.set(true);
        this.dismissMessageModel(false);
      },
      error: (err) => {
        console.log(err);
        this.isLoadingMessage.set(true);
      },
    });
  }

  modelStatusDataStoreDoctor = signal<ModelAppInterfaces.Doctor | any>({});
  modelStatusDataStorePatient = signal<ModelAppInterfaces.Patient | any>({});

  getMessageModelStatus() {
    this.enablingModel.EnableSendMessageModel.subscribe({
      next: ({ data, patient }) => {
        this.modelStatusDataStoreDoctor.set(data);
        this.modelStatusDataStorePatient.set(patient);

        // console.log(data);
        // console.log(patient?.id);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  dismissMessageModel(status: boolean) {
    this.enablingModel.setEnableSendMessageModel(status, null, null);
  }
}
