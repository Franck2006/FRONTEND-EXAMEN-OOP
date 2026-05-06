import { Component, OnInit, signal } from '@angular/core';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';
import { ModelAppInterfaces } from '../../../models/type.model';

@Component({
  selector: 'app-read-message',
  imports: [],
  templateUrl: './read-message.html',
  styleUrl: './read-message.css',
})
export class ReadMessage implements OnInit {
  constructor(private enablingModel: EnablingModelHook) {}

  ngOnInit(): void {
    this.getReadMessageData();
  }

  dismissMessageModel(status: boolean) {
    this.enablingModel.setReadMessagesModel(status, null);
  }

  patientMessage = signal<ModelAppInterfaces.Patient | null>(null);
  getReadMessageData() {
    this.enablingModel.ReadMessagesModel.subscribe({
      next: ({ message }) => {
        console.log('=== message ====');
        console.log(message);
        console.log('=== message ====');
        this.patientMessage.set(message);
      },
      error(err) {
        console.log(' something went wrong@!!!!');
      },
    });
  }
}
