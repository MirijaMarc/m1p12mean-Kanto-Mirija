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
    TEMRINER: env.apiUrl + '/interventions/##/terminer',

  },
  PRESTATION:{
    GET: env.apiUrl + '/prestations?recherche=##&page=###',
    ALL: env.apiUrl + '/prestations/all',
    POST: env.apiUrl + '/prestations',
    PUT: env.apiUrl + '/prestations/##',
    DELETE: env.apiUrl + '/prestations/##',
  },
  DASHBOARD: {
    NB_INTERVENTION_REALISE: env.apiUrl + '/interventions/total',
    CHIFFRE_AFFAIRE: env.apiUrl + '/interventions/montant-total',
    REPARTITION_INTERVENTION: env.apiUrl + '/dashboard/repartitionIntervention',
    REPARTITION_PRESTATION: env.apiUrl + '/interventions/nb-prestations-type',
    CHIFFRE_AFFAIRE_GRAPH: env.apiUrl + '/dashboard/chiffreAffaireGraph',
  }
}