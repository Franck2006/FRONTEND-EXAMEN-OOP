import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class SelectPannelHook{
    private subjectPannel = new BehaviorSubject<string>("dashboard")

    pannel = this.subjectPannel.asObservable()

    setChoosenPannel(pannel: string){
       return this.subjectPannel.next(pannel)
    }
}