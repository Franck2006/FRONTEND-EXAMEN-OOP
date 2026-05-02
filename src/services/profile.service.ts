import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../app/env/enviment.env";
import type { ModelAppInterfaces } from "../models/type.model";

@Injectable({
    providedIn:"root"
})

export class ProfileService{
    constructor(
        private http: HttpClient
    ){}

    getAllProfiles(){
        return this.http.get( environment.API + "/profile/get-all-profiles" )
    }

    myProfile(id: string){
        return this.http.get<ModelAppInterfaces.Profile>( environment.API + `/profile/get-profile/${id}` )
    }

    me(id: string){
        return this.http.get<ModelAppInterfaces.Profile>( environment.API + `/get-profile/me/${id}`)
    }

    deleteProfile(id: string){
        return this.http.delete<ModelAppInterfaces.Profile>( environment.API + `/profile/delete-profile/${id}` )
    }

    updateProfile(profile_data: ModelAppInterfaces.Profile, id: string){
        return this.http.patch<ModelAppInterfaces.Profile>( environment.API + `/profile/update-profile/${id}`, profile_data )
    }
}