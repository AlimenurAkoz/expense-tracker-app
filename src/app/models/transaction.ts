export type TransactionType = 'income' | 'expense';
export interface Transaction {
    id: number;
    date: string;
    explanation: string;
    amount: number;
    type: TransactionType;
}
