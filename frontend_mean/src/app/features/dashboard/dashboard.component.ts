import { Component, ViewChild } from '@angular/core';
import { Flowbite } from '../../core/decorator/flowbite.decorator';
import { initFlowbite } from 'flowbite';
import { ChartComponent } from "ng-apexcharts";
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ApexXAxis, NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../shared/services/dashboard/dashboard.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';

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
  yaxis?: ApexYAxis;
  dataLabels?: ApexDataLabels;
  labels?: string[];
  tooltip?: ApexTooltip;
  fill?: ApexFill
  legend?: ApexLegend
  colors?: string[];
}





@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule, CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
@Flowbite()
export class DashboardComponent {
  @ViewChild("chart") chart!: ChartComponent;
  annee: string = new Date().getFullYear().toString();
  InterventionbBarChartOptions!: ChartOptions;
  CAChartOptions!: ChartOptions;
  pieChartOptions!: ChartOptions;

  dashboardCardData :DashboardCardData = {
    nbInterventionRealise: 0,
    chiffreAffaire: 0,
    nombreClient: 0
  }
  dashboardGraphData! :DashboardGraphData
  annees: string[] = [];

  constructor(
    private dashboardService: DashboardService,
    private messageService : MessageService,
    private toastr : ToastrService
  ) {

  }

  ngOnInit(): void {

    initFlowbite ()
    const start = 2000;
    const end = parseInt(new Date().getFullYear().toString());
    this.annees = Array.from({ length: end - start + 1 }, (_, i) => (end - i).toString());

    this.getData();


  }


  getData(){
    this.dashboardService.getNbInterventionRealise(this.annee).subscribe({
      next: (data: any) => {
        console.log("Nombre d'interventions réalisées :", data);
        this.dashboardCardData!.nbInterventionRealise = data.data.nbTotalPrestations.length > 0 ? data.data.nbTotalPrestations[0].totalInterventions : 0;
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("Une erreur est survenue", "Erreur");
      }
    });
    this.dashboardService.getChiffreAffaire(this.annee).subscribe({
      next: (data: any) => {
        // console.log("Chiffre d'affaires :", data);
        this.dashboardCardData!.chiffreAffaire = data.data.nbTotalPrestations.length > 0 ? data.data.nbTotalPrestations[0].totalMontant : 0;
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("Une erreur est survenue", "Erreur");
      }
    });
    this.dashboardService.getNombreClient(this.annee).subscribe({
      next: (data: any) => {
        // console.log("Nombre de clients :", data);
        this.dashboardCardData!.nombreClient = data.data.nbClients;
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("Une erreur est survenue", "Erreur");
      }
    });
    this.dashboardService.getRepartitionIntervention(this.annee).subscribe({
      next: (data: any) => {
        // console.log("Répartition des interventions :", data);
        const dataArray = data.data.map((item: any) => item.totalInterventions);
        this.InterventionbBarChartOptions = {
          series: [{ name: 'Interventions', data: dataArray }],
          chart: {
            type: 'bar',
            height: 350,
          },
          title: {
            text: 'Répartition des interventions'
          },
          colors: ['#22C55E'],
          tooltip: {
            enabled: true,
            y: {
              formatter: val => `${val} interventions`
            }
          },
          legend: {
            show: true,
            position: 'bottom'
          },
          xaxis: {
            categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc']
          }
        };
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("Une erreur est survenue", "Erreur");
      }
    });
    this.dashboardService.getRepartitionPrestation(this.annee).subscribe({
      next: (data: any) => {
        // console.log("Répartition des prestations :", data);
        const dataArray = data.data.nbTotalPrestationsParType.map((item: any) => item.totalPrestations);
        const labels = data.data.nbTotalPrestationsParType.map((item: any) => item.label);
        this.pieChartOptions = {
          series: dataArray,
          chart: { type: 'pie', height: 350 },
          title: { text: 'Répartition des préstations' },
          labels: labels,
          tooltip: {
            enabled: true,
            y: {
              formatter: val => `${val} prestations`
            }
          }
        };
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("Une erreur est survenue", "Erreur");
      }
    });
    this.dashboardService.getChiffreAffaireGraph(this.annee).subscribe({
      next: (data: any) => {
        // console.log("Chiffre d'affaires mois :", data);
        const dataArray = data.data.map((item: any) => item.totalMontant);
        this.CAChartOptions = {
          series: [{ name: 'Ventes', data: dataArray }],
          chart: { type: 'line', height: 350 },
          title: { text: 'Chiffre d\'affaires' },
          xaxis: { categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juillet', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'] },
          dataLabels: { enabled: true }
        };

      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error("Une erreur est survenue", "Erreur");
      }
    });

  }

  onAnneeChange(event: any) {
    console.log('Année sélectionnée :', event.target.value);
    this.annee = event.target.value;
    this.getData();
  }
}
