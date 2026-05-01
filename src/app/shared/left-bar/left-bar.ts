import { Component } from '@angular/core';
import { SelectPannelHook } from '../../../hooks/select-file.hook';

@Component({
  selector: 'app-left-bar',
  imports: [],
  templateUrl: './left-bar.html',
  styleUrl: './left-bar.css',
})
export class LeftBar{
  constructor(
    private selectPannel: SelectPannelHook
  ){}

  selectSelectedPannel(pannel: string){
    this.selectPannel.setChoosenPannel(pannel)
  }
}
