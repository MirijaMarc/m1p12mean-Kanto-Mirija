import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';
import Mécanicien from '../../../models/utilisateur.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UtilisateurService } from '../../../shared/services/utilisateur/utilisateur.service';
import Utilisateur from '../../../models/utilisateur.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-mecanicien',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './mecanicien.component.html',
  styleUrl: './mecanicien.component.scss'
})
@Flowbite()
export class MecanicienComponent {

  form!: FormGroup
  formUpdate!: FormGroup
  formDelete!: FormGroup
  mecaniciens!: Utilisateur[]
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
      roleId: 2,
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
    this.getMecaniciens();
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
        // this.messageService.add({severity:'success', summary:'Succès', detail:'Mécanicien ajouté'});
        this.toastr.success("Mécanicien ajouté", "Succès");
        this.loadingAdd = false;
        this.getMecaniciens();
        this.form.reset();
      },
      error: (error) => {
        // this.toastr.error(error.error.message, 'Erreur')
        this.toastr.success(error.error.message, "Erreur");
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
        // this.messageService.add({severity:'success', summary:'Succès', detail:'Mécanicien modifiée'});
        this.toastr.success('Mécanicien modifié', 'Succès')
        this.getMecaniciens();
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Erreur')
      }
    });
  }

  onDelete(): void {
    const id = this.formDelete.value.id;
    this.utilisateurService.delete(id).subscribe({
      next: () => {
        // this.messageService.add({severity:'success', summary:'Succès', detail:'Mécanicien supprimé'});
        this.toastr.success('Mécanicien supprimé', 'Succès')
        this.getMecaniciens();
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Erreur')
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

  getMecaniciens(): void {
    this.utilisateurService.getMecaniciens(this.recherche, this.page).subscribe({
      next: (data :any ) => {
        this.mecaniciens = data.data;
        console.log(data.data);

        this.pagination = data.pagination;
        setTimeout(() => {
          initFlowbite();
        }, 500);
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Erreur')
      }
    });
  }


  onSearchChange(event: any): void {
    this.recherche = event.target.value;
    this.getMecaniciens();
  }

  goToPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getMecaniciens();
    }
  }

  goToNextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page++;
      this.getMecaniciens();
    }
  }
}
