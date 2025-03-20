import Utilisateur from "./utilisateur.model"

export default interface Notification {
    id: string
    message: string
    utilisateur : Utilisateur
    utilisateurId: string
    seen : boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}