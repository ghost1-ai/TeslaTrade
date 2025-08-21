import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check, X } from 'lucide-react';

const tiers = [
  {
    name: 'BRONZE',
    price: '$500',
    color: 'bronze',
    borderColor: 'border-bronze',
    bgColor: 'bg-bronze',
    features: [
      { name: '24x7 Support', included: true },
      { name: 'Professional Charts', included: true },
      { name: 'Trading Alerts', included: true },
      { name: 'Trading Central Bronze', included: true },
      { name: 'No Bonus', included: false },
      { name: 'No Live Trading With Experts', included: false },
      { name: 'No SMS & Email Alerts', included: false },
    ],
    current: true,
  },
  {
    name: 'SILVER',
    price: '$1,500',
    color: 'silver',
    borderColor: 'border-silver',
    bgColor: 'bg-silver',
    features: [
      { name: '24x7 Support', included: true },
      { name: 'Professional Charts', included: true },
      { name: 'Trading Alerts', included: true },
      { name: 'Trading Central Silver', included: true },
      { name: '$500 USD Bonus', included: true },
      { name: 'No Live Trading With Experts', included: false },
      { name: 'No SMS & Email Alerts', included: false },
    ],
    current: false,
  },
  {
    name: 'GOLD',
    price: '$3,000',
    color: 'gold',
    borderColor: 'border-gold',
    bgColor: 'bg-gold',
    features: [
      { name: '24x7 Support', included: true },
      { name: 'Professional Charts', included: true },
      { name: 'Trading Alerts', included: true },
      { name: 'Trading Central Gold', included: true },
      { name: '$850 USD Bonus', included: true },
      { name: 'Live Trading With Experts', included: true },
      { name: 'SMS & Email Alerts', included: true },
    ],
    current: false,
  },
  {
    name: 'PLATINUM',
    price: '$4,500',
    color: 'platinum',
    borderColor: 'border-platinum',
    bgColor: 'bg-platinum',
    features: [
      { name: '24x7 Support', included: true },
      { name: 'Professional Charts', included: true },
      { name: 'Trading Alerts', included: true },
      { name: 'Trading Central Gold', included: true },
      { name: '$1,500 USD Bonus', included: true },
      { name: 'Live Trading With Experts', included: true },
      { name: 'SMS & Email Alerts', included: true },
    ],
    current: false,
  },
  {
    name: 'DIAMOND',
    price: '$5,000',
    color: 'diamond',
    borderColor: 'border-diamond',
    bgColor: 'bg-diamond',
    features: [
      { name: '24x7 Support', included: true },
      { name: 'Professional Charts', included: true },
      { name: 'Trading Alerts', included: true },
      { name: 'Trading Central Gold', included: true },
      { name: '$35,000 USD Bonus', included: true },
      { name: 'Live Trading With Experts', included: true },
    ],
    current: false,
  },
];

export default function UpgradeAccount() {
  const { toast } = useToast();

  const handleUpgrade = (tierName: string) => {
    if (tierName === 'BRONZE') {
      toast({ 
        title: 'Account Activation', 
        description: 'Please contact customer care for account activation.',
        variant: 'default' 
      });
    } else {
      toast({ 
        title: 'Upgrade Request', 
        description: `Please contact customer care to upgrade to ${tierName} plan.`,
        variant: 'default' 
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Upgrade Account</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div key={tier.name} className={`bg-tesla-surface rounded-lg p-6 border-2 ${tier.borderColor}`}>
            <div className="text-center mb-4">
              <h3 className={`text-xl font-bold text-${tier.color} mb-2`}>{tier.name}</h3>
              <div className="text-3xl font-bold mb-2">{tier.price}</div>
            </div>
            
            <div className="space-y-3 mb-6">
              {tier.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {feature.included ? (
                    <Check className="text-profit-green flex-shrink-0" size={16} />
                  ) : (
                    <X className="text-loss-red flex-shrink-0" size={16} />
                  )}
                  <span className="text-sm">{feature.name}</span>
                </div>
              ))}
            </div>
            
            <Button
              onClick={() => handleUpgrade(tier.name)}
              disabled={tier.current}
              className={`w-full ${tier.bgColor} text-black py-3 rounded-lg font-semibold transition-opacity ${
                tier.current ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
              }`}
            >
              {tier.current ? 'Current Plan' : 'Upgrade Plan'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
