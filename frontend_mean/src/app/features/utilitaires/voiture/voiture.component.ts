import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';
import Voiture from '../../../models/voiture.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VoitureService } from '../../../shared/services/voiture/voiture.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-voiture',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './voiture.component.html',
  styleUrl: './voiture.component.scss'
})
@Flowbite()
export class VoitureComponent {
  form!: FormGroup
  formUpdate!: FormGroup
  formDelete!: FormGroup
  voitures!: Voiture[]
  loadingAdd = false;
  recherche: string = '';
  page: number = 1;
  pagination: any;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private voitureService: VoitureService,
    private toastr : ToastrService
  ) {
    this.form = this.fb.group({
      marque: ['', Validators.required]
    });
    this.formUpdate = this.fb.group({
      id: ['', Validators.required],
      marque: ['', Validators.required]
    });
    this.formDelete = this.fb.group({
      id: ['', Validators.required]
    });
  }

  ngOnInit(){
    initFlowbite();
    this.getVoitures();
  }


  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.error('Veuillez remplir tous les champs', 'Erreur')
      return;
    }

    this.loadingAdd = true;
    this.voitureService.add(this.form.value).subscribe({
      next: () => {
        // this.messageService.add({severity:'success', summary:'Succès', detail:'Voiture ajoutée'});
        this.toastr.success('Voiture ajouté', 'Succès')
        this.loadingAdd = false;
        this.getVoitures();
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
    const {id, marque} = this.formUpdate.value;
    console.log(this.formUpdate.value);

    this.voitureService.update({marque}, id).subscribe({
      next: () => {
        // this.messageService.add({severity:'success', summary:'Succès', detail:'Voiture modifiée'});
        this.toastr.success('Voiture modifié', 'Succès')
        this.getVoitures();
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Erreur')
      }
    });
  }

  onDelete(): void {
    const id = this.formDelete.value.id;
    this.voitureService.delete(id).subscribe({
      next: () => {
        // this.messageService.add({severity:'success', summary:'Succès', detail:'Voiture supprimée'});
        this.toastr.success('Voiture supprimé', 'Succès')
        this.getVoitures();
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
      marque: item.marque
    });
  }

  getVoitures(): void {
    this.voitureService.getVoitures(this.recherche, this.page).subscribe({
      next: (data :any ) => {
        this.voitures = data.data;
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
    this.getVoitures();
  }

  goToPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getVoitures();
    }
  }

  goToNextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page++;
      this.getVoitures();
    }
  }
}
