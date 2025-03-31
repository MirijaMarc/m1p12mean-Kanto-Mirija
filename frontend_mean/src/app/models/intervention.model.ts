import Prestation from "./prestation.model"
import Utilisateur from "./utilisateur.model"
import Voiture from "./voiture.model"

export default interface Intervention {
    _id: string
    clientId: Utilisateur
    mecaniciensId: Utilisateur[]
    prestationsId: Prestation[]
    description: string
    voiture: Voiture
    dateIntervention: Date
    statut: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    prestations: Prestation[]
    labelStatut: string

}

