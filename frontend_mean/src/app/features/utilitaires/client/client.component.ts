import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';
import { initFlowbite } from 'flowbite';
import Utilisateur from '../../../models/utilisateur.model';
import { testUtilisateur } from '../../../data/data';
@Component({
  selector: 'app-client',
  imports: [
    CommonModule,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})

@Flowbite()
export class ClientComponent {
  clients!: Utilisateur[]
  ngOnInit(){
    initFlowbite();
    this.clients = testUtilisateur;
  }
}
