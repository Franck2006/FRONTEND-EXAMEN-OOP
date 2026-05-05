export namespace ModelAppInterfaces {
  interface ID {
    id?: string;
  }
  interface CreatedTime {
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface SignUp {
    email: string;
    password: string;
    phone: string;
    name: string;
    lastname: string;
  }

  export interface SignIn {
    email: string;
    password: string;
  }

  export interface Profile extends SignUp {
    id: string;
    role: string;
    doctor: Doctor | null;
    patient: Patient | null;
  }

  export interface Patient extends ID, CreatedTime {
    profile_id: string;
    profile?: Profile;
  }

  export interface Doctor extends Patient {
    specialty?: string;
    licenceNumber?: number;
    description?: string;
    profile?: Profile;
  }

  export interface Schedule extends ID {
    available_date: string | undefined;
    start_time: string | undefined;
    end_time: string | undefined;
    doctor_id?: string | undefined;
    message?: Message | null;
  }

  export interface Appointement extends ID {
    patient_id: string;
    doctor_id: string;
    schedule_id: string;
    patient?: Patient;
    doctor?: Doctor;
    schedule?: Schedule;
  }

  export interface Message extends CreatedTime, ID {
    message: string;
    doctor_id?: string;
    patient_id?: string;
    patient?: Patient;
  }

  export interface AiPrompt extends CreatedTime {
    ai_prompt: string;
  }
}

export namespace ModelHardCodedValues {
  interface DataModel {
    status: boolean;
  }
  export interface EnablingChangeUserRole extends DataModel {
    profile: ModelAppInterfaces.Profile | null;
  }

  export interface EnableProfilEditModel extends DataModel {
    data: any;
  }

  export interface EnableSendMessageModel extends DataModel {
    data: ModelAppInterfaces.Message | null;
    patient: ModelAppInterfaces.Patient | null;
  }

  export interface EnableUpdateUserAppointmentModel extends DataModel {
    schedule: ModelAppInterfaces.Schedule | null;
    patient: ModelAppInterfaces.Patient | null;
  }

  export interface DoctorDetailsModel extends DataModel {
    doctor: ModelAppInterfaces.Profile | null;
  }
}
