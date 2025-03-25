import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { provideToastr } from 'ngx-toastr';
import { Ng2CompleterModule } from 'ng2-completer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideAnimations(),  // Nécessaire pour les animations du calendrier
     importProvidersFrom(CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })),
     importProvidersFrom(NgMultiSelectDropDownModule.forRoot()),
     provideHttpClient(),
     provideAnimationsAsync(),
     providePrimeNG({
         theme: {
         }
     }),
     provideToastr(), // Toastr providers
     MessageService,
    ]
};
