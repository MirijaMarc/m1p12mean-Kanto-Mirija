import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnChanges } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartLine,faWrench,faHandshake,faTasks , faCalendarCheck, faCalendarAlt, faBell, faTools, faUserCog, faUsers, faBriefcase, faCar, faChevronDown, faChevronUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../decorator/flowbite.decorator';
import { AuthService } from '../../shared/services/auth/auth.service';
import Utilisateur from '../../models/utilisateur.model';
import { environnement } from '../../environnement/environnement';
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

@Flowbite()
export class LayoutComponent {
  faChartLine = faChartLine;
  faBell = faBell;
  fatools = faTools;
  faUserCog = faUserCog;
  faUsers = faUsers;
  faBriefcase = faBriefcase;
  faCar = faCar;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faSignOutAlt = faSignOutAlt;
  faCalendarCheck = faCalendarCheck;
  faWrench = faWrench;
  faHandshake = faHandshake;
  faTasks = faTasks;

  env = environnement;
  user!: Utilisateur
  role: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.role = this.authService.getRole()!;
    this.user = this.authService.getUser()!;

  }

  ngOnInit() {
    initFlowbite()
  }

  logout() {
    console.log("miditra");

    this.authService.logout();
    this.router.navigate(['login']);
  }




}
