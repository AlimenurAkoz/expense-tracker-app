import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction, TransactionType } from './models/transaction';
import Swal from 'sweetalert2';

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

  constructor() {
    this.load();
  }

  today(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  add() {
    const explanation = this.explanation.trim();
    if (!this.date) {
      alert('Lütfen bir tarih seçiniz.');
      return;
    }
    if (this.date > this.today()) {
      alert('İleri tarihli işlem eklenemez.');
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

    const newTransaction: Transaction = { id: this.nextId, date: this.date, explanation: explanation, amount: this.amount, type: this.type };
    this.transactions.push(newTransaction);
    this.nextId++;
    this.date = '';
    this.type = '';
    this.explanation = '';
    this.amount = null;
    this.save();
  }

  delete(transaction: Transaction) {
    this.transactions = this.transactions.filter(t => t.id !== transaction.id);
    this.save();
  }

  totalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  totalExpense(): number {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  balance(): number {
    return this.totalIncome() - this.totalExpense();
  }

  transactionNum(): number {
    return this.transactions.length;
  }

  filterTransaction(): Transaction[] {
    const searchText = this.searchTransaction.trim().toLocaleLowerCase('tr');
    return this.transactions.filter(t => t.explanation.toLocaleLowerCase('tr').includes(searchText));
  }

  save() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  load() {
    const data = localStorage.getItem('transactions');
    if (!data) {
      return;
    }

    try {
      this.transactions = JSON.parse(data);
    } catch {
      this.transactions = [];
    }

    if (this.transactions.length > 0) {
      const maxId = Math.max(...this.transactions.map(t => t.id));
      this.nextId = maxId + 1;
    }
  }

}