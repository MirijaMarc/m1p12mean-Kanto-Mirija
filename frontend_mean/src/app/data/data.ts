// import Intervention from '../models/intervention.model'
// import Notification from '../models/notification.model';
// import Prestation from '../models/prestation.model';
// import Utilisateur from '../models/utilisateur.model';
// import Voiture from '../models/voiture.model';
// export  const testUtilisateur: Utilisateur[] = [
//     {
//         nom: "Jean Dupont",
//         email: "jean.dupont@example.com",
//         motDePasse: "password123",
//         telephone: "0123456789",
//         role: {
//             id: 1,  // Rôle "client"
//             label: "client"
//         },
//         createdAt: new Date('2022-01-15T08:00:00Z'),
//         updatedAt: new Date('2023-06-25T12:00:00Z'),
//         deletedAt: null
//     },
//     {
//         nom: "Pierre Martin",
//         email: "pierre.martin@example.com",
//         motDePasse: "securePassword!2023",
//         telephone: "0987654321",
//         role: {
//             id: 2,  // Rôle "mecanicien"
//             label: "mecanicien"
//         },
//         createdAt: new Date('2021-07-01T09:00:00Z'),
//         updatedAt: new Date('2023-04-05T10:00:00Z'),
//         deletedAt: null
//     },
//     {
//         nom: "Lucie Lefevre",
//         email: "lucie.lefevre@example.com",
//         motDePasse: "luciePass#2023",
//         telephone: "0698765432",
//         role: {
//             id: 3,  // Rôle "manager"
//             label: "manager"
//         },
//         createdAt: new Date('2020-10-15T11:30:00Z'),
//         updatedAt: new Date('2023-03-12T14:00:00Z'),
//         deletedAt: null
//     },
//     {
//         nom: "Alice Boucher",
//         email: "alice.boucher@example.com",
//         motDePasse: "alicePwd1234",
//         telephone: "0654321987",
//         role: {
//             id: 1,  // Rôle "client"
//             label: "client"
//         },
//         createdAt: new Date('2023-02-20T08:45:00Z'),
//         updatedAt: new Date('2023-06-10T09:30:00Z'),
//         deletedAt: null
//     },
//     {
//         nom: "David Leroy",
//         email: "david.leroy@example.com",
//         motDePasse: "davLeroy2023",
//         telephone: "0712345678",
//         role: {
//             id: 2,  // Rôle "mecanicien"
//             label: "mecanicien"
//         },
//         createdAt: new Date('2022-05-05T10:30:00Z'),
//         updatedAt: new Date('2023-04-01T11:45:00Z'),
//         deletedAt: null
//     }
// ];


// export const testVoitures: Voiture[] = [
//     {
//         id: "64d5f3a8f8f8a3c2325d1234",
//         marque: "Peugeot",
//         createdAt: new Date('2022-01-15T08:00:00Z'),
//         updatedAt: new Date('2023-06-25T12:00:00Z'),
//         deletedAt: null
//     },
//     {
//         id: "64d5f3a8f8f8a3c2325d1235",
//         marque: "Renault",
//         createdAt: new Date('2021-05-10T10:15:00Z'),
//         updatedAt: new Date('2023-04-05T11:00:00Z'),
//         deletedAt: null
//     },
//     {
//         id: "64d5f3a8f8f8a3c2325d1236",
//         marque: "Ford",
//         createdAt: new Date('2020-07-01T09:00:00Z'),
//         updatedAt: new Date('2023-02-15T13:30:00Z'),
//         deletedAt: null
//     },
//     {
//         id: "64d5f3a8f8f8a3c2325d1237",
//         marque: "Toyota",
//         createdAt: new Date('2023-03-20T11:00:00Z'),
//         updatedAt: new Date('2023-03-22T15:45:00Z'),
//         deletedAt: null
//     },
//     {
//         id: "64d5f3a8f8f8a3c2325d1238",
//         marque: "BMW",
//         createdAt: new Date('2021-09-12T16:00:00Z'),
//         updatedAt: new Date('2023-01-05T10:30:00Z'),
//         deletedAt: null
//     }
// ];




