import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ref, onValue, off } from 'firebase/database';
import { db } from '@/lib/firebase';
import type { Transaction } from '@shared/schema';

export function TransactionHistory() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!user) return;

    const transactionsRef = ref(db, 'transactions');
    
    const handleTransactions = (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const allTransactions = Object.values(data) as Transaction[];
        const userTransactions = allTransactions
          .filter((transaction) => transaction.userId === user.uid)
          .sort((a, b) => b.timestamp - a.timestamp);
        setTransactions(userTransactions);
      }
    };

    onValue(transactionsRef, handleTransactions);

    return () => {
      off(transactionsRef, 'value', handleTransactions);
    };
  }, [user]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-profit-green';
      case 'pending': return 'text-yellow-500';
      case 'failed': return 'text-loss-red';
      default: return 'text-gray-400';
    }
  };

  const getTypeDisplay = (type: string) => {
    switch (type) {
      case 'deposit': return 'Deposit';
      case 'withdrawal': return 'Withdrawal';
      case 'trade': return 'Trade';
      case 'bonus': return 'Bonus';
      default: return type;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-tesla-border">
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Type</th>
            <th className="text-left py-2">Amount</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-tesla-border/50">
                <td className="py-3 text-gray-400">{formatDate(transaction.timestamp)}</td>
                <td className="py-3">{getTypeDisplay(transaction.type)}</td>
                <td className="py-3 font-semibold">{formatAmount(transaction.amount)}</td>
                <td className={`py-3 font-semibold capitalize ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </td>
                <td className="py-3 text-gray-400 text-xs">{transaction.description}</td>
              </tr>
            ))
          ) : (
            <tr className="border-b border-tesla-border/50">
              <td className="py-6 text-gray-400 text-center" colSpan={5}>
                No transactions yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}