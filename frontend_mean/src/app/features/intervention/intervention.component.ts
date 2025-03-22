import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importation de FormsModule
import { RouterModule } from '@angular/router';
import { Flowbite } from '../../core/decorator/flowbite.decorator';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-intervention',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './intervention.component.html',
  styleUrl: './intervention.component.scss'
})
@Flowbite()
export class InterventionComponent {
    ngOnInit(): void {
      initFlowbite()
    }

}
