import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';
import Prestation from '../../../models/prestation.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrestationService } from '../../../shared/services/prestation/prestation.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prestation',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './prestation.component.html',
  styleUrl: './prestation.component.scss'
})
@Flowbite()
export class PrestationComponent {
  form!: FormGroup
  formUpdate!: FormGroup
  formDelete!: FormGroup
  prestations!: Prestation[]
  loadingAdd = false;
  recherche: string = '';
  page: number = 1;
  pagination: any;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private prestationService: PrestationService,
    private toastr : ToastrService
  ) {
    this.form = this.fb.group({
      label: ['', Validators.required],
      description: ['', Validators.required],
      tarif: ['', Validators.required],
      duree: ['', Validators.required]
    });
    this.formUpdate = this.fb.group({
      id: ['', Validators.required],
      label: ['', Validators.required],
      description: ['', Validators.required],
      tarif: ['', Validators.required],
      duree: ['', Validators.required]
    });
    this.formDelete = this.fb.group({
      id: ['', Validators.required]
    });
  }

  ngOnInit(){
    initFlowbite();
    this.getPrestations();
  }


  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.error('Veuillez remplir tous les champs', 'Erreur')
      return;
    }

    this.loadingAdd = true;
    this.prestationService.add(this.form.value).subscribe({
      next: () => {
        // this.messageService.add({severity:'success', summary:'Succès', detail:'Préstation ajoutée'});
        this.toastr.success('Préstation ajoutéee', 'Succès')
        this.loadingAdd = false;
        this.getPrestations();
        this.form.reset();
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Erreur')
        this.loadingAdd = false;
      }
    });
  }

  onUpdate(): void {
    if (this.formUpdate.invalid) {
      this.toastr.error('Veuillez remplir tous les champs', 'Erreur')
      return;
    }
    const {id, label, description, tarif, duree} = this.formUpdate.value;
    console.log(this.formUpdate.value);

    this.prestationService.update({label, description, tarif, duree}, id).subscribe({
      next: () => {
        // this.messageService.add({severity:'success', summary:'Succès', detail:'Préstation modifiée'});
        this.toastr.success('Préstation modifié', 'Succès')
        this.getPrestations();
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Erreur')
      }
    });
  }

  onDelete(): void {
    const id = this.formDelete.value.id;
    this.prestationService.delete(id).subscribe({
      next: () => {
        // this.messageService.add({severity:'success', summary:'Succès', detail:'Préstation supprimée'});
        this.toastr.success('Préstation supprimé', 'Succès')
        this.getPrestations();
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
      label: item.label,
      description: item.description,
      tarif: item.tarifRecent,
      duree: item.duree
    });
  }

  getPrestations(): void {
    this.prestationService.getPrestations(this.recherche, this.page).subscribe({
      next: (data :any ) => {
        this.prestations = data.data;
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
    this.getPrestations();
  }

  goToPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getPrestations();
    }
  }

  goToNextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page++;
      this.getPrestations();
    }
  }
}
