import React, { useState, useEffect } from 'react';
import { CheckCircle, Calendar, TrendingUp, ChevronDown, ChevronUp, Star, Timer } from 'lucide-react';

const UserPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPreviousPlans, setShowPreviousPlans] = useState(false);

  const handleUpgrade = () => {
    navigate('/pricing-plan');
  };

  useEffect(() => {
    setTimeout(() => {
      setPlans([
        {
          id: 1,
          name: "Premium Plan",
          description: "Advanced features for professionals with unlimited access",
          startDate: "2023-10-15",
          expiryDate: "2023-12-25",
          status: "active",
          price: "$19.99/month",
          features: ["Unlimited Projects", "Priority Support", "Advanced Analytics", "Custom Domain"]
        },
        {
          id: 2,
          name: "Basic Plan",
          description: "Perfect for getting started",
          startDate: "2023-08-01",
          expiryDate: "2023-10-14",
          status: "expired",
          price: "$9.99/month",
          features: ["5 Projects", "Email Support", "Basic Analytics"]
        },
        {
          id: 3,
          name: "Free Trial",
          description: "7-day trial with limited features",
          startDate: "2023-07-20",
          expiryDate: "2023-07-27",
          status: "expired",
          price: "Free",
          features: ["1 Project", "Basic Support"]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getCurrentPlan = () => plans.find(plan => plan.status === 'active');
  const getPreviousPlans = () => plans.filter(plan => plan.status === 'expired');

  const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-pink-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-pink-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-lg text-pink-600 font-semibold">Loading your plans...</p>
        </div>
      </div>
    );
  }

  const currentPlan = getCurrentPlan();
  const previousPlans = getPreviousPlans();
  const hasCurrentPlan = !!currentPlan;
  const hasPreviousPlans = previousPlans.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header Section */}
        <header className="text-center mb-2">
          <div className="inline-block mb-2">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              SUBSCRIPTION MANAGEMENT
            </div>
          </div>
          <h1 className="text-1xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-600 via-pink-500 to-pink-700 bg-clip-text text-transparent mb-3">
            My Subscription
          </h1>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Manage your current plan and unlock premium features
          </p>
        </header>
        
        {/* Current Active Plan Section */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Star className="w-6 h-6 text-pink-600 mr-5" />
            <h2 className="text-2xl font-bold text-gray-800">Current Plan</h2>
          </div>

          {hasCurrentPlan ? (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100 hover:shadow-pink-200 transition-all duration-300 hover:scale-[1]">
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 px-6 py-2 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-2xl font-bold text-white ">{currentPlan.name}</h3>
                      <p className="text-pink-100 text-sm">{currentPlan.description}</p>
                    </div>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="text-gray-600 font-bold text-sm">ACTIVE</span>
                    </div>
                  </div>
                  <div className="text-1xl font-extrabold text-white">{currentPlan.price}</div>
                </div>
              </div>

              {/* Plan Details */}
              <div className="px-8 py-5 cursor-pointer">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-xl border-l-4 border-pink-500 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-pink-600 mr-2" />
                      <span className="text-sm text-gray-600 font-semibold">Start Date</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">{formatDate(currentPlan.startDate)}</span>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-xl border-l-4 border-pink-500 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-pink-600 mr-2" />
                      <span className="text-sm text-gray-600 font-semibold">Expiry Date</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">{formatDate(currentPlan.expiryDate)}</span>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border-l-4 border-orange-500 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <Timer className="w-5 h-5 text-orange-600 mr-2" />
                      <span className="text-sm text-gray-600 font-semibold">Days Remaining</span>
                    </div>
                    <span className="text-2xl font-extrabold text-orange-600">
                      {getDaysRemaining(currentPlan.expiryDate)} days
                    </span>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-l-4 border-green-500 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm text-gray-600 font-semibold">Status</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">Active & Running</span>
                  </div>
                </div>

                {/* Features Section */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-pink-600 mb-5 flex items-center">
                    <Star className="w-6 h-6 mr-2" />
                    Plan Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentPlan.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-center bg-gradient-to-r from-pink-50 to-white p-4 rounded-lg border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all duration-300"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-pink-600 hover:to-pink-700 hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
                  >
                    <span className="flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 mr-2" onClick={handleUpgrade} />
                      Upgrade Plan
                    </span>
                  </button>
                  <button 
                    className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-pink-500 hover:to-pink-600 hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
                  >
                    Manage Subscription
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* No Active Plan State */
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center border-2 border-pink-200 hover:border-pink-300 transition-all duration-300">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-5xl">📭</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">No Active Plan</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                You don't have any active subscription. Choose a plan to unlock premium features!
              </p>
              
              <button  onClick={handleUpgrade}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:from-pink-600 hover:to-pink-700 hover:shadow-xl hover:scale-105 transition-all duration-300 transform text-lg"
              >
                Browse Plans
              </button>

              {hasPreviousPlans && (
                <button
                  className="mt-6 text-pink-600 font-semibold border-2 border-pink-600 py-3 px-6 rounded-xl hover:bg-pink-600 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 transform"
                  onClick={() => setShowPreviousPlans(!showPreviousPlans)}
                >
                  {showPreviousPlans ? 'Hide' : 'Show'} Previous Plans
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Previous Plans Section */}
        {(showPreviousPlans || !hasCurrentPlan) && hasPreviousPlans && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-gray-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-800">Previous Plans</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousPlans.map(plan => (
                <div 
                  key={plan.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-5 relative">
                    <div className="absolute top-3 right-3 bg-red-100 px-3 py-1 rounded-full">
                      <span className="text-red-700 font-bold text-xs">EXPIRED</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mt-2">{plan.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <span className="text-gray-600 flex items-center text-sm">
                          <TrendingUp className="w-4 h-4 mr-2 text-pink-500" />
                          Price
                        </span>
                        <strong className="text-gray-800 font-bold">{plan.price}</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-pink-500" />
                          Expired on
                        </span>
                        <strong className="text-red-500 text-sm">{formatDate(plan.expiryDate)}</strong>
                      </div>
                    </div>

                    <button  onClick={handleUpgrade}
                      className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-pink-700 hover:shadow-lg hover:scale-105 transition-all duration-300 transform cursor-pointer"
                    >
                      Renew Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toggle Button for Previous Plans */}
        {hasCurrentPlan && hasPreviousPlans && (
          <div className="text-center">
            <button
              className="inline-flex items-center text-pink-600 font-bold border-2 border-pink-600 py-3 px-8 rounded-xl hover:bg-pink-600 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 transform"
              onClick={() => setShowPreviousPlans(!showPreviousPlans)}
            >
              {showPreviousPlans ? (
                <>
                  <ChevronUp className="w-5 h-5 mr-2" />
                  Hide Previous Plans ({previousPlans.length})
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 mr-2" />
                  Show Previous Plans ({previousPlans.length})
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPlans;
            