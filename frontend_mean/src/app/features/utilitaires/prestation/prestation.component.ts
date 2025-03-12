import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Prestation {
  id: number;
  label: string;
  tarif: number;
}


@Component({
  selector: 'app-prestation',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './prestation.component.html',
  styleUrl: './prestation.component.scss'
})
export class PrestationComponent {
  isModalOpen: boolean = false;

  form = {
    prestation: '',
    date: '',
    description: ''
  };


  prestations: Prestation[] = [
    { id: 1, label: "Vidange moteur", tarif: 200000 },
    { id: 2, label: "Changement de pneus", tarif: 120000 },
    { id: 3, label: "Révision complète", tarif: 450000 },
    { id: 4, label: "Diagnostic électronique", tarif: 180000 },
    { id: 5, label: "Remplacement des plaquettes de frein", tarif: 300000 }
  ];



  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 5;
  filteredPrestations = this.prestations;

  constructor() {}

  ngOnInit(): void {

    this.onSearch();
  }


  onSearch(): void {
    if (this.searchQuery.trim() === '') {

      this.filteredPrestations = this.prestations;
    } else {

      this.filteredPrestations = this.prestations.filter(prestation =>
        prestation.label.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        prestation.tarif.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.paginate();
  }


  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredPrestations = this.filteredPrestations.slice(startIndex, endIndex);
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
