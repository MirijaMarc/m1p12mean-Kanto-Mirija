import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { InterventionComponent } from './features/intervention/intervention.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CalendrierComponent } from './features/calendrier/calendrier.component';
import { DetailInterventionComponent } from './features/detail-intervention/detail-intervention.component';
import { SignupComponent } from './features/signup/signup.component';
import { ClientComponent } from './features/utilitaires/client/client.component';
import { MecanicienComponent } from './features/utilitaires/mecanicien/mecanicien.component';
import { PrestationComponent } from './features/utilitaires/prestation/prestation.component';
import { VoitureComponent } from './features/utilitaires/voiture/voiture.component';
import { UtilisateurComponent } from './features/utilitaires/utilisateur/utilisateur.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
      path: '',
      component: LayoutComponent,
      children: [
        { path: 'intervention', component: InterventionComponent },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'calendrier', component: CalendrierComponent },
        { path: 'detail-intervention/:id', component: DetailInterventionComponent },
        { path: 'client', component: ClientComponent },
        { path: 'mecanicien', component: MecanicienComponent },
        { path: 'prestation', component: PrestationComponent },
        { path: 'voiture', component: VoitureComponent },
        { path: 'utilisateur', component: UtilisateurComponent },
      ]
    }
  ];
