import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../environnement/api.environnement';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  constructor(
    private http: HttpClient
  ) { }


  getAllPrestations(){
    return this.http.get(API.PRESTATION.ALL)
  }

  getPrestations(recherche: string, page : number){
    return this.http.get(API.PRESTATION.GET.replace('##', recherche).replace('###', page.toString()))
  }

  add(data :any){
    return this.http.post(API.PRESTATION.POST, data)
  }

  update(data :any, id: string){
    return this.http.put(API.PRESTATION.PUT.replace('##', id), data)
  }

  delete(id: string){
    return this.http.delete(API.PRESTATION.DELETE.replace('##', id))
  }
  
}
