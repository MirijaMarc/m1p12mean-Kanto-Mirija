import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-intervention',
  imports: [],
  templateUrl: './detail-intervention.component.html',
  styleUrl: './detail-intervention.component.scss'
})
export class DetailInterventionComponent {
  id!: string; // Variable pour stocker le paramètre

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Récupération du paramètre ID depuis l'URL
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log("ID reçu :", this.id);
  }
}
