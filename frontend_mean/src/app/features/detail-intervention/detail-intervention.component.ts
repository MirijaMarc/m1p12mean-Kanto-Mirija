import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterventionService } from '../../shared/services/intervention/intervention.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { environnement } from '../../environnement/environnement';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-detail-intervention',
  imports: [
    CommonModule,
  ],
  templateUrl: './detail-intervention.component.html',
  styleUrl: './detail-intervention.component.scss'
})
export class DetailInterventionComponent {
  id!: string; // Variable pour stocker le paramètre
  intervention : any
  env = environnement
  role!: string

  constructor(
    private route: ActivatedRoute,
    private interventionService : InterventionService,
    private toastr : ToastrService,
    private authService : AuthService
  ) {
    this.role = this.authService.getRole()!;
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    // Récupération du paramètre ID depuis l'URL
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log("ID reçu :", this.id);
    this.getInterventionById()
  }


  getInterventionById(){
    this.interventionService.getInterventionById(this.id).subscribe({
      next : (res : any) => {
        this.intervention = res.data
        console.log(this.intervention)
      },
      error : (err : any) => {
        console.log(err)
        this.toastr.error(err.message, 'Erreur')
      }
    })
  }


  commencerIntervention(){
    this.interventionService.commencerIntervention(this.id).subscribe({
      next : (res : any) => {
        this.getInterventionById()
        this.toastr.success(res.message, 'Succès')
      },
      error : (err : any) => {
        this.toastr.error(err.message, 'Erreur')
      }
    })
    }

  terminerIntervention(){
    this.interventionService.terminerIntervention(this.id).subscribe({
      next : (res : any) => {
        this.getInterventionById()
        this.toastr.success(res.message, 'Succès')
      },
      error : (err : any) => {
        this.toastr.error(err.message, 'Erreur')
      }
    })
  }

  annulerIntervention(){
    this.interventionService.annulerIntervention(this.id).subscribe({
      next : (res : any) => {
        this.getInterventionById()
        this.toastr.success(res.message, 'Succès')
      },
      error : (err : any) => {
        this.toastr.error(err.message, 'Erreur')
      }
    })
  }


}
