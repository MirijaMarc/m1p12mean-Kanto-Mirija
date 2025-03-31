import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ToastModule,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
    form!: FormGroup
    isLoading = false;
    constructor(
      private fb: FormBuilder,
      private messageService: MessageService,
      private authService: AuthService,
      private router: Router,
      private toastr : ToastrService
    ) {
      this.form = this.fb.group({
        email: new FormControl(''),
        motDePasse: new FormControl(''),
        motDePasseConfirmation: new FormControl(''),
        nom: new FormControl(''),
        telephone: new FormControl('')
      });
     }

    ngOnInit() {
    }

    onSubmit(): void {
      if (this.form.invalid) {
        // this.toastr.erro('Veuillez remplir tous les champs', 'Erreur')
        this.toastr.error("Veuillez remplir tous les champs", "Erreur");
        return;
      }
      if (this.form.value.motDePasse !== this.form.value.motDePasseConfirmation) {
        // this.messageService.add({severity:'error', summary:'Erreur', detail:'Les mots de passe ne correspondent pas'});
        this.toastr.error("Les mots de passe ne correspondent pas", "Erreur");
        return;
      }
      this.isLoading = true;
      this.authService.signup(this.form.value).subscribe({
        next: () => {
          this.isLoading = false;
          // this.messageService.add({severity:'success', summary:'Succès', detail:'Inscription réussie'});
          this.toastr.success("Inscription réussie", "Succès");
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          // this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});
          this.toastr.error(error.error.message, "Erreur");
        }
      });
    }
}
