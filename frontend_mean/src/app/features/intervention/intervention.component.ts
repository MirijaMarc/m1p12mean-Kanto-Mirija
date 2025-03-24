import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importation de FormsModule
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


@Component({
  selector: 'app-intervention',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgMultiSelectDropDownModule
  ],
  templateUrl: './intervention.component.html',
  styleUrl: './intervention.component.scss'
})
@Flowbite()
export class InterventionComponent {
    interventions!: Intervention[]
    mecanciens : Utilisateur[] = [];
    clients : Utilisateur[] = [];
    selectedMecanicien :any = [];
    dropdownMecaniciensSettings : IDropdownSettings = {};
    prestations : Prestation[] = [];
    voitures : Voiture[] = [];
    selectedPrestation :any = [];
    dropdownPrestationsSettings : IDropdownSettings = {};



    constructor(
      private prestationService: PrestationService,
      private utilisateurService : UtilisateurService,
      private voitureService : VoitureService,
      private messageService : MessageService
    ){

    }


    ngOnInit(): void {
      initFlowbite();
      this.getMecaniciens();
      this.getClients();
      this.getPrestations();
      this.getVoitures();

      this.dropdownMecaniciensSettings = {
        singleSelection: false,
        idField: '_id',
        textField: 'nom',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
      };

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
    onItemSelect(item: any) {
      console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    
    }
    onItemSelectPrestation(item: any) {
      console.log(item);
    }
    onSelectAllPrestation(items: any) {
      console.log(items);
    
    }
    
    

    getMecaniciens(){
      this.utilisateurService.getAllMecaniciens().subscribe({
        next : (data :any) =>{
          console.log(data);
          this.mecanciens= data.data
          
        },
        error : (err : any) =>{
          console.error(err);
          this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue'});
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
          this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue'});
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
          this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue'});
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
          this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue'});
        }
      })

    }
    



}
