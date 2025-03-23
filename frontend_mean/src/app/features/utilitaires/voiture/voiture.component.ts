import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';
import Voiture from '../../../models/voiture.model';
import { testVoitures } from '../../../data/data';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VoitureService } from '../../../shared/services/voiture/voiture.service';

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
  voitures!: Voiture[]
  loadingAdd = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private voitureService: VoitureService
  ) {
    this.form = this.fb.group({
      marque: ''
    });
  }

  ngOnInit(){
    initFlowbite();
    this.voitures = testVoitures;
  }


  onSubmit(): void {
    if (this.form.invalid) {
      this.messageService.add({severity:'error', summary:'Erreur', detail:'Veuillez remplir tous les champs'});
      return;
    }

    this.loadingAdd = true;
    this.voitureService.add(this.form.value).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Succès', detail:'Voiture ajoutée'});
        this.loadingAdd = false;
        this.form.reset();
      },
      error: (error) => {
        this.messageService.add({severity:'error', summary:'Erreur', detail:error.error.message});
        this.loadingAdd = false;
      }
    });
  }
}
