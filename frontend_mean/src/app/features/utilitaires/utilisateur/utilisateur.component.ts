import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  numero: string;
  role: string
}

@Component({
  selector: 'app-utilisateur',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.scss'
})
export class UtilisateurComponent {
  isModalOpen: boolean = false;

  form = {
    prestation: '',
    date: '',
    description: ''
  };


  utilisateurs: Utilisateur[] = [
    { id: 1, nom: "Jean Dupont", email: "jean.dupont@example.com", numero: "0341234567", role: "Client" },
    { id: 2, nom: "Marie Curie", email: "marie.curie@example.com", numero: "0329876543", role: "Mecanicien" },
    { id: 3, nom: "Paul Martin", email: "paul.martin@example.com", numero: "0331122334", role: "Manager" },
    { id: 4, nom: "Emma Leroy", email: "emma.leroy@example.com", numero: "0345566778", role: "Client" },
    { id: 5, nom: "Lucien Moreau", email: "lucien.moreau@example.com", numero: "0326655443", role: "Mecanicien" },
    { id: 6, nom: "Sophie Bernard", email: "sophie.bernard@example.com", numero: "0347788996", role: "Manager" }
  ];



  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 5;
  filteredUtilisateurs = this.utilisateurs;

  constructor() {}

  ngOnInit(): void {

    this.onSearch();
  }


  onSearch(): void {
    if (this.searchQuery.trim() === '') {

      this.filteredUtilisateurs = this.utilisateurs;
    } else {

      this.filteredUtilisateurs = this.utilisateurs.filter(item =>
        item.numero.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.paginate();
  }


  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredUtilisateurs = this.filteredUtilisateurs.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page < 1) {
      page = 1;
    }
    this.currentPage = page;
    this.paginate(); 
  }

  openModal() {
    this.isModalOpen = true;
  }


  closeModal() {
    this.isModalOpen = false;
    this.form = { prestation: '', date: '', description: '' }; 
  }


  submitForm() {
    if (this.form.prestation && this.form.date && this.form.description) {
      console.log('Formulaire soumis:', this.form);
      this.closeModal();
    }
  }

}
