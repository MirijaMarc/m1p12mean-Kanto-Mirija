import { Component,ViewChild } from '@angular/core';
import { CalendarModule, CalendarMonthViewDay } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { BrowserModule } from '@angular/platform-browser';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-calendrier',
  imports: [
    CommonModule,
    CalendarModule,
    FontAwesomeModule
  ],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.scss'
})
export class CalendrierComponent {
  viewDate: Date = new Date();
  isMonthView: boolean = true;
  isDayView: boolean = false;
  isWeekView: boolean = false;
  events: CalendarEvent[] = [];
  selectedDate!: Date;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  changeView(view: string): void {
    switch (view) {
      case 'month':
        this.isMonthView = true;
        this.isDayView = false;
        this.isWeekView = false;
        break;
      case 'day':
        this.isMonthView = false;
        this.isDayView = true;
        this.isWeekView = false;
        break;
      case 'week':
        this.isMonthView = false;
        this.isDayView = false;
        this.isWeekView = true;
        break;
    }
  }

    // Méthodes pour changer la date
    previous(): void {
      if (this.isDayView) {
        this.viewDate = new Date(this.viewDate.setDate(this.viewDate.getDate() - 1));
      } else if (this.isWeekView) {
        this.viewDate = new Date(this.viewDate.setDate(this.viewDate.getDate() - 7));
      } else if (this.isMonthView) {
        this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
      }
    }

    next(): void {
      if (this.isDayView) {
        this.viewDate = new Date(this.viewDate.setDate(this.viewDate.getDate() + 1));
      } else if (this.isWeekView) {
        this.viewDate = new Date(this.viewDate.setDate(this.viewDate.getDate() + 7));
      } else if (this.isMonthView) {
        this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
      }
    }

    goToToday(): void {
      this.viewDate = new Date();
    }

      // Affiche la date au format 'Jour Mois Année' pour la vue Jour
  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Affiche la semaine en montrant le premier et le dernier jour de la semaine
  formatWeek(date: Date): string {
    const startOfWeek = new Date(date);
    const endOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const options : any = { month: 'short', day: 'numeric' };
    const start = startOfWeek.toLocaleDateString('fr-FR', options);
    const end = endOfWeek.toLocaleDateString('fr-FR', options);
    return `${start} - ${end}`;
  }

  // Affiche le mois au format 'Mois Année'
  formatMonth(date: Date): string {
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  }


  handleHourSegmentClick(event: { date: Date }): void {
    console.log('Hour segment clicked:', event.date);
    // Ouvrir un modal ou effectuer une action lorsque l'utilisateur clique sur un créneau horaire
    this.selectedDate = event.date;
  }

  handleDayClick(day: CalendarMonthViewDay): void {
    this.selectedDate = day.date;
  }

}
