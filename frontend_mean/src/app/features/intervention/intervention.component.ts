import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';  // Importation de FormsModule
import { RouterModule } from '@angular/router';
import { Flowbite } from '../../core/decorator/flowbite.decorator';
import { initFlowbite } from 'flowbite';
import Intervention from '../../models/intervention.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import Utilisateur from '../../models/utilisateur.model';
import Prestation from '../../models/prestation.model';
import { PrestationService } from '../../shared/services/prestation/prestation.service';
import { UtilisateurService } from '../../shared/services/utilisateur/utilisateur.service';
import { MessageService } from 'primeng/api';
import { VoitureService } from '../../shared/services/voiture/voiture.service';
import Voiture from '../../models/voiture.model';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ToastrService } from 'ngx-toastr';
import { InterventionService } from '../../shared/services/intervention/intervention.service';


@Component({
  selector: 'app-intervention',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
  templateUrl: './intervention.component.html',
  styleUrl: './intervention.component.scss'
})
@Flowbite()
export class InterventionComponent {
    form!: FormGroup
    interventions!: Intervention[]
    mecanciens : Utilisateur[] = [];
    clients : Utilisateur[] = [];
    prestations : Prestation[] = [];
    voitures : Voiture[] = [];
    dropdownPrestationsSettings : IDropdownSettings = {};
    formUpdate!: FormGroup
    formDelete!: FormGroup
    loadingAdd = false;
    recherche: string = '';
    page: number = 1;
    pagination: any;
    



    constructor(
      private prestationService: PrestationService,
      private utilisateurService : UtilisateurService,
      private voitureService : VoitureService,
      private messageService : MessageService,
      private fb: FormBuilder,
      private toastr: ToastrService,
      private interventionService : InterventionService
    ){
      this.form = this.fb.group({
        prestationsId : ['', Validators.required],
        marque : ['', Validators.required],
        dateIntervention : ['', Validators.required],
        description : ['', Validators.required],
        clientId : ['', Validators.required]
      })

    }


    ngOnInit(): void {
      initFlowbite();
      this.getMecaniciens();
      this.getClients();
      this.getPrestations();
      this.getVoitures();
      this.getInterventions();
      this.dropdownPrestationsSettings = {
        singleSelection: false,
        idField: '_id',
        textField: 'label',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
      };
    }

    
    

    getMecaniciens(){
      this.utilisateurService.getAllMecaniciens().subscribe({
        next : (data :any) =>{
          console.log(data);
          this.mecanciens= data.data
          
        },
        error : (err : any) =>{
          console.error(err);
          // this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue'});
          this.toastr.error("Une erreur est survenue", "Erreur");

        }
      })

    }

    getClients(){
      this.utilisateurService.getAllClients().subscribe({
        next : (data :any) =>{
          console.log(data);
          this.clients= data.data
          
        },
        error : (err : any) =>{
          console.error(err);
          // this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue'});
          this.toastr.error("Une erreur est survenue", "Erreur");

        }
      })

    }


    getPrestations(){
      this.prestationService.getAllPrestations().subscribe({
        next : (data :any) =>{
          console.log(data);
          this.prestations= data.data
        },
        error : (err : any) =>{
          console.error(err);
          // this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue'});
          this.toastr.error("Une erreur est survenue", "Erreur");

        }
      })

    }

    getVoitures(){
      this.voitureService.getAllVoitures().subscribe({
        next : (data :any) =>{
          console.log(data);
          this.voitures= data.data
        },
        error : (err : any) =>{
          console.error(err);
          // this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue'});
          this.toastr.error("Une erreur est survenue", "Erreur");
        }
      })

    }

    onSubmit(){
      if (this.form.invalid){
        this.toastr.error("Veuillez remplir tous les champs", "Erreur");
        return;
      }

      if (this.form.value.marque instanceof Object){
        this.form.value.marque= this.form.value.marque.marque
      }
      let realPrestationsId : any = []
      this.form.value.prestationsId.forEach((element : any) => {
        realPrestationsId.push(element._id)
      });
      this.form.value.prestationsId = realPrestationsId;
      console.log(this.form.value);
      this.interventionService.add(this.form.value).subscribe({
        next : (data : any) =>{
          console.log(data);
          this.toastr.success("Intervention ajoutée avec succès", "Succès");
          this.form.reset();
          this.getInterventions();
        },
        error : (err : any) =>{
          console.error(err);
          this.toastr.error("Une erreur est survenue", "Erreur");
        }
      }) 
    
      
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
  
    getInterventions(): void {
      this.interventionService.getInterventions(this.recherche, this.page).subscribe({
        next: (data :any ) => {
          this.interventions = data.data;
          console.log('interventions ==>',data.data);
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
      this.getInterventions();
    }
  
    goToPreviousPage() {
      if (this.page > 1) {
        this.page--;
        this.getInterventions();
      }
    }
  
    goToNextPage() {
      if (this.page < this.pagination.totalPages) {
        this.page++;
        this.getInterventions();
      }
    }

    





}
