import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';

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
  ngOnInit(){
    initFlowbite();
  }
}
