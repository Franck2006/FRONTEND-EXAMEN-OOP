import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { ModelAppInterfaces } from '../../../models/type.model'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink,
    MatProgressSpinnerModule,
    CommonModule
],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {

  signUpForm: FormGroup

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]]
    })
  }

  isLoading: boolean = false;
  onUsesrSignUp() {
    this.isLoading = true;
    if (this.signUpForm.valid) {
      const { name, lastname, email, password, phone } : ModelAppInterfaces.SignUp = this.signUpForm.value
      this.authService.sign_up({name, lastname, email, password, phone }).subscribe({
        next: (response: any) => {
          this.showSnackMsgBar('Sign-up successful!', 'OK');
          this.isLoading = false;
          this.clearForm();
        },
        error: (error) => {
          this.showSnackMsgBar('Sign-up failed!', 'Retry');
          this.isLoading = false;
          console.log('Sign-up error:', error.message);
        }
      });
    }
    else { }
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
