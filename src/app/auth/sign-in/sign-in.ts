import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink,
    MatProgressSpinnerModule
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {

  signInForm: FormGroup

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  isLoading: boolean = false;
  onUserSignIn() {
    this.isLoading = true;
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value
      this.authService.sign_in({email, password}).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.showSnackMsgBar('Sign-in successful!', 'OK');
          this.router.navigate(['/welcome-landing-page']);

          const id = response.user.id;

          this.profileService.myProfile(id).subscribe({
            next: (profile_data) => {
              localStorage.setItem('role', profile_data.role);
            },
            error: (error) => {
              console.log('Error fetching profile data:', error);
            }
          });

        },
        error: (error) => {
          this.isLoading = false;
          this.showSnackMsgBar('Sign-in failed!', 'Retry');
        }
      });
    }
    else { }
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
