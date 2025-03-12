import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


interface Voiture{
  id: number
  label: string
}

@Component({
  selector: 'app-voiture',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './voiture.component.html',
  styleUrl: './voiture.component.scss'
})
export class VoitureComponent {
  isModalOpen: boolean = false;

  form = {
    prestation: '',
    date: '',
    description: ''
  };

  prestations = [
    { id: 1, name: 'Réparation' },
    { id: 2, name: 'Entretien' },
    { id: 3, name: 'Contrôle technique' }
  ];


  // Liste des interventions (exemple)
  voitures : Voiture [] = [
    { id: 1, label: "Citroen C4" },
    { id: 2, label: "Peugeot 306" },
    { id: 3, label: "Audi A4 break" },
    { id: 4, label: "Toyota Corolla" },
    { id: 5, label: "Suzuki V4" }
    // Ajoute plus d'interventions si nécessaire
  ];

  // Propriétés liées à la recherche et à la pagination
  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 5; // Nombre d'éléments par page
  filteredVoitures = this.voitures;

  constructor() {}

  ngOnInit(): void {
    // Initialiser les données si nécessaire
    this.onSearch(); // Appliquer la recherche au chargement de la page
  }

  // Méthode pour rechercher dans les interventions
  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      // Si la recherche est vide, afficher toutes les interventions
      this.filteredVoitures = this.voitures;
    } else {
      // Sinon, filtrer selon le mot-clé
      this.filteredVoitures = this.voitures.filter(item =>
        item.label.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.paginate(); // Appliquer la pagination après la recherche
  }

  // Méthode pour paginer les interventions
  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredVoitures = this.filteredVoitures.slice(startIndex, endIndex);
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
    this.form = { prestation: '', date: '', description: '' }; // Reset form
  }

  // Méthode pour soumettre le formulaire
  submitForm() {
    if (this.form.prestation && this.form.date && this.form.description) {
      console.log('Formulaire soumis:', this.form);
      this.closeModal(); // Ferme le modal après soumission
    }
  }

}
