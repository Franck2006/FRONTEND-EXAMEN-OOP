
export namespace ModelAppInterfaces{

    interface CreatedTime{
        createdAt?: Date
        updatedAt?: Date
    }

    export interface SignUp{
       
        email: string
        password: string
        phone: string
        name: string
        lastname: string
    }

    export interface SignIn {
        email: string
        password: string 
    }

    export interface Profile extends SignUp{
        id: string
        role: string 
    }

    export interface Patient {
        profile_id: string
    }

    export interface Doctor extends Patient{
        specialty: string;
        licenceNumber: number
    }

    export interface Schedule {
        available_date: string
        start_time: string
        end_time: string
        appointment_id: string
        doctor_id: string
    }

    export interface Appointement{
        patient_id: string
        doctor_id: string
        schedule_id: string
    }

    export interface Message extends CreatedTime{
        message: string
        doctor_id: string
        patient_id: string
    }

    export  interface AiPrompt extends CreatedTime{
        ai_prompt: string
    }
}