import Intervention from '../models/intervention.model'
import Utilisateur from '../models/utilisateur.model';
import Voiture from '../models/voiture.model';
const testUtilisateur: Utilisateur[] = [
    {
        nom: "Jean Dupont",
        email: "jean.dupont@example.com",
        motDePasse: "password123",
        telephone: "0123456789",
        role: {
            id: 1,  // Rôle "client"
            label: "client"
        },
        createdAt: new Date('2022-01-15T08:00:00Z'),
        updatedAt: new Date('2023-06-25T12:00:00Z'),
        deletedAt: null
    },
    {
        nom: "Pierre Martin",
        email: "pierre.martin@example.com",
        motDePasse: "securePassword!2023",
        telephone: "0987654321",
        role: {
            id: 2,  // Rôle "mecanicien"
            label: "mecanicien"
        },
        createdAt: new Date('2021-07-01T09:00:00Z'),
        updatedAt: new Date('2023-04-05T10:00:00Z'),
        deletedAt: null
    },
    {
        nom: "Lucie Lefevre",
        email: "lucie.lefevre@example.com",
        motDePasse: "luciePass#2023",
        telephone: "0698765432",
        role: {
            id: 3,  // Rôle "manager"
            label: "manager"
        },
        createdAt: new Date('2020-10-15T11:30:00Z'),
        updatedAt: new Date('2023-03-12T14:00:00Z'),
        deletedAt: null
    },
    {
        nom: "Alice Boucher",
        email: "alice.boucher@example.com",
        motDePasse: "alicePwd1234",
        telephone: "0654321987",
        role: {
            id: 1,  // Rôle "client"
            label: "client"
        },
        createdAt: new Date('2023-02-20T08:45:00Z'),
        updatedAt: new Date('2023-06-10T09:30:00Z'),
        deletedAt: null
    },
    {
        nom: "David Leroy",
        email: "david.leroy@example.com",
        motDePasse: "davLeroy2023",
        telephone: "0712345678",
        role: {
            id: 2,  // Rôle "mecanicien"
            label: "mecanicien"
        },
        createdAt: new Date('2022-05-05T10:30:00Z'),
        updatedAt: new Date('2023-04-01T11:45:00Z'),
        deletedAt: null
    }
];


const testVoitures: Voiture[] = [
    {
        id: "64d5f3a8f8f8a3c2325d1234",
        marque: "Peugeot",
        createdAt: new Date('2022-01-15T08:00:00Z'),
        updatedAt: new Date('2023-06-25T12:00:00Z'),
        deletedAt: null
    },
    {
        id: "64d5f3a8f8f8a3c2325d1235",
        marque: "Renault",
        createdAt: new Date('2021-05-10T10:15:00Z'),
        updatedAt: new Date('2023-04-05T11:00:00Z'),
        deletedAt: null
    },
    {
        id: "64d5f3a8f8f8a3c2325d1236",
        marque: "Ford",
        createdAt: new Date('2020-07-01T09:00:00Z'),
        updatedAt: new Date('2023-02-15T13:30:00Z'),
        deletedAt: null
    },
    {
        id: "64d5f3a8f8f8a3c2325d1237",
        marque: "Toyota",
        createdAt: new Date('2023-03-20T11:00:00Z'),
        updatedAt: new Date('2023-03-22T15:45:00Z'),
        deletedAt: null
    },
    {
        id: "64d5f3a8f8f8a3c2325d1238",
        marque: "BMW",
        createdAt: new Date('2021-09-12T16:00:00Z'),
        updatedAt: new Date('2023-01-05T10:30:00Z'),
        deletedAt: null
    }
];


