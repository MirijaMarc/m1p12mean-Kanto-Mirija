import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importation de FormsModule
import { RouterModule } from '@angular/router';

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
export class InterventionComponent {

}
