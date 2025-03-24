import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../environnement/api.environnement';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http : HttpClient
  ) { }

  getNbInterventionRealise(){
    return this.http.get(API.DASHBOARD.NB_INTERVENTION_REALISE);
  }

  getChiffreAffaire() {
    return this.http.get(API.DASHBOARD.CHIFFRE_AFFAIRE);
  }

  getNombreClient() {
    return 10;
  }

  getRepartitionIntervention(){
    return [44, 55, 13, 43, 22, 23, 35, 28, 41, 22,32,56];
  }

  getRepartitionPrestation(){
    return [44, 55, 13, 43, 22, 23, 35, 28, 41, 22,32,56];
  }

  getChiffreAffaireGraph(){
    return [44, 55, 13, 43, 22, 23, 35, 28, 41, 22,32,56];
  }

  
}
