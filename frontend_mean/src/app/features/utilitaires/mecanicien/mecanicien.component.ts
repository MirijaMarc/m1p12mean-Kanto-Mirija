import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
interface Mecanicien {
  id: number;
  nom: string;
  numero: string;
  nbInterventionsEnCours: number;
}


@Component({
  selector: 'app-mecanicien',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
],
  templateUrl: './mecanicien.component.html',
  styleUrl: './mecanicien.component.scss'
})
export class MecanicienComponent {
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
  mecaniciens : Mecanicien[] = [
    { id: 1, nom: "Jean Dupont", numero: "0612345678", nbInterventionsEnCours: 2 },
    { id: 2, nom: "Pierre Martin", numero: "0698765432", nbInterventionsEnCours: 1 },
    { id: 3, nom: "Sophie Durand", numero: "0711223344", nbInterventionsEnCours: 3 },
    { id: 4, nom: "Lucas Bernard", numero: "0688997766", nbInterventionsEnCours: 0 },
    { id: 5, nom: "Emma Lefevre", numero: "0755667788", nbInterventionsEnCours: 4 }
    // Ajoute plus d'interventions si nécessaire
  ];

  // Propriétés liées à la recherche et à la pagination
  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 5; // Nombre d'éléments par page
  filteredMecaniciens = this.mecaniciens;

  constructor() {}

  ngOnInit(): void {
    // Initialiser les données si nécessaire
    this.onSearch(); // Appliquer la recherche au chargement de la page
  }

  // Méthode pour rechercher dans les interventions
  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      // Si la recherche est vide, afficher toutes les interventions
      this.filteredMecaniciens = this.mecaniciens;
    } else {
      // Sinon, filtrer selon le mot-clé
      this.filteredMecaniciens = this.mecaniciens.filter(mecanicien =>
        mecanicien.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        mecanicien.numero.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.paginate(); // Appliquer la pagination après la recherche
  }

  // Méthode pour paginer les interventions
  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredMecaniciens = this.filteredMecaniciens.slice(startIndex, endIndex);
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
