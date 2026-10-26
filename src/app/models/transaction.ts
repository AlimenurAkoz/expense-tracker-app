export type TransactionType = 'income' | 'expense';
export interface Transaction {
    id: number;
    explanation: string;
    amount: number;
    type: TransactionType;
}
