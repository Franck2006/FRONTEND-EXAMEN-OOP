import { Component, OnInit, signal } from '@angular/core';
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
export class LeftBar implements OnInit {
  constructor(
    private selectPannel: SelectPannelHook,
    private router: Router,
    private enablingModelHook: EnablingModelHook,
  ) {}

  ngOnInit(): void {
    this.setDefaultPannelBaseOnRoles();
  }

  role = signal<string>(localStorage.getItem('role') ?? '');

  activeSelectedPannel = signal<string>('dashboard');
  selectSelectedPannel(pannel: string) {
    this.activeSelectedPannel.set(pannel);
    this.selectPannel.setChoosenPannel(pannel);
  }

  setDefaultPannelBaseOnRoles() {
    if (this.role() === 'SUPER_ADMIN') {
      this.activeSelectedPannel.set('dashboard');
      this.selectPannel.setChoosenPannel('dashboard');
    } else if (this.role() === 'PATIENT') {
      this.activeSelectedPannel.set('appointements');
      this.selectPannel.setChoosenPannel('appointements');
    } else if (this.role() === 'DOCTOR') {
      this.activeSelectedPannel.set('set-appointement');
      this.selectPannel.setChoosenPannel('set-appointement');
    } else if (this.role() === '') {
    }
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }

  closeLeftBar() {
    this.enablingModelHook.setLeftBarModel(false);
  }
}
