import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';

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
  ngOnInit(){
    initFlowbite();
  }
}
