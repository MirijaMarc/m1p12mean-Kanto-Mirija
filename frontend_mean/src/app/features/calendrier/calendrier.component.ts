import { Component,ViewChild } from '@angular/core';
import { CalendarModule } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';

@Component({
  selector: 'app-calendrier',
  imports: [
    CommonModule,
    CalendarModule
  ],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.scss'
})
export class CalendrierComponent {
  @ViewChild('calendar') calendar: any;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Événement 1',
    },
    {
      start: new Date(),
      title: 'Événement 2',
    },
  ];

  setView(view: CalendarView) {
    this.view = view;
  }
}
