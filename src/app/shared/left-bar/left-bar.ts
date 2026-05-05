import { Component, signal } from '@angular/core';
import { SelectPannelHook } from '../../../hooks/select-file.hook';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EnablingModelHook } from '../../../hooks/enabling-models.hook';

@Component({
  selector: 'app-left-bar',
  imports: [CommonModule],
  templateUrl: './left-bar.html',
  styleUrl: './left-bar.css',
})
export class LeftBar {
  constructor(
    private selectPannel: SelectPannelHook,
    private router: Router,
    private enablingModelHook: EnablingModelHook,
  ) {}

  role: string = localStorage.getItem('role') ?? '';

  activeSelectedPannel = signal<string>('dashboard');
  selectSelectedPannel(pannel: string) {
    this.activeSelectedPannel.set(pannel);
    this.selectPannel.setChoosenPannel(pannel);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }

  closeLeftBar() {
    this.enablingModelHook.setLeftBarModel(false);
  }
}
