export default interface Utilisateur{
    nom: string
    email: string
    motDePasse: string
    telephone: string
    role: Role[]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    interventionEnCours: number
}

interface Role{
    id: number
    label: string
}