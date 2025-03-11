import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importation de FormsModule
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-intervention',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './intervention.component.html',
  styleUrl: './intervention.component.scss'
})
export class InterventionComponent {
  isModalOpen: boolean = false;

  form = {
    prestation: '',
    voiture: '',
    date: '',
    description: ''
  };

  prestations = [
    { id: 1, name: 'Réparation' },
    { id: 2, name: 'Entretien' },
    { id: 3, name: 'Contrôle technique' }
  ];

  voitures = [
    { name: 'Toyota Corolla' },
    { name: 'Honda Civic' },
    { name: 'Peugeot 208' },
    { name: 'BMW X5' },
    { name: 'Ford Focus' }
  ];
  // Liste des interventions (exemple)
  interventions = [
    { date: '2025-03-10', prestation: 'Réparation moteur', description: 'Réparation du moteur qui a ete deffectue pendant plusieurs annees', statut: 'En cours' },
    { date: '2025-03-11', prestation: 'Changement de pneus', description: 'Remplacement des pneus avant', statut: 'Complet' },
    { date: '2025-03-12', prestation: 'Révision générale', description: 'Vérification complète', statut: 'Annulé' },
    { date: '2025-03-13', prestation: 'Changement d\'huile', description: 'Vidange moteur', statut: 'En cours' },
    { date: '2025-03-10', prestation: 'Réparation moteur', description: 'Réparation du moteur', statut: 'En cours' },
    { date: '2025-03-11', prestation: 'Changement de pneus', description: 'Remplacement des pneus avant', statut: 'Complet' },
    { date: '2025-03-12', prestation: 'Révision générale', description: 'Vérification complète', statut: 'Annulé' },
    { date: '2025-03-13', prestation: 'Changement d\'huile', description: 'Vidange moteur', statut: 'En cours' },
    // Ajoute plus d'interventions si nécessaire
  ];

  // Propriétés liées à la recherche et à la pagination
  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 5; // Nombre d'éléments par page
  filteredInterventions = this.interventions;
  filteredVoitures = [...this.voitures]; // Liste des voitures filtrées, initialisée avec toutes les voitures.

  constructor() {}

  ngOnInit(): void {
    // Initialiser les données si nécessaire
    this.onSearch(); // Appliquer la recherche au chargement de la page
  }

  // Méthode pour rechercher dans les interventions
  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      // Si la recherche est vide, afficher toutes les interventions
      this.filteredInterventions = this.interventions;
    } else {
      // Sinon, filtrer selon le mot-clé
      this.filteredInterventions = this.interventions.filter(intervention =>
        intervention.prestation.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        intervention.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.paginate(); // Appliquer la pagination après la recherche
  }

  // Méthode pour paginer les interventions
  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredInterventions = this.filteredInterventions.slice(startIndex, endIndex);
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    if (page < 1) {
      page = 1;
    }
    this.currentPage = page;
    this.paginate(); // Appliquer la pagination après le changement de page
  }
 // Méthode pour ouvrir le modal
 openModal() {
  this.isModalOpen = true;
}

// Méthode pour fermer le modal
closeModal() {
  this.isModalOpen = false;
  this.form = { prestation: '', voiture: '', date: '', description: '' }; // Reset form
}

// Méthode pour soumettre le formulaire
submitForm() {
  if (this.form.prestation && this.form.voiture && this.form.date && this.form.description) {
    this.allowNewVoiture(); // Permet l'ajout d'une nouvelle voiture si elle n'existe pas déjà
    console.log('Formulaire soumis:', this.form);
    this.closeModal(); // Ferme le modal après soumission
  }
}

// Filtrage dynamique des voitures en fonction du texte tapé
onVoitureInput() {
  const searchText = this.form.voiture.toLowerCase(); // Texte tapé par l'utilisateur
  if (searchText) {
    this.filteredVoitures = this.voitures.filter(voiture =>
      voiture.name.toLowerCase().includes(searchText)
    );
  } else {
    this.filteredVoitures = [...this.voitures]; // Si le champ est vide, afficher toutes les voitures
  }
}

// Option pour permettre à l'utilisateur de choisir un texte tapé non existant
allowNewVoiture() {
  const voitureExists = this.voitures.some(voiture =>
    voiture.name.toLowerCase() === this.form.voiture.toLowerCase()
  );

  if (!voitureExists) {
    this.voitures.push({ name: this.form.voiture }); // Ajouter la nouvelle voiture à la liste
  }
}
}
