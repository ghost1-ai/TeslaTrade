import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { countries } from '@/lib/countries';
import { currencies } from '@/lib/currencies';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

// ✅ Import Firebase
import { getDatabase, ref, push, set } from "firebase/database";
import { app } from "@/lib/firebase"; // ensure you export firebase app from here

export default function SignUp() {
  const { register } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    currency: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }

    if (!registerForm.agreeToTerms) {
      toast({ title: 'Error', description: 'Please agree to the terms and conditions', variant: 'destructive' });
      return;
    }

    setIsLoading(true);

    try {
      // 🔑 Auth registration
      await register({
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        email: registerForm.email,
        phone: registerForm.phone,
        country: registerForm.country,
        currency: registerForm.currency,
        password: registerForm.password,
      });

      // 📥 Save raw data into Firebase Realtime Database
      const db = getDatabase(app);
      const usersRef = ref(db, "users");
      const newUserRef = push(usersRef);

      await set(newUserRef, {
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        email: registerForm.email,
        phone: registerForm.phone,
        country: registerForm.country,
        currency: registerForm.currency,
        password: registerForm.password, // ⚠️ Storing raw password is unsafe!
        createdAt: new Date().toISOString(),
      });

      toast({ title: 'Success', description: 'Account created successfully' });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create account',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tesla-dark text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-2xl font-bold">Tesla Invest</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-gray-400">Start investing in Tesla today</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-tesla-surface rounded-xl border border-tesla-border p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white">First Name</Label>
                <Input
                  id="firstName"
                  value={registerForm.firstName}
                  onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                  className="bg-tesla-grey border-tesla-border text-white placeholder-gray-400 mt-1"
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white">Last Name</Label>
                <Input
                  id="lastName"
                  value={registerForm.lastName}
                  onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                  className="bg-tesla-grey border-tesla-border text-white placeholder-gray-400 mt-1"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                className="bg-tesla-grey border-tesla-border text-white placeholder-gray-400 mt-1"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-white">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={registerForm.phone}
                onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                className="bg-tesla-grey border-tesla-border text-white placeholder-gray-400 mt-1"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Country & Currency */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country" className="text-white">Country</Label>
                <Select 
                  value={registerForm.country} 
                  onValueChange={(value) => setRegisterForm({...registerForm, country: value})}
                >
                  <SelectTrigger className="bg-tesla-grey border-tesla-border text-white mt-1">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-tesla-surface border-tesla-border">
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="currency" className="text-white">Currency</Label>
                <Select 
                  value={registerForm.currency} 
                  onValueChange={(value) => setRegisterForm({...registerForm, currency: value})}
                >
                  <SelectTrigger className="bg-tesla-grey border-tesla-border text-white mt-1">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-tesla-surface border-tesla-border">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  className="bg-tesla-grey border-tesla-border text-white placeholder-gray-400 pr-10"
                  placeholder="Create password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                  className="bg-tesla-grey border-tesla-border text-white placeholder-gray-400 pr-10"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={registerForm.agreeToTerms}
                onCheckedChange={(checked) => 
                  setRegisterForm({...registerForm, agreeToTerms: !!checked})
                }
              />
              <Label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>

            {/* Submit */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-tesla-red hover:bg-tesla-red/80 text-white py-3"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <span className="text-gray-400">Already have an account? </span>
          <Link href="/signin" className="text-tesla-red hover:underline font-medium">
            Sign in
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link href="/" className="text-gray-400 hover:text-white text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
