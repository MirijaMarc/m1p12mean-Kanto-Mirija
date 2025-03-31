import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../environnement/api.environnement';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotificationsByUtilisateur(utilisateurId: string) {
    return this.http.get(API.NOTIFICATION.GET_BY_UTILISATEUR.replace('##', utilisateurId));
  }

  marquerLuNotification(notificationId: string) {
    return this.http.patch(API.NOTIFICATION.MARQUER_LU.replace('##', notificationId), {});
  }

  toutMarquerLuNotification(utilisateurId: string) {
    return this.http.patch(API.NOTIFICATION.TOUT_MARQUER_LU.replace('##', utilisateurId), {});
    }

}
