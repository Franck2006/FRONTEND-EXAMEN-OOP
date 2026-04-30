import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../app/env/enviment.env";
import { ModelAppInterfaces } from "../models/type.model";
import { headers } from "../hooks/headers.hook";


@Injectable({
    providedIn:"root"
})

export class AI_PromptService{
    constructor(private http: HttpClient){}

    submitPrompt(prompt: ModelAppInterfaces.AiPrompt){
        return this.http.post( environment.API + `/ai-agent/submit-prompt`, prompt, { headers })
    }
}