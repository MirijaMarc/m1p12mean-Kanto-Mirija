import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';

@Component({
  selector: 'app-prestation',
  imports: [
    CommonModule,
  ],
  templateUrl: './prestation.component.html',
  styleUrl: './prestation.component.scss'
})
@Flowbite()
export class PrestationComponent {
  ngOnInit(){
    initFlowbite();
  }
}
