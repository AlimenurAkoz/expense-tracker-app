import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction, TransactionType } from './models/transaction';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('expense-tracker-app');
  date: string = '';
  type: TransactionType | '' = '';
  amount: number | null = null;
  transactions: Transaction[] = [];
  nextId: number = 1;
  highlightedId: number | null = null;
  explanation: string = '';
  searchTransaction: string = '';
  add() {
    if (!this.date) {
      alert('Lütfen bir tarih seçiniz.');
      return;
    }
    if (!this.type) {
      alert('Lütfen gelir veya gider türünü seçiniz.');
      return;
    }
    if (this.amount === null) {
      alert('Lütfen bir tutar giriniz.');
      return;
    }

    if (this.amount <= 0) {
      alert('Tutar 0 veya "-"(negatif) olamaz!');
      return;
    }

    if (this.type === 'expense' && !this.explanation.trim()) {
      alert('Gider işlemleri için açıklama girmek zorunludur!');
      return;
    }
  }

  delete(transaction: Transaction) { }
  totalIncome() { }
  totalExpense() { }
  balance() { }
  transactionNum() { }
  filterTransaction(): Transaction[] {
    const searchText = this.searchTransaction.trim().toLocaleLowerCase('tr');
    return this.transactions.filter(p => p.explanation.toLocaleLowerCase('tr').includes(searchText));
  }
}