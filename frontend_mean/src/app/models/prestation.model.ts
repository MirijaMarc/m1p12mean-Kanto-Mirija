export default interface Prestation {
    id: string
    label: string
    description: string
    duree: Date
    tarfis: Tarif []
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}

interface Tarif {
    montant: number
    createdAt: Date
}