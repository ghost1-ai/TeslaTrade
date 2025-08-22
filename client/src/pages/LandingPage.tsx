import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { countries } from '@/lib/countries';
import { currencies } from '@/lib/currencies';
import { TradingViewTickerTape } from '@/components/TradingViewWidget';
import { useToast } from '@/hooks/use-toast';
import { Zap, Shield, TrendingUp, Clock, DollarSign, Headphones, ChartLine, Building, Check, X } from 'lucide-react';

export default function LandingPage() {
  const { login, register } = useAuth();
  const { toast } = useToast();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm.email, loginForm.password);
      toast({ title: 'Success', description: 'Logged in successfully' });
      setShowLogin(false);
    } catch (error) {
      toast({ title: 'Error', description: 'Invalid email or password', variant: 'destructive' });
    }
  };

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

    try {
      await register({
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        email: registerForm.email,
        phone: registerForm.phone,
        country: registerForm.country,
        currency: registerForm.currency,
        password: registerForm.password,
      });
      toast({ title: 'Success', description: 'Account created successfully' });
      setShowRegister(false);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create account', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-tesla-dark text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-tesla-grey/95 backdrop-blur-sm border-b border-tesla-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold">Tesla Invest</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="hover:text-tesla-red transition-colors">Features</a>
              <a href="#pricing" className="hover:text-tesla-red transition-colors">Pricing</a>
              <a href="#security" className="hover:text-tesla-red transition-colors">Security</a>
              
              <Dialog open={showLogin} onOpenChange={setShowLogin}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-tesla-red">
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-tesla-surface border-tesla-border">
                  <DialogHeader>
                    <DialogTitle className="text-center text-white">Welcome Back</DialogTitle>
                    <p className="text-center text-gray-400">Sign in to your Tesla Invest account</p>
                  </DialogHeader>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Email Address</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="sliver border-tesla-border"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                       =600" 
                alt="Tesla factory production line" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tesla-dark/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Tesla Stock Display */}
      <section id="stock-display" className="py-16 px-4 bg-tesla-grey">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tesla Stock Performance</h2>
            <p className="text-gray-300 text-lg">Real-time TSLA stock data and analytics</p>
          </div>
          
          {/* TradingView Ticker Tape */}
          <div className="mb-8">
            <TradingViewTickerTape />
          </div>

          {/* Stock Chart */}
          <div className="bg-tesla-surface rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">TSLA Chart</h3>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
              alt="Tesla stock trading chart" 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Tesla Invest?</h2>
            <p className="text-gray-300 text-lg">Professional-grade features for every investor</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-tesla-surface rounded-xl p-6 text-center">
              <div className="bg-tesla-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartLine className="text-tesla-red" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Trading</h3>
              <p className="text-gray-300">Up-to-the-minute order execution with live market data</p>
            </div>
            
            <div className="bg-tesla-surface rounded-xl p-6 text-center">
              <div className="bg-tesla-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-tesla-red" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fractional Investing</h3>
              <p className="text-gray-300">Start with as little as $1 and build your portfolio</p>
            </div>
            
            <div className="bg-tesla-surface rounded-xl p-6 text-center">
              <div className="bg-tesla-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-tesla-red" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Deposits</h3>
              <p className="text-gray-300">Fund your account instantly via card, bank, or wallet</p>
            </div>
            
            <div className="bg-tesla-surface rounded-xl p-6 text-center">
              <div className="bg-tesla-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-tesla-red" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Regulated</h3>
              <p className="text-gray-300">Licensed broker partnerships and bank-grade security</p>
            </div>
            
            <div className="bg-tesla-surface rounded-xl p-6 text-center">
              <div className="bg-tesla-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-tesla-red" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Portfolio Tracking</h3>
              <p className="text-gray-300">Monitor earnings, history, and portfolio value in real-time</p>
            </div>
            
            <div className="bg-tesla-surface rounded-xl p-6 text-center">
              <div className="bg-tesla-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="text-tesla-red" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-300">Professional support team available around the clock</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-tesla-grey">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-300 text-lg">Start investing in 4 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Create Account', desc: 'KYC verification with government-issued ID' },
              { step: 2, title: 'Fund Account', desc: 'Secure and instant funding options' },
              { step: 3, title: 'Buy Tesla Shares', desc: 'Choose amount and execute your order' },
              { step: 4, title: 'Track & Withdraw', desc: 'Monitor performance and withdraw anytime' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-tesla-red w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section id="security" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trust & Security</h2>
            <p className="text-gray-300 text-lg">Your investments are protected by industry-leading security</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { icon: Shield, title: 'Bank-Grade Encryption', desc: '256-bit SSL encryption protects all your data' },
                { icon: Building, title: '2FA & Biometric Security', desc: 'Multi-factor authentication and biometric login' },
                { icon: Building, title: 'Licensed Custodians', desc: 'Assets protected by regulated financial institutions' },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-tesla-red/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-tesla-red" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-tesla-surface rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Regulatory Compliance</h3>
              <div className="space-y-3">
                {[
                  'SEC Registered Investment Advisor',
                  'FINRA Member',
                  'SIPC Protected',
                  'SOC 2 Type II Certified',
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="text-profit-green" size={16} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Fees Section */}
      <section id="pricing" className="py-16 px-4 bg-tesla-grey">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-gray-300 text-lg">No hidden fees, just honest pricing</p>
          </div>
          
          <div className="bg-tesla-surface rounded-xl p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-profit-green mb-2">$0</h3>
                <p className="text-gray-300">Trading Commissions</p>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">$0.50</h3>
                <p className="text-gray-300">Deposit Fee</p>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">$1.00</h3>
                <p className="text-gray-300">Withdrawal Fee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Block */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Building Your Tesla Portfolio Today</h2>
          <p className="text-gray-300 text-lg mb-8">Join thousands of investors already earning with Tesla Invest</p>
          <Button 
            onClick={() => setShowRegister(true)}
            className="bg-tesla-red hover:bg-tesla-red/80 text-lg px-8 py-6"
          >
            Invest Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tesla-grey border-t border-tesla-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-tesla-red rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold">Tesla Invest</span>
              </div>
              <p className="text-gray-400 text-sm">Secure Tesla investment platform with real-time trading and portfolio management.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="#" className="hover:text-white transition-colors">About</a></div>
                <div><a href="#" className="hover:text-white transition-colors">Careers</a></div>
                <div><a href="#" className="hover:text-white transition-colors">Blog</a></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="#" className="hover:text-white transition-colors">Help Center</a></div>
                <div><a href="#" className="hover:text-white transition-colors">Contact Us</a></div>
                <div><a href="#" className="hover:text-white transition-colors">API Docs</a></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="#" className="hover:text-white transition-colors">Terms of Service</a></div>
                <div><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></div>
                <div><a href="#" className="hover:text-white transition-colors">Regulatory Info</a></div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-tesla-border mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Tesla Invest. All rights reserved. Investment involves risk. Past performance does not guarantee future results.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
