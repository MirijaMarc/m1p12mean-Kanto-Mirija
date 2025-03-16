import { Component } from '@angular/core';
import { Flowbite } from '../../core/decorator/flowbite.decorator';
import { initFlowbite } from 'flowbite';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ApexXAxis, NgApexchartsModule } from 'ng-apexcharts';

interface ChartOptions {
  series: ApexAxisChartSeries | number[];
  chart: ApexChart;
  title?: ApexTitleSubtitle;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  labels?: string[];
}


@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
@Flowbite()
export class DashboardComponent {
  InterventionbBarChartOptions!: ChartOptions;
  CAChartOptions!: ChartOptions;
  pieChartOptions!: ChartOptions;

  constructor() {
    // 📌 Définition des options des graphiques avec l'interface ChartOptions
    this.InterventionbBarChartOptions = {
      series: [{ name: 'Ventes', data: [10, 20, 30, 40, 50] }],
      chart: { type: 'bar', height: 350 },
      title: { text: 'Répartition des interventions réalisés' },
      xaxis: { categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'] },
      dataLabels: { enabled: false }
    };

    this.pieChartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: { type: 'pie', height: 350 },
      title: { text: 'Répartition des préstations' },
      labels: ['Produit A', 'Produit B', 'Produit C', 'Produit D', 'Produit E']
    };

    this.CAChartOptions = {
      series: [{ name: 'Ventes', data: [10, 20, 30, 40, 50] }],
      chart: { type: 'line', height: 350 },
      title: { text: 'Chiffre d\'affaires' },
      xaxis: { categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'] },
      dataLabels: { enabled: false }
    };
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    initFlowbite ()
  }
}
