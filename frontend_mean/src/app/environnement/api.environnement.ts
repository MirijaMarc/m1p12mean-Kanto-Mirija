import { environnement } from "./environnement"

const env = environnement;

export const API = {
  AUTH: {
    LOGIN:`${env.apiUrl}/utilisateurs/connexion`,
    LOGOUT:""
  },
  UTILISATEUR: {
    MECANICIEN:{

    },
    GET: env.apiUrl + '/utilisateurs',
    POST: env.apiUrl + '/utilisateurs',
    PUT: env.apiUrl + '/utilisateurs/##',
    DELETE: env.apiUrl + '/utilisateurs/##',
  },
  VOITURE:{
    GET: env.apiUrl + '/voitures',
    POST: env.apiUrl + '/voitures',
    PUT: env.apiUrl + '/voitures/##',
    DELETE: env.apiUrl + '/voitures/##',
  },
  INTERVENTION:{

  },
  PRESTATION:{
    GET: env.apiUrl + '/prestations',
    POST: env.apiUrl + '/prestations',
    PUT: env.apiUrl + '/prestations/##',
    DELETE: env.apiUrl + '/prestations/##',
  }
}