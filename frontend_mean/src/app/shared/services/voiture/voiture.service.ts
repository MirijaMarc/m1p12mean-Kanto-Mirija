import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../environnement/api.environnement';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(
    private http: HttpClient
  ) { }


  getVoitures(recherche: string, page : number){
    return this.http.get(API.VOITURE.GET.replace('##', recherche).replace('###', page.toString()))
  }

  add(data :any){
    return this.http.post(API.VOITURE.POST, data)
  }

  update(data :any, id: string){
    return this.http.put(API.VOITURE.PUT.replace('##', id), data)
  }

  delete(id: string){
    return this.http.delete(API.VOITURE.DELETE.replace('##', id))
  }
}
