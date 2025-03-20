import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Flowbite } from '../../../core/decorator/flowbite.decorator';
import { initFlowbite } from 'flowbite';

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

  ngOnInit(){
    initFlowbite();
  }
}
