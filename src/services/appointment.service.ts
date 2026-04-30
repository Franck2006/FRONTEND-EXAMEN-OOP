import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../app/env/enviment.env";
import type { ModelAppInterfaces } from "../models/type.model";

@Injectable({
    providedIn: 'root'
})

export class AppointementService{
    constructor(private http: HttpClient){}

    getAllAppointements(){
        return this.http.get( environment.API + "/appointement/get-all-appointements")
    }

    getOneAppointement(id: string){
       return this.http.get( environment.API + `/appointement/get-appointement/${id}` )
    }

    createAppointement(appointement_data: ModelAppInterfaces.Appointement ){
        return this.http.post( environment.API + "/appointement/create-appointement", appointement_data)
    }

    updateAppointement(appointement_data: ModelAppInterfaces.Appointement, id: string){
        return this.http.patch( environment.API + `/appointement/update-appointement/${id}`, appointement_data)
    }

    deleteAppointement(id: string){
        return this.http.delete( environment.API + `/appointement/delete-delete-appointement/${id}`)
    }
}