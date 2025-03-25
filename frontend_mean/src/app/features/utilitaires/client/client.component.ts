import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';
import { initFlowbite } from 'flowbite';
import Utilisateur from '../../../models/utilisateur.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UtilisateurService } from '../../../shared/services/utilisateur/utilisateur.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})

@Flowbite()
export class ClientComponent {
  form!: FormGroup
  formUpdate!: FormGroup
  formDelete!: FormGroup
  clients!: Utilisateur[]
  loadingAdd = false;
  recherche: string = '';
  page: number = 1;
  pagination: any;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private utilisateurService: UtilisateurService,
    private toastr : ToastrService
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      email: ['', Validators.required],
      roleId: 1,
      telephone: ['', Validators.required],
      motDePasse: ['', Validators.required],
      motDePasseConfirmation: ['', Validators.required]
    });
    this.formUpdate = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', Validators.required],
      roleId: 2,
      telephone: ['', Validators.required]
    });
    this.formDelete = this.fb.group({
      id: ['', Validators.required]
    });
  }

  ngOnInit(){
    initFlowbite();
    this.getClients();
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

    this.loadingAdd = true;
    this.utilisateurService.add(this.form.value).subscribe({
      next: () => {
        // this.messageService.add({severity:'success', summary:'Succès', detail:'Client ajoutée'});
        this.toastr.success('Client ajouté','Succès')
        this.loadingAdd = false;
        this.getClients();
        this.form.reset();
      },
      error: (error) => {
        // this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});
        this.toastr.error(error.error.message, "Erreur");
        this.loadingAdd = false;
      }
    });
  }

  onUpdate(): void {
    if (this.formUpdate.invalid) {
      // this.toastr.erro('Veuillez remplir tous les champs', 'Erreur')
      this.toastr.error('Veuillez remplir tous les champs', "Erreur");
      return;
    }
    const { id, nom, email, roleId, telephone} = this.formUpdate.value;
    console.log(this.formUpdate.value);

    this.utilisateurService.update({nom, email, roleId, telephone}, id).subscribe({
      next: () => {
        // this.messageService.add({severity:'success', summary:'Succès', detail:'Client modifiée'});
        this.toastr.success('Client modifié','Succès')
        this.getClients();
      },
      error: (error) => {
        // this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});
        this.toastr.error(error.error.message, "Erreur");
      }
    });
  }

  onDelete(): void {
    const id = this.formDelete.value.id;
    this.utilisateurService.delete(id).subscribe({
      next: () => {
        // this.messageService.add({severity:'success', summary:'Succès', detail:'Client supprimée'});
        this.toastr.success('Client supprimé','Succès')
        this.getClients();
      },
      error: (error) => {
        // this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});
        this.toastr.error(error.error.message, "Erreur");

      }
    });
  }

  openDeleteModal(item: any) {
    this.formDelete.patchValue({ // Met à jour les valeurs du formulaire
      id: item._id
    });
  }

  openEditModal(item: any) {
    this.formUpdate.patchValue({ // Met à jour les valeurs du formulaire
      id: item._id,
      nom: item.nom,
      email: item.email,
      telephone: item.telephone
    });
  }

  getClients(): void {
    this.utilisateurService.getClients(this.recherche, this.page).subscribe({
      next: (data :any ) => {
        this.clients = data.data;
        console.log(data.data);

        this.pagination = data.pagination;
        setTimeout(() => {
          initFlowbite();
        }, 500);
      },
      error: (error) => {
        // this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});
        this.toastr.error(error.error.message, "Erreur");

      }
    });
  }


  onSearchChange(event: any): void {
    this.recherche = event.target.value;
    this.getClients();
  }

  goToPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getClients();
    }
  }

  goToNextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page++;
      this.getClients();
    }
  }
}
