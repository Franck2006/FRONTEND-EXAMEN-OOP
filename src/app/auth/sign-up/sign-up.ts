import { Component, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { ModelAppInterfaces } from '../../../models/type.model';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';
import { SetPageByRoleHook } from '../../../hooks/set-page-by-role.hook';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private setPageByRoleHook: SetPageByRoleHook,
  ) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
    });
  }

  isLoading = signal<boolean>(false);
  onUsesrSignUp() {
    if (!this.signUpForm.valid) return;

    Promise.resolve().then(() => {
      this.isLoading.set(true);
    });

    if (this.signUpForm.valid) {
      const { name, lastname, email, password, phone }: ModelAppInterfaces.SignUp =
        this.signUpForm.value;
      this.authService.sign_up({ name, lastname, email, password, phone }).subscribe({
        next: (response: any) => {
          this.showSnackMsgBar('Sign-up successful!', 'OK');
          this.isLoading.set(false);
          this.clearForm();

          const id = response.user.id;

          this.profileService.myProfile(id).subscribe({
            next: (profile_data) => {
              localStorage.setItem('role', profile_data.role);
              localStorage.setItem('id', profile_data.id);
              this.setPageByRoleHook.getPageByRole();
            },
            error: (error) => {
              console.log('Error fetching profile data:', error);
            },
          });
        },
        error: (error) => {
          this.showSnackMsgBar('Sign-up failed!', 'Retry');
          this.isLoading.set(false);
          console.log('Sign-up error:', error.message);
        },
      });
    } else {
    }
  }

  clearForm() {
    this.signUpForm.reset();
  }

  showSnackMsgBar(msg: string, action: string) {
    const snackBarRef = this.snackBar.open(msg, action, { duration: 3000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log(' this is the atttt');
    });
    snackBarRef.onAction().subscribe(() => {
      console.log(' this is the action');
    });
  }
}
