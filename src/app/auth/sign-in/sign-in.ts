import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {

  signInForm: FormGroup

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onUsesrSignIn() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value
      this.authService.sign_in(email, password).subscribe({
        next: (response: any) => {
          console.log('Sign-in successful:', response);
          this.authService.save_token(response.token);
        },
        error: (error) => {
          console.error('Sign-in failed:', error);
        }
      });
    }
    else { }
  }


}
