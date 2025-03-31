import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';


  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messageService : MessageService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('admin@gmail.com'),
      motDePasse: new FormControl('root')
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const { email, motDePasse } = this.loginForm.value;
    console.log(email, motDePasse);


    this.authService.login(email, motDePasse).subscribe({
      next: () => {
        this.isLoading = false;
        const role = this.authService.getRole();
        if (role == "manager"){
          this.router.navigate(['dashboard']);
        }else{
          this.router.navigate(['intervention']);
        }
      },
      error: (err : any) => {
        console.log(err);
        this.isLoading = false;
        this.errorMessage = 'Email ou Mot de passe Invalide'; // Affiche un message d'erreur en cas d'échec
        // this.messageService.add({ severity: 'error', summary: 'Erreur d\' authentification', detail: this.errorMessage });
        this.toastr.error(this.errorMessage, 'Erreur');
      }
    });

  }

}