// export const testPrestations: Prestation[] = [
//     {
//         id: "64d5f3a8f8f8a3c2325d1234",
//         label: "Révision générale",
//         description: "Révision complète du véhicule, vérification de tous les éléments essentiels.",
//         duree: new Date('2023-05-10T08:00:00Z'),
//         tarfis: [
//             {
//                 montant: 150,
//                 createdAt: new Date('2023-01-10T09:00:00Z')
//             },
//             {
//                 montant: 200,
//                 createdAt: new Date('2023-01-10T09:15:00Z')
//             }
//         ],
//         createdAt: new Date('2023-05-01T08:00:00Z'),
//         updatedAt: new Date('2023-06-15T12:00:00Z'),
//         deletedAt: null
//     },
//     {
//         id: "64d5f3a8f8f8a3c2325d1235",
//         label: "Changement de pneus",
//         description: "Changement des pneus usés et remplacement par des neufs.",
//         duree: new Date('2023-04-15T10:30:00Z'),
//         tarfis: [
//             {
//                 montant: 80,
//                 createdAt: new Date('2023-02-01T08:00:00Z')
//             }
//         ],
//         createdAt: new Date('2023-04-01T10:00:00Z'),
//         updatedAt: new Date('2023-06-20T14:00:00Z'),
//         deletedAt: null
//     },
//     {
//         id: "64d5f3a8f8f8a3c2325d1236",
//         label: "Remplacement d'embrayage",
//         description: "Remplacement de l'embrayage pour améliorer la conduite du véhicule.",
//         duree: new Date('2023-06-01T09:00:00Z'),
//         tarfis: [
//             {
//                 montant: 500,
//                 createdAt: new Date('2023-03-15T10:00:00Z')
//             }
//         ],
//         createdAt: new Date('2023-05-15T08:00:00Z'),
//         updatedAt: new Date('2023-06-01T11:00:00Z'),
//         deletedAt: null
//     },
//     {
//         id: "64d5f3a8f8f8a3c2325d1237",
//         label: "Diagnostic moteur",
//         description: "Diagnostic complet du moteur pour identifier les pannes éventuelles.",
//         duree: new Date('2023-07-01T11:00:00Z'),
//         tarfis: [
//             {
//                 montant: 120,
//                 createdAt: new Date('2023-03-25T09:30:00Z')
//             }
//         ],
//         createdAt: new Date('2023-06-25T08:00:00Z'),
//         updatedAt: new Date('2023-07-01T12:00:00Z'),
//         deletedAt: null
//     },
//     {
//         id: "64d5f3a8f8f8a3c2325d1238",
//         label: "Contrôle technique",
//         description: "Contrôle technique annuel obligatoire pour les véhicules de plus de 4 ans.",
//         duree: new Date('2023-08-01T14:00:00Z'),
//         tarfis: [
//             {
//                 montant: 90,
//                 createdAt: new Date('2023-05-01T12:00:00Z')
//             }
//         ],
//         createdAt: new Date('2023-07-10T08:00:00Z'),
//         updatedAt: new Date('2023-07-15T10:00:00Z'),
//         deletedAt: null
//     }
// ];




// export const testNotifications: Notification[] = [
//     {
//         id: "64e5f3a8f8f8a3c2325d0001",
//         message: "Votre rendez-vous pour l'intervention est confirmé.",
//         utilisateur: {
//             nom: "Jean Dupont",
//             email: "jean.dupont@example.com",
//             motDePasse: "hashedpassword",
//             telephone: "+33612345678",
//             role: { id: 1, label: "client" },
//             createdAt: new Date("2023-01-01T08:00:00Z"),
//             updatedAt: new Date("2023-01-10T10:00:00Z"),
//             deletedAt: null
//         },
//         utilisateurId: "64d5f3a8f8f8a3c2325d1001",
//         seen: false,
//         createdAt: new Date("2023-08-01T08:30:00Z"),
//         updatedAt: new Date("2023-08-01T08:30:00Z"),
//         deletedAt: null
//     },
//     {
//         id: "64e5f3a8f8f8a3c2325d0002",
//         message: "Un nouveau devis est disponible pour votre intervention.",
//         utilisateur: {
//             nom: "Marie Curie",
//             email: "marie.curie@example.com",
//             motDePasse: "hashedpassword",
//             telephone: "+33698765432",
//             role: { id: 2, label: "mecanicien" },
//             createdAt: new Date("2023-02-15T09:00:00Z"),
//             updatedAt: new Date("2023-06-05T11:00:00Z"),
//             deletedAt: null
//         },
//         utilisateurId: "64d5f3a8f8f8a3c2325d1002",
//         seen: true,
//         createdAt: new Date("2023-08-02T09:15:00Z"),
//         updatedAt: new Date("2023-08-02T12:30:00Z"),
//         deletedAt: null
//     },
//     {
//         id: "64e5f3a8f8f8a3c2325d0003",
//         message: "Votre véhicule est prêt, vous pouvez venir le récupérer.",
//         utilisateur: {
//             nom: "Albert Einstein",
//             email: "albert.einstein@example.com",
//             motDePasse: "hashedpassword",
//             telephone: "+33712398745",
//             role: { id: 3, label: "manager" },
//             createdAt: new Date("2023-03-20T10:00:00Z"),
//             updatedAt: new Date("2023-07-12T15:00:00Z"),
//             deletedAt: null
//         },
//         utilisateurId: "64d5f3a8f8f8a3c2325d1003",
//         seen: false,
//         createdAt: new Date("2023-08-03T10:45:00Z"),
//         updatedAt: new Date("2023-08-03T10:45:00Z"),
//         deletedAt: null
//     },
//     {
//         id: "64e5f3a8f8f8a3c2325d0004",
//         message: "Une nouvelle prestation a été ajoutée à votre facture.",
//         utilisateur: {
//             nom: "Isaac Newton",
//             email: "isaac.newton@example.com",
//             motDePasse: "hashedpassword",
//             telephone: "+33655512345",
//             role: { id: 1, label: "client" },
//             createdAt: new Date("2023-04-05T14:00:00Z"),
//             updatedAt: new Date("2023-06-25T18:00:00Z"),
//             deletedAt: null
//         },
//         utilisateurId: "64d5f3a8f8f8a3c2325d1004",
//         seen: true,
//         createdAt: new Date("2023-08-04T12:00:00Z"),
//         updatedAt: new Date("2023-08-04T13:00:00Z"),
//         deletedAt: null
//     }
// ];

