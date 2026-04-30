import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../app/env/enviment.env";
import type { ModelAppInterfaces } from "../models/type.model";

@Injectable({
    providedIn:"root"
})

export class DoctorService{
    constructor(
        private http: HttpClient
    ){}

    getAllDoctors(){
        return this.http.get<ModelAppInterfaces.Doctor>( environment.API + "/doctor/get-all-doctors" )
    }

    myDoctorProfile(id: string){
        return this.http.get<ModelAppInterfaces.Doctor>( environment.API + `/doctor/get-doctor/${id}` )
    }

    deleteDoctor(id: string){
        return this.http.delete<ModelAppInterfaces.Doctor>( environment.API + `/doctor/delete-doctor/${id}` )
    }

    updateDoctor(doctor_data: ModelAppInterfaces.Doctor, id: string){
        return this.http.patch<ModelAppInterfaces.Doctor>( environment.API + `/doctor/update-doctor/${id}`, doctor_data )
    }
}