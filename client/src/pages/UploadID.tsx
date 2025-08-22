import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { CloudUpload, CheckCircle } from 'lucide-react';

export default function UploadID() {
  const { user, updateUserData } = useAuth();
  const { toast } = useToast();
  const [documentType, setDocumentType] = useState('');
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState({ front: false, back: false });

  const handleFileChange = (type: 'front' | 'back', file: File | null) => {
    if (type === 'front') {
      setFrontFile(file);
      if (file) {
        setUploadSuccess(prev => ({ ...prev, front: true }));
        toast({ title: 'Success', description: 'Front page uploaded successfully!' });
      }
    } else {
      setBackFile(file);
      if (file) {
        setUploadSuccess(prev => ({ ...prev, back: true }));
        toast({ title: 'Success', description: 'Back page uploaded successfully!' });
      }
    }
  };

  const handleVerifyAccount = async () => {
    if (!user || !documentType || !frontFile || !backFile) {
      toast({ 
        title: 'Error', 
        description: 'Please select document type and upload both front and back images',
        variant: 'destructive' 
      });
      return;
    }

    setUploading(true);
    try {
      // Upload files to Firebase Storage
      const frontRef = ref(storage, `documents/${user.uid}/front_${Date.now()}`);
      const backRef = ref(storage, `documents/${user.uid}/back_${Date.now()}`);

      await uploadBytes(frontRef, frontFile);
      await uploadBytes(backRef, backFile);

      const frontURL = await getDownloadURL(frontRef);
      const backURL = await getDownloadURL(backRef);

      // Update user verification status (in production, this would be pending review)
      // For demo purposes, we'll set to verified immediately
      await updateUserData({ 
        isVerified: true,
        documentType: documentType,
        frontDocumentURL: frontURL,
        backDocumentURL: backURL,
      });

      toast({ 
        title: 'Success', 
        description: 'Documents uploaded successfully! Your account is under review.',
      });
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Failed to upload documents. Please try again.',
        variant: 'destructive' 
      });
    } finally {
      setUploading(false);
    }
  };

  const FileUploadArea = ({ 
    label, 
    file, 
    onChange,
    isSuccess 
  }: { 
    label: string; 
    file: File | null; 
    onChange: (file: File | null) => void; 
    isSuccess?: boolean;
  }) => (
    <div>
      <Label className="block text-sm font-medium mb-2">{label}</Label>
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isSuccess 
            ? 'border-green-500 bg-green-50/5' 
            : 'border-tesla-border hover:border-tesla-red'
        }`}
        onClick={() => document.getElementById(`file-${label}`)?.click()}
      >
        {isSuccess ? (
          <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        ) : (
          <CloudUpload size={48} className="text-gray-400 mx-auto mb-4" />
        )}
        <p className={`mb-2 ${isSuccess ? 'text-green-500' : 'text-gray-400'}`}>
          {file ? file.name : 'Click to upload or drag and drop'}
        </p>
        <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
        <input
          id={`file-${label}`}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Upload Identification</h2>
      
      <div className="bg-tesla-surface rounded-lg p-6 space-y-6">
        <div>
          <Label htmlFor="documentType">Document Type</Label>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger className="bg-tesla-grey border-tesla-border">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent className="bg-tesla-surface border-tesla-border">
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="drivers-license">Driver's License</SelectItem>
              <SelectItem value="national-id">National ID</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <FileUploadArea
          label="Front Page"
          file={frontFile}
          onChange={(file) => handleFileChange('front', file)}
          isSuccess={uploadSuccess.front}
        />
        
        <FileUploadArea
          label="Back Page"
          file={backFile}
          onChange={(file) => handleFileChange('back', file)}
          isSuccess={uploadSuccess.back}
        />
        
        <Button 
          onClick={handleVerifyAccount}
          disabled={uploading || !documentType || !frontFile || !backFile}
          className="w-full bg-tesla-red hover:bg-tesla-red/80"
        >
          {uploading ? 'Uploading...' : 'Verify Account'}
        </Button>
      </div>
    </div>
  );
}
