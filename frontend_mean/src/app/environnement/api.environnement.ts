import { environnement } from "./environnement"

const env = environnement;

export const API = {
  AUTH: {
    LOGIN:`${env.apiUrl}/utilisateurs/connexion`,
    SIGNUP: `${env.apiUrl}/utilisateurs`,
  },
  UTILISATEUR: {
    MECANICIEN:{
      GET: env.apiUrl + '/utilisateurs/mecaniciens?recherche=##&page=###',
      ALL: env.apiUrl + '/utilisateurs/all-mecaniciens',
    },
    CLIENT:{
      GET: env.apiUrl + '/utilisateurs/clients?recherche=##&page=###',
      ALL: env.apiUrl + '/utilisateurs/all-clients',
    },
    GET: env.apiUrl + '/utilisateurs?recherche=##&page=###',
    NEW: env.apiUrl + '/utilisateurs/new',
    POST: env.apiUrl + '/utilisateurs',
    PUT: env.apiUrl + '/utilisateurs/##',
    DELETE: env.apiUrl + '/utilisateurs/##',
  },
  VOITURE:{
    GET: env.apiUrl + '/voitures?recherche=##&page=###',
    POST: env.apiUrl + '/voitures',
    PUT: env.apiUrl + '/voitures/##',
    DELETE: env.apiUrl + '/voitures/##',
    ALL: env.apiUrl + '/voitures/all',

  },
  INTERVENTION:{
    POST : env.apiUrl + '/interventions',
    GET : env.apiUrl + '/interventions?recherche=##&page=###',
    PUT: env.apiUrl + '/interventions/##',
    DELETE: env.apiUrl + '/interventions/##',
    ASSIGN_MECANICIEN: env.apiUrl + '/interventions/##/mecaniciens',
    ANNULER: env.apiUrl + '/interventions/##/annuler',
    COMMENCER: env.apiUrl + '/interventions/##/commencer',
    TERMINER: env.apiUrl + '/interventions/##/terminer',
    BY_MECANICIEN: env.apiUrl + '/interventions/mecanicien?recherche=##&page=###',
    BY_CLIENT: env.apiUrl + '/interventions/client?recherche=##&page=###',
    BY_ID: env.apiUrl + '/interventions/##',

  },
  PRESTATION:{
    GET: env.apiUrl + '/prestations?recherche=##&page=###',
    ALL: env.apiUrl + '/prestations/all',
    POST: env.apiUrl + '/prestations',
    PUT: env.apiUrl + '/prestations/##',
    DELETE: env.apiUrl + '/prestations/##',
  },
  DASHBOARD: {
    NB_INTERVENTION_REALISE: env.apiUrl + '/interventions/total?annee=##',
    CHIFFRE_AFFAIRE: env.apiUrl + '/interventions/montant-total?annee=##',
    NB_CLIENTS: env.apiUrl + '/utilisateurs/clients/total?annee=##',
    REPARTITION_INTERVENTION: env.apiUrl + '/interventions/total-mois?annee=##',
    REPARTITION_PRESTATION: env.apiUrl + '/interventions/nb-prestations-type?annee=##',
    CHIFFRE_AFFAIRE_GRAPH: env.apiUrl + '/interventions/montant-total-mois?annee=##',
  },
  CALENDRIER: {
    ALL_INTERVENTIONS: env.apiUrl + '/interventions/all',
    ALL_INTERVENTIONS_BY_CLIENT: env.apiUrl + '/interventions/all/client',
    ALL_INTERVENTIONS_BY_MECANICIEN: env.apiUrl + '/interventions/all/mecanicien',
  },
  NOTIFICATION: {
    GET: env.apiUrl + '/notifications',
    GET_BY_UTILISATEUR: env.apiUrl + '/notifications/utilisateurs/##',
    MARQUER_LU: env.apiUrl + '/notifications/##/lue',
    TOUT_MARQUER_LU: env.apiUrl + '/notifications/utilisateurs/##/lues',
  }
}