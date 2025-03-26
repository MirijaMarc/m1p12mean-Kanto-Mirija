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
