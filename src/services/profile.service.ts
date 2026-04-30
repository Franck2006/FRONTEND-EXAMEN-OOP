import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../app/env/enviment.env";
import type { ModelAppInterfaces } from "../models/type.model";
import { tap } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class ProfileService{
    constructor(
        private http: HttpClient
    ){}

    getAllProfiles(){
        return this.http.get<ModelAppInterfaces.Profile>( environment.API + "/profile/get-all-profiles" )
    }

    myProfile(id: string){
        return this.http.get<ModelAppInterfaces.Profile>( environment.API + `/profile/get-profile/${id}` )
            .pipe(
                tap(profile_data_reponse =>{
                    localStorage.setItem("role", profile_data_reponse.role)
                })
            )
    }

    deleteProfile(id: string){
        return this.http.delete<ModelAppInterfaces.Profile>( environment.API + `/profile/delete-profile/${id}` )
    }

    updateProfile(profile_data: ModelAppInterfaces.Profile, id: string){
        return this.http.patch<ModelAppInterfaces.Profile>( environment.API + `/profile/update-profile/${id}`, profile_data )
    }
}