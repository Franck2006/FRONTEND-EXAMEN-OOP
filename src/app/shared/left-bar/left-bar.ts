import { Component } from '@angular/core';
import { SelectPannelHook } from '../../../hooks/select-file.hook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-bar',
  imports: [],
  templateUrl: './left-bar.html',
  styleUrl: './left-bar.css',
})
export class LeftBar{
  constructor(
    private selectPannel: SelectPannelHook,
    private router: Router
  ){}

  selectSelectedPannel(pannel: string){
    this.selectPannel.setChoosenPannel(pannel)
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }
}
