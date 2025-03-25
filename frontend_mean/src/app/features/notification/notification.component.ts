import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

interface Notification {
  id: number;
  message: string;
  date: string;
  read: boolean;
}

@Component({
  selector: 'app-notification',
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit{
  faBell = faBell;
  notifications: Notification[] = [
    { id: 1, message: 'Nouvelle réunion prévue demain.', date: '2025-03-17 14:30', read: false },
    { id: 2, message: 'Votre demande a été approuvée.', date: '2025-03-16 09:15', read: true },
    { id: 3, message: 'Mise à jour du projet en attente de validation.', date: '2025-03-15 18:45', read: false },
    { id: 5, message: 'Nouvelle réunion prévue demain.', date: '2025-03-17 14:30', read: false },
    { id: 6, message: 'Votre demande a été approuvée.', date: '2025-03-16 09:15', read: false },
    { id: 7, message: 'Mise à jour du projet en attente de validation.', date: '2025-03-15 18:45', read: true },
    { id: 8, message: 'Nouvelle réunion prévue demain.', date: '2025-03-17 14:30', read: false },
    { id: 9, message: 'Votre demande a été approuvée.', date: '2025-03-16 09:15', read: true },
    { id: 10, message: 'Mise à jour du projet en attente de validation.', date: '2025-03-15 18:45', read: false },
  ];

  constructor(
    private toastr: ToastrService
  ){}


  ngOnInit(): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }


  

  markAsRead(notification: Notification) {
    notification.read = true;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
  }
}
