import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function Withdrawal() {
  const { userData } = useAuth();
  const { toast } = useToast();
  const [authCode, setAuthCode] = useState('');
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [withdrawalForm, setWithdrawalForm] = useState({
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
    amount: '',
  });

  const handleAuthorize = () => {
    if (!authCode) {
      toast({ 
        title: 'Error', 
        description: 'Please enter authorization code',
        variant: 'destructive' 
      });
      return;
    }

    // Check if the entered code matches the user's auth code
    if (authCode === userData?.authCode) {
      toast({ title: 'Success', description: 'Authorization successful!' });
      setShowDetailsForm(true);
    } else {
      toast({ 
        title: 'Invalid Code', 
        description: 'Please contact customer service for the authorization code.',
        variant: 'destructive' 
      });
    }
  };

  const handleWithdrawalSubmit = () => {
    // Always show threshold error as per requirements
    toast({ 
      title: 'Withdrawal Error', 
      description: 'You haven\'t met the withdrawal threshold. Please contact customer support.',
      variant: 'destructive' 
    });
  };

  if (showDetailsForm) {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Withdrawal Details</h2>
        
        <div className="bg-tesla-surface rounded-lg p-6 space-y-6">
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              value={withdrawalForm.bankName}
              onChange={(e) => setWithdrawalForm({...withdrawalForm, bankName: e.target.value})}
              placeholder="Enter bank name"
              className="bg-tesla-grey border-tesla-border"
            />
          </div>
          
          <div>
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={withdrawalForm.accountNumber}
              onChange={(e) => setWithdrawalForm({...withdrawalForm, accountNumber: e.target.value})}
              placeholder="Enter account number"
              className="bg-tesla-grey border-tesla-border"
            />
          </div>
          
          <div>
            <Label htmlFor="accountHolderName">Account Holder Name</Label>
            <Input
              id="accountHolderName"
              value={withdrawalForm.accountHolderName}
              onChange={(e) => setWithdrawalForm({...withdrawalForm, accountHolderName: e.target.value})}
              placeholder="Enter account holder name"
              className="bg-tesla-grey border-tesla-border"
            />
          </div>
          
          <div>
            <Label htmlFor="amount">Amount ({userData?.currency || 'USD'})</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={withdrawalForm.amount}
              onChange={(e) => setWithdrawalForm({...withdrawalForm, amount: e.target.value})}
              placeholder="Enter withdrawal amount"
              className="bg-tesla-grey border-tesla-border"
            />
          </div>
          
          <Button 
            onClick={handleWithdrawalSubmit}
            className="w-full bg-tesla-red hover:bg-tesla-red/80"
          >
            Submit Withdrawal Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Withdrawal</h2>
      
      <div className="bg-tesla-surface rounded-lg p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Enter Authorization Code</h3>
          <Input
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            placeholder="Enter authorization code"
            className="bg-tesla-grey border-tesla-border text-center text-lg"
          />
        </div>
        
        <div className="text-center text-sm text-gray-400">
          <p>Contact customer care for authorization code</p>
        </div>
        
        <Button 
          onClick={handleAuthorize}
          className="w-full bg-tesla-red hover:bg-tesla-red/80"
        >
          Authorize
        </Button>
      </div>
    </div>
  );
}