// export const testInterventions: Intervention[] = [
//     {
//         id: "650e3a8f8f8a3c2325d0001",
//         client: {
//             nom: "Jean Dupont",
//             email: "jean.dupont@example.com",
//             motDePasse: "hashedpassword",
//             telephone: "+33612345678",
//             role: { id: 1, label: "client" },
//             createdAt: new Date("2023-01-01T08:00:00Z"),
//             updatedAt: new Date("2023-01-10T10:00:00Z"),
//             deletedAt: null
//         },
//         mecaniciens: [
//             {
//                 nom: "Paul Martin",
//                 email: "paul.martin@example.com",
//                 motDePasse: "hashedpassword",
//                 telephone: "+33698765432",
//                 role: { id: 2, label: "mecanicien" },
//                 createdAt: new Date("2023-02-15T09:00:00Z"),
//                 updatedAt: new Date("2023-06-05T11:00:00Z"),
//                 deletedAt: null
//             }
//         ],
//         prestations: [
//             {
//                 id: "prest-001",
//                 label: "Vidange complète",
//                 description: "Vidange moteur avec changement de filtre à huile.",
//                 duree: new Date("1970-01-01T02:00:00Z"), // 2 heures
//                 tarfis: [
//                     {
//                         montant: 89.99,
//                         createdAt: new Date("2023-07-01T08:00:00Z")
//                     }
//                 ],
//                 createdAt: new Date("2023-07-01T08:00:00Z"),
//                 updatedAt: new Date("2023-07-01T08:00:00Z"),
//                 deletedAt: null
//             }
//         ],
//         voiture: {
//             id: "voiture-001",
//             marque: "Peugeot 208",
//             createdAt: new Date("2023-03-10T10:30:00Z"),
//             updatedAt: new Date("2023-03-15T11:45:00Z"),
//             deletedAt: null
//         },
//         dateIntervention: new Date("2023-09-10T09:00:00Z"),
//         statut: 1, // 1 = en cours
//         createdAt: new Date("2023-09-05T08:00:00Z"),
//         updatedAt: new Date("2023-09-08T12:00:00Z"),
//         deletedAt: null
//     },
//     {
//         id: "650e3a8f8f8a3c2325d0002",
//         client: {
//             nom: "Marie Curie",
//             email: "marie.curie@example.com",
//             motDePasse: "hashedpassword",
//             telephone: "+33698765432",
//             role: { id: 1, label: "client" },
//             createdAt: new Date("2023-04-10T10:00:00Z"),
//             updatedAt: new Date("2023-05-12T15:00:00Z"),
//             deletedAt: null
//         },
//         mecaniciens: [
//             {
//                 nom: "Michel Durand",
//                 email: "michel.durand@example.com",
//                 motDePasse: "hashedpassword",
//                 telephone: "+33712345678",
//                 role: { id: 2, label: "mecanicien" },
//                 createdAt: new Date("2023-03-20T08:30:00Z"),
//                 updatedAt: new Date("2023-06-01T14:00:00Z"),
//                 deletedAt: null
//             },
//             {
//                 nom: "Sophie Lemaitre",
//                 email: "sophie.lemaitre@example.com",
//                 motDePasse: "hashedpassword",
//                 telephone: "+33787654321",
//                 role: { id: 2, label: "mecanicien" },
//                 createdAt: new Date("2023-05-15T11:00:00Z"),
//                 updatedAt: new Date("2023-06-20T09:30:00Z"),
//                 deletedAt: null
//             }
//         ],
//         prestations: [
//             {
//                 id: "prest-002",
//                 label: "Changement de pneus",
//                 description: "Remplacement de quatre pneus avec équilibrage.",
//                 duree: new Date("1970-01-01T01:30:00Z"), // 1h30min
//                 tarfis: [
//                     {
//                         montant: 149.99,
//                         createdAt: new Date("2023-08-15T09:00:00Z")
//                     }
//                 ],
//                 createdAt: new Date("2023-08-10T09:30:00Z"),
//                 updatedAt: new Date("2023-08-12T11:00:00Z"),
//                 deletedAt: null
//             }
//         ],
//         voiture: {
//             id: "voiture-002",
//             marque: "Renault Clio",
//             createdAt: new Date("2023-02-20T14:00:00Z"),
//             updatedAt: new Date("2023-02-25T16:00:00Z"),
//             deletedAt: null
//         },
//         dateIntervention: new Date("2023-09-12T14:00:00Z"),
//         statut: 0, // 0 = à venir
//         createdAt: new Date("2023-09-06T09:00:00Z"),
//         updatedAt: new Date("2023-09-10T10:00:00Z"),
//         deletedAt: null
//     }
// ];

