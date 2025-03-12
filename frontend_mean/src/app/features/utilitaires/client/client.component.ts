import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


interface Client {
  id: number;
  nom: string;
  numero: string;
}

@Component({
  selector: 'app-client',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  isModalOpen: boolean = false;

  form = {
    prestation: '',
    date: '',
    description: ''
  };


  clients: Client[] = [
    { id: 1, nom: "Jean Dupont", numero: "0341234567" },
    { id: 2, nom: "Marie Curie", numero: "0329876543" },
    { id: 3, nom: "Paul Martin", numero: "0331122334" },
    { id: 4, nom: "Emma Leroy", numero: "0345566778" },
    { id: 5, nom: "Lucien Moreau", numero: "0326655443" }
  ];



  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 5;
  filteredClients = this.clients;

  constructor() {}

  ngOnInit(): void {

    this.onSearch();
  }


  onSearch(): void {
    if (this.searchQuery.trim() === '') {

      this.filteredClients = this.clients;
    } else {

      this.filteredClients = this.clients.filter(item =>
        item.numero.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.paginate();
  }


  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredClients = this.filteredClients.slice(startIndex, endIndex);
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
