import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, push, set } from 'firebase/database';
import { storage, db } from '@/lib/firebase';
import { CloudUpload, Copy, CheckCircle } from 'lucide-react';

export default function FundAccount() {
  const { user, userData } = useAuth();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied', description: 'Address copied to clipboard' });
  };

  const handleFileChange = (file: File | null) => {
    setPaymentFile(file);
    if (file) {
      setUploadSuccess(true);
      toast({ title: 'Success', description: 'Payment proof uploaded successfully!' });
    }
  };

  const handleSubmitPayment = async () => {
    if (!user || !amount || !paymentFile) {
      toast({ 
        title: 'Error', 
        description: 'Please enter amount and upload payment screenshot',
        variant: 'destructive' 
      });
      return;
    }

    setUploading(true);
    try {
      // Upload payment screenshot to Firebase Storage
      const paymentRef = ref(storage, `payments/${user.uid}/payment_${Date.now()}`);
      await uploadBytes(paymentRef, paymentFile);
      const paymentURL = await getDownloadURL(paymentRef);

      // Add transaction to database
      const transactionRef = push(dbRef(db, 'transactions'));
      await set(transactionRef, {
        id: transactionRef.key,
        userId: user.uid,
        type: 'deposit',
        amount: parseFloat(amount),
        status: 'pending',
        description: `Deposit of ${amount} via ${userData?.currency || 'USD'}`,
        timestamp: Date.now(),
        paymentScreenshot: paymentURL,
      });

      toast({ 
        title: 'Success', 
        description: 'Payment submitted successfully! Processing may take 5-10 minutes.',
      });

      setAmount('');
      setPaymentFile(null);
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Failed to submit payment. Please try again.',
        variant: 'destructive' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Fund Account</h2>
      
      <div className="bg-tesla-surface rounded-lg p-6 space-y-6">
        <div>
          <Label className="block text-sm font-medium mb-2">Deposit Address</Label>
          <div className="bg-tesla-grey rounded-lg p-4 flex justify-between items-center">
            <span className="font-mono text-sm break-all flex-1 mr-4">
              {userData?.depositAddress || 'Loading...'}
            </span>
            <Button
              variant="link"
              size="sm"
              onClick={() => copyToClipboard(userData?.depositAddress || '')}
              className="text-tesla-red hover:underline flex-shrink-0"
            >
              <Copy size={16} className="mr-1" />
              Copy
            </Button>
          </div>
        </div>
        
        <div>
          <Label htmlFor="amount">Amount ({userData?.currency || 'USD'})</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="bg-tesla-grey border-tesla-border"
          />
        </div>
        
        <div>
          <Label className="block text-sm font-medium mb-2">Payment Screenshot</Label>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              uploadSuccess 
                ? 'border-green-500 bg-green-50/5' 
                : 'border-tesla-border hover:border-tesla-red'
            }`}
            onClick={() => document.getElementById('payment-file')?.click()}
          >
            {uploadSuccess ? (
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            ) : (
              <CloudUpload size={48} className="text-gray-400 mx-auto mb-4" />
            )}
            <p className={`mb-2 ${uploadSuccess ? 'text-green-500' : 'text-gray-400'}`}>
              {paymentFile ? paymentFile.name : 'Upload payment proof'}
            </p>
            <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
            <input
              id="payment-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            />
          </div>
        </div>
        
        <Button 
          onClick={handleSubmitPayment}
          disabled={uploading || !amount || !paymentFile}
          className="w-full bg-tesla-red hover:bg-tesla-red/80"
        >
          {uploading ? 'Submitting...' : 'I Have Paid'}
        </Button>
      </div>
    </div>
  );
}
