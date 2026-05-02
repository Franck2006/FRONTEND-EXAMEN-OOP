import { Component } from '@angular/core';
import { MatBadgeModule} from '@angular/material/badge';
import { SelectPannelHook } from '../../../hooks/select-file.hook';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatBadgeModule
  ],

  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  constructor(
    private selectedPannel: SelectPannelHook
  ) {}

  seletectedPannel(pannel: string) {
    this.selectedPannel.setChoosenPannel(pannel);
  }
}
