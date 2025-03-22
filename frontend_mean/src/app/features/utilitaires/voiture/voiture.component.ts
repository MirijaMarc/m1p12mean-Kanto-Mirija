import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';
import Voiture from '../../../models/voiture.model';
import { testVoitures } from '../../../data/data';

@Component({
  selector: 'app-voiture',
  imports: [
    CommonModule,
  ],
  templateUrl: './voiture.component.html',
  styleUrl: './voiture.component.scss'
})
@Flowbite()
export class VoitureComponent {
  voitures!: Voiture[]
  ngOnInit(){
    initFlowbite();
    this.voitures = testVoitures;
  }
}
