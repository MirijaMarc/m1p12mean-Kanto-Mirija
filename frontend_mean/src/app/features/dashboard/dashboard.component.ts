import { Component } from '@angular/core';
import { Flowbite } from '../../core/decorator/flowbite.decorator';
import { initFlowbite } from 'flowbite';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ApexXAxis, NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../shared/services/dashboard/dashboard.service';
import { MessageService } from 'primeng/api';

interface DashboardCardData{
  nbInterventionRealise: number;
  chiffreAffaire: number;
  nombreClient: number;
}


interface DashboardGraphData{
  repartitionIntervention: number[];
  repartitionPrestation: number[];
  chiffreAffaire: number[];
}



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
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
@Flowbite()
export class DashboardComponent {
  InterventionbBarChartOptions!: ChartOptions;
  CAChartOptions!: ChartOptions;
  pieChartOptions!: ChartOptions;

  dashboardCardData! :DashboardCardData
  dashboardGraphData! :DashboardGraphData

  constructor(
    private dashboardService: DashboardService,
    private messageService : MessageService
  ) {

  }

  ngOnInit(): void {

    initFlowbite ()
    this.InterventionbBarChartOptions = {
      series: [{ name: 'Ventes', data: [44, 55, 13, 43, 22, 23, 35, 28, 41, 22,32,56] }],
      chart: { type: 'bar', height: 350 },
      title: { text: 'Répartition des interventions réalisés' },
      xaxis: { categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juillet', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'] },
      dataLabels: { enabled: false }
    };

    this.pieChartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: { type: 'pie', height: 350 },
      title: { text: 'Répartition des préstations' },
      labels: ['Produit A', 'Produit B', 'Produit C', 'Produit D', 'Produit E']
    };

    this.CAChartOptions = {
      series: [{ name: 'Ventes', data: [10, 20, 40, 35, 30,15, 20, 18, 29, 23, 10, 20] }],
      chart: { type: 'line', height: 350 },
      title: { text: 'Chiffre d\'affaires' },
      xaxis: { categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juillet', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'] },
      dataLabels: { enabled: false }
    };

    this.getDashboardCardData();
  }


  getDashboardCardData(){
    this.dashboardService.getNbInterventionRealise().subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue'});
      }
    })
  }
}
