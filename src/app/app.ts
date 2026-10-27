import { Component, signal, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction, TransactionType } from './models/transaction';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
  private cdr = inject(ChangeDetectorRef);

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
    const explanation =  this.capitalize(this.explanation.trim());
    if (!this.date) {
      this.showError('Lütfen bir tarih seçiniz.');
      return;
    }
    if (this.date > this.today()) {
      this.showError('İleri tarihli işlem eklenemez.');
      return;
    }
    if (!this.type) {
      this.showError('Lütfen gelir veya gider türünü seçiniz.');
      return;
    }
    if (this.amount === null) {
      this.showError('Lütfen bir tutar giriniz.');
      return;
    }

    if (this.amount <= 0) {
      this.showError('Tutar 0 veya "-"(negatif) olamaz!');
      return;
    }

    if (this.type === 'expense' && !this.explanation.trim()) {
      this.showError('Gider işlemleri için açıklama girmek zorunludur!');
      return;
    }

    const newTransaction: Transaction = {
      id: this.nextId,
      date: this.date,
      explanation: explanation,
      amount: this.amount,
      type: this.type,
    };
    this.transactions.push(newTransaction);
    this.nextId++;
    this.date = '';
    this.type = '';
    this.explanation = '';
    this.amount = null;
    this.save();
  }

  delete(transaction: Transaction) {
    Swal.fire({
      icon: 'question',
      title: 'Silinsin mi?',
      text: `"${transaction.explanation || 'Bu işlem'}" silinecek.`,
      showCancelButton: true,
      confirmButtonText: 'Sil',
      cancelButtonText: 'Vazgeç',
      confirmButtonColor: 'rgb(145, 16, 16)',
      cancelButtonColor: 'rgb(41, 65, 55)',
      background: 'rgb(149, 235, 201)',
      color: 'rgb(41, 65, 55)'
    }).then(result => {
      if (result.isConfirmed) {
        this.transactions = this.transactions.filter(t => t.id !== transaction.id);
        this.save();
        this.cdr.markForCheck();
        this.showSuccess('İşlem silindi');
      }
    });
  }

  totalIncome(): number {
    return this.transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  totalExpense(): number {
    return this.transactions
      .filter((t) => t.type === 'expense')
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
    return this.transactions.filter((t) =>
      t.explanation.toLocaleLowerCase('tr').includes(searchText),
    );
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
      const maxId = Math.max(...this.transactions.map((t) => t.id));
      this.nextId = maxId + 1;
    }
  }
  showError(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Eksik bilgi',
      text: message,
      confirmButtonText: 'Tamam',
      confirmButtonColor: 'rgb(145, 16, 16)',
      background: 'rgb(149, 235, 201)',
      color: 'rgb(41, 65, 55)'
    });
  }

  capitalize(text: string): string {
    if (!text) {
      return text;
    }
    return text.charAt(0).toLocaleUpperCase('tr') + text.slice(1);
  }

  showSuccess(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }
}
