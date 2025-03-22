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
import { NotificationComponent } from './features/notification/notification.component';
import { authGuard } from './core/guards/auth.guard';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { roleGuard } from './core/guards/role/role.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forbidden', component: ForbiddenComponent },
    {
      path: '',
      component: LayoutComponent,
      canActivate: [authGuard],
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'intervention', component: InterventionComponent },
        { path: 'dashboard', component: DashboardComponent, data: { expectedRole: ['manager'] }, canActivate: [roleGuard] },
        { path: 'calendrier', component: CalendrierComponent },
        { path: 'detail-intervention/:id', component: DetailInterventionComponent },
        { path: 'client', component: ClientComponent,  data: { expectedRole: ['manager'] }, canActivate: [roleGuard] },
        { path: 'mecanicien', component: MecanicienComponent,  data: { expectedRole: ['manager'] }, canActivate: [roleGuard] },
        { path: 'prestation', component: PrestationComponent,  data: { expectedRole: ['manager'] }, canActivate: [roleGuard] },
        { path: 'voiture', component: VoitureComponent,  data: { expectedRole: ['manager'] }, canActivate: [roleGuard] },
        { path: 'utilisateur', component: UtilisateurComponent,  data: { expectedRole: ['manager'] }, canActivate: [roleGuard]},
        { path: 'notification', component: NotificationComponent},
      ]
    }
  ];
