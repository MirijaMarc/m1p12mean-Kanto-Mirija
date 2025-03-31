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

  getNbInterventionRealise(annee: string){
    return this.http.get(API.DASHBOARD.NB_INTERVENTION_REALISE.replace('##', annee));
  }

  getChiffreAffaire(annee: string) {
    return this.http.get(API.DASHBOARD.CHIFFRE_AFFAIRE.replace('##', annee));
  }

  getNombreClient(annee: string) {
    return this.http.get(API.DASHBOARD.NB_CLIENTS.replace('##', annee));
  }

  getRepartitionIntervention(annee: string){
    return this.http.get(API.DASHBOARD.REPARTITION_INTERVENTION.replace('##', annee));
  }

  getRepartitionPrestation(annee: string){
    return this.http.get(API.DASHBOARD.REPARTITION_PRESTATION.replace('##', annee));
  }

  getChiffreAffaireGraph(annee: string){
    return this.http.get(API.DASHBOARD.CHIFFRE_AFFAIRE_GRAPH.replace('##', annee));
  }


}
