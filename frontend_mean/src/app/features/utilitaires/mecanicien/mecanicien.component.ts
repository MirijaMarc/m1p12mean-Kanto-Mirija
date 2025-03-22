import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';
import Utilisateur from '../../../models/utilisateur.model';
import { testUtilisateur } from '../../../data/data';

@Component({
  selector: 'app-mecanicien',
  imports: [
    CommonModule,
  ],
  templateUrl: './mecanicien.component.html',
  styleUrl: './mecanicien.component.scss'
})
@Flowbite()
export class MecanicienComponent {
  mecaniciens!: Utilisateur[]
  ngOnInit(){
    initFlowbite();
    this.mecaniciens = testUtilisateur
  }
}
