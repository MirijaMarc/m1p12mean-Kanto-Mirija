import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../environnement/api.environnement';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(
    private http: HttpClient
  ) { }


  getAllClients(){
    return this.http.get(API.UTILISATEUR.CLIENT.ALL);
  }

  
  getAllMecaniciens(){
    return this.http.get(API.UTILISATEUR.MECANICIEN.ALL);
  }


  getClients(recherche: string, page : number){
    return this.http.get(API.UTILISATEUR.CLIENT.GET.replace('##', recherche).replace('###', page.toString()));
  }

  getMecaniciens(recherche: string, page : number){
    return this.http.get(API.UTILISATEUR.MECANICIEN.GET.replace('##', recherche).replace('###', page.toString()));
  }

  getUtilisateurs(recherche: string, page : number){
    return this.http.get(API.UTILISATEUR.GET.replace('##', recherche).replace('###', page.toString()))
  }

  add(data :any){
    return this.http.post(API.UTILISATEUR.NEW, data)
  }

  update(data :any, id: string){
    return this.http.put(API.UTILISATEUR.PUT.replace('##', id), data)
  }

  delete(id: string){
    return this.http.delete(API.UTILISATEUR.DELETE.replace('##', id))
  }

}
