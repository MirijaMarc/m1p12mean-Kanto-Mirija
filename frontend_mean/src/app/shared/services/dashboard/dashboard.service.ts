import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getNbInterventionRealise(): number {
    return 12;
  }

  getChiffreAffaire(): number {
    return 1000;
  }

  getNombreClient(): number {
    return 10;
  }

  getRepartitionIntervention(): number[] {
    return [44, 55, 13, 43, 22, 23, 35, 28, 41, 22,32,56];
  }

  getRepartitionPrestation(): number[] {
    return [44, 55, 13, 43, 22, 23, 35, 28, 41, 22,32,56];
  }

  getChiffreAffaireGraph(): number[] {
    return [44, 55, 13, 43, 22, 23, 35, 28, 41, 22,32,56];
  }

  
}
