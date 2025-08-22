import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TradingViewWidget, TradingViewTickerTape } from '@/components/TradingViewWidget';
import { TransactionHistory } from '@/components/TransactionHistory';
import { Bell, ChevronDown, User, Wallet, TrendingUp, Gift, DollarSign, Bitcoin } from 'lucide-react';
import Profile from './Profile';
import UploadID from './UploadID';
import FundAccount from './FundAccount';
import Withdrawal from './Withdrawal';
import UpgradeAccount from './UpgradeAccount';
import Notifications from './Notifications';

type DashboardPage = 'main' | 'profile' | 'upload-id' | 'fund-account' | 'withdrawal' | 'upgrade-account' | 'notifications';

export default function Dashboard() {
  const { userData, portfolio, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<DashboardPage>('main');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userData?.currency || 'USD',
    }).format(amount);
  };

  const formatBTC = (amount: number) => {
    return `₿${amount.toFixed(8)}`;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-bronze';
      case 'silver': return 'text-silver';
      case 'gold': return 'text-gold';
      case 'platinum': return 'text-platinum';
      case 'diamond': return 'text-diamond';
      default: return 'text-bronze';
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'profile': return <Profile />;
      case 'upload-id': return <UploadID />;
      case 'fund-account': return <FundAccount />;
      case 'withdrawal': return <Withdrawal />;
      case 'upgrade-account': return <UpgradeAccount />;
      case 'notifications': return <Notifications />;
      default: return renderMainDashboard();
    }
  };

  const renderMainDashboard = () => (
    <div className="space-y-6">
      {/* Price Strip */}
      <div className="bg-tesla-surface rounded-lg">
        <TradingViewTickerTape />
      </div>

      {/* User Info */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">
            {userData?.firstName} {userData?.lastName}
          </span>
          <span className={`font-semibold uppercase ${getTierColor(userData?.tier || 'bronze')}`}>
            {userData?.tier || 'BRONZE'}
          </span>
        </div>
      </div>

      {/* Portfolio Amounts */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-tesla-surface rounded-lg p-4 flex justify-between items-center">
          <div>
            <div className="text-gray-400 text-sm">Invested</div>
            <div className="text-xl font-bold">{formatCurrency(portfolio?.invested || 0)}</div>
          </div>
          <TrendingUp className="text-tesla-red" size={32} />
        </div>
        
        <div className="bg-tesla-surface rounded-lg p-4 flex justify-between items-center">
          <div>
            <div className="text-gray-400 text-sm">Profit</div>
            <div className="text-xl font-bold text-profit-green">{formatCurrency(portfolio?.profit || 0)}</div>
          </div>
          <TrendingUp className="text-profit-green" size={32} />
        </div>
        
        <div className="bg-tesla-surface rounded-lg p-4 flex justify-between items-center">
          <div>
            <div className="text-gray-400 text-sm">Bonus</div>
            <div className="text-xl font-bold text-tesla-red">{formatCurrency(portfolio?.bonus || 0)}</div>
          </div>
          <Gift className="text-tesla-red" size={32} />
        </div>
        
        <div className="bg-tesla-surface rounded-lg p-4 flex justify-between items-center">
          <div>
            <div className="text-gray-400 text-sm">Balance</div>
            <div className="text-xl font-bold">{formatCurrency(portfolio?.balance || 0)}</div>
          </div>
          <Wallet className="text-gray-400" size={32} />
        </div>
        
        <div className="bg-tesla-surface rounded-lg p-4 flex justify-between items-center">
          <div>
            <div className="text-gray-400 text-sm">BTC Equivalent</div>
            <div className="text-xl font-bold text-orange-500">{formatBTC(portfolio?.btcEquivalent || 0)}</div>
          </div>
          <Bitcoin className="text-orange-500" size={32} />
        </div>
      </div>

      {/* Tesla Chart */}
      <div className="bg-tesla-surface rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Tesla Stock Chart</h3>
        <TradingViewWidget symbol="NASDAQ:TSLA" height="300" />
      </div>

      {/* Transaction History */}
      <div className="bg-tesla-surface rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        <TransactionHistory />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-tesla-dark text-white">
      {/* Dashboard Top Bar */}
      <div className="bg-tesla-grey border-b border-tesla-border px-4 py-3 fixed w-full top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <span className="text-sm text-gray-400">Account Status - </span>
              <span className={`font-semibold ${userData?.isVerified ? 'text-profit-green' : 'text-tesla-red'}`}>
                {userData?.isVerified ? 'VERIFIED' : 'NOT VERIFIED'}
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage('notifications')}
              className="relative"
            >
              <Bell size={20} className="text-gray-400 hover:text-white" />
              <span className="absolute -top-1 -right-1 bg-tesla-red w-3 h-3 rounded-full"></span>
            </Button>
            
            <DropdownMenu open={showUserMenu} onOpenChange={setShowUserMenu}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User size={20} />
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-tesla-surface border-tesla-border w-48">
                <DropdownMenuItem onClick={() => setCurrentPage('main')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentPage('profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentPage('upload-id')}>
                  Upload Identification
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentPage('fund-account')}>
                  Fund Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentPage('withdrawal')}>
                  Withdrawal
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentPage('upgrade-account')}>
                  Upgrade Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-tesla-red">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="pt-20 p-4">
        {renderPage()}
      </div>
    </div>
  );
}
