import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {

  signUpForm: FormGroup

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['']
    })
  }

  onUsesrSignUp() {
    if (this.signUpForm.valid) {
      const { email, password, phone } = this.signUpForm.value
      this.authService.sign_up(email, password, phone).subscribe({
        next: (response: any) => {
          console.log('Sign-up successful:', response);
        },
        error: (error) => {
          console.error('Sign-in failed:', error);
        }
      });
    }
    else { }
  }

}
