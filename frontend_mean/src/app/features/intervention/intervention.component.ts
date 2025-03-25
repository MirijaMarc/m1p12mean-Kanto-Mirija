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



    constructor(
      private prestationService: PrestationService,
      private utilisateurService : UtilisateurService,
      private voitureService : VoitureService,
      private messageService : MessageService,
      private fb: FormBuilder,
      private toastr: ToastrService 
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
      

      
    }

    





}
