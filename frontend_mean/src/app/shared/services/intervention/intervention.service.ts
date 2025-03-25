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

  add(data : any){
    return this.http.post(API.INTERVENTION.POST, data)
  }



  detele(id : any){

  }

}
