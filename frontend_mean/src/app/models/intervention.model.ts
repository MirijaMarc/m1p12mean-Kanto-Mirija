import Prestation from "./prestation.model"
import Utilisateur from "./utilisateur.model"
import Voiture from "./voiture.model"

export default interface Intervention {
    id: string
    client: Utilisateur
    mecaniciens: Utilisateur[]
    prestations: Prestation[]
    voiture: Voiture
    dateIntervention: Date
    statut: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null

}