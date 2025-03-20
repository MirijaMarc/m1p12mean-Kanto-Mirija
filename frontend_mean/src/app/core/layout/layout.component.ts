import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnChanges } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartLine,faWrench,faHandshake,faTasks , faCalendarCheck, faCalendarAlt, faBell, faTools, faUserCog, faUsers, faBriefcase, faCar, faChevronDown, faChevronUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../decorator/flowbite.decorator';
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

  ngOnInit() {
    console.log("Miditra");

    initFlowbite()
  }




}
