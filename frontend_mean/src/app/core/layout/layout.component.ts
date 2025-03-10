import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartLine, faCalendarCheck, faCalendarAlt, faBell, faTools, faUserCog, faUsers, faBriefcase, faCar, faChevronDown, faChevronUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  dropdownOpen = false;

  faDashboard = faChartLine;
  faRendezVous = faCalendarCheck;
  faCalendrier = faCalendarAlt;
  faNotifications = faBell;
  faTools = faTools;
  faMecaniciens = faUserCog;
  faClients = faUsers;
  faPrestations = faBriefcase;
  faVoitures = faCar;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faSignOut = faSignOutAlt;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
