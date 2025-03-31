import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../environnement/api.environnement';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  constructor(
    private http : HttpClient
  ) { }



  getAllInterventions(){
    return this.http.get(API.CALENDRIER.ALL_INTERVENTIONS)
  }

  getAllInterventionsByClient(){
    return this.http.get(API.CALENDRIER.ALL_INTERVENTIONS_BY_CLIENT)
  }

  getAllInterventionsByMecanicien(){
    return this.http.get(API.CALENDRIER.ALL_INTERVENTIONS_BY_MECANICIEN)
  }

  assignerMecaniciensIntervention(id : string, data : any){
    return this.http.patch(API.INTERVENTION.ASSIGN_MECANICIEN.replace('##', id), data)
  }

  commencerIntervention(id : string){
    return this.http.patch(API.INTERVENTION.COMMENCER.replace('##', id), {})
  }

  terminerIntervention(id : string){
    return this.http.patch(API.INTERVENTION.TERMINER.replace('##', id), {})
  }

  annulerIntervention(id : string){
    return this.http.patch(API.INTERVENTION.ANNULER.replace('##', id), {})
  }


  getInterventionById(id : string){
    return this.http.get(API.INTERVENTION.BY_ID.replace('##', id))
  }

  getInterventionsByMecanicien(recherche : string, page : number){
    return this.http.get(API.INTERVENTION.BY_MECANICIEN.replace('##', recherche).replace('###', page.toString()))
  }

  getInterventionsByClient(recherche : string, page : number){
    return this.http.get(API.INTERVENTION.BY_CLIENT.replace('##', recherche).replace('###', page.toString()))
  }

  getInterventions(recherche : string, page : number){
    return this.http.get(API.INTERVENTION.GET.replace('##', recherche).replace('###', page.toString()))
  }

  add(data : any){
    return this.http.post(API.INTERVENTION.POST, data)
  }

  update(data : any, id : any){
    return this.http.put(API.INTERVENTION.PUT.replace('##', id), data)
  }

  delete(id : string){
    return this.http.delete(API.INTERVENTION.DELETE.replace('##', id))
  }


}
