import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';
import Utilisateur from '../../../models/utilisateur.model';
import { testUtilisateur } from '../../../data/data';


@Component({
  selector: 'app-utilisateur',
  imports: [
    CommonModule,
  ],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.scss'
})
@Flowbite()
export class UtilisateurComponent {

  utilisateurs!: Utilisateur[]

  ngOnInit(){
    initFlowbite();
    this.utilisateurs = testUtilisateur;
  }
}
