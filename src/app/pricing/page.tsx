'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium' | 'pro'>('premium');
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <Navigation />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Success Plan
              </span>
            </h1>
            {/* Trust Badge */}
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-slate-800/50 border border-slate-600">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-300 text-xs sm:text-sm font-medium">Simple, transparent pricing</span>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Free Plan */}
            <div
              onClick={() => setSelectedPlan('free')}
              role="button"
              tabIndex={0}
              className={`bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border transition-all duration-300 hover:shadow-xl hover:shadow-slate-800/20 h-full flex flex-col ${
                selectedPlan === 'free' ? 'border-2 border-blue-500/50 hover:border-blue-400' : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Free</h3>
                <p className="text-slate-400 mb-6">Perfect for getting started</p>
                <div className="text-4xl font-bold text-white mb-2">$0</div>
                <div className="text-slate-400 text-sm">forever</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  5 daily questions
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Basic feedback (structure only)
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  1 saved transcript
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Role-based questions
                </li>
              </ul>

              <button className="mt-auto w-full py-3 px-6 rounded-xl border-2 border-slate-600 text-slate-300 font-semibold hover:border-slate-500 hover:text-white hover:bg-slate-700/50 transition-all duration-200" onClick={() => window.location.href = '/signup'}>
                Get Started Free
              </button>
            </div>

            {/* Premium Plan - Most Popular */}
            <div
              onClick={() => setSelectedPlan('premium')}
              role="button"
              tabIndex={0}
              className={`bg-gradient-to-br from-blue-500/10 to-indigo-600/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-blue-500/50 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 relative h-full flex flex-col`}
            >
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Premium</h3>
                <p className="text-slate-400 mb-6">For serious job seekers</p>
                <div className="text-4xl font-bold text-white mb-2">$7.99</div>
                <div className="text-slate-400 text-sm">per month</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Unlimited mock interviews
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Full AI feedback (structure + clarity + relevance)
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Role-based skill packs
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Unlimited transcript history
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Progress tracking & analytics
                </li>
              </ul>

              <button className="mt-auto w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105" onClick={() => window.location.href = '/signup'}>
                Start Premium Trial
              </button>
            </div>

            {/* Pro Plan */}
            <div
              onClick={() => setSelectedPlan('pro')}
              role="button"
              tabIndex={0}
              className={`bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl hover:shadow-slate-800/20 h-full flex flex-col ${
                selectedPlan === 'pro' ? 'border-2 border-blue-500/50 hover:border-blue-400' : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Pro</h3>
                <p className="text-slate-400 mb-6">For career professionals</p>
                <div className="text-4xl font-bold text-white mb-2">$14.99</div>
                <div className="text-slate-400 text-sm">per month</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Everything in Premium +
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Early access to new features
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Company-specific question sets
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Advanced analytics & insights
                </li>
              </ul>

              <button
                className="mt-auto w-full py-3 px-6 rounded-xl border-2 border-purple-500 text-purple-400 font-semibold hover:border-purple-400 hover:text-white hover:bg-purple-500/10 transition-all duration-200"
                onClick={() => window.location.href = '/signup'}
              >
                Go Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-300 font-medium">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-3">Can I change plans anytime?</h3>
              <p className="text-slate-300">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we&apos;ll prorate any billing differences.
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-3">What happens to my data if I cancel?</h3>
              <p className="text-slate-300">Your interview transcripts and progress data are saved for 30 days after cancellation. You can reactivate your account anytime during this period.</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-3">Do you offer refunds?</h3>
              <p className="text-slate-300">We offer a 7-day money-back guarantee for all paid plans. If you are not satisfied, contact us within 7 days for a full refund.</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-3">Is there a free trial for paid plans?</h3>
              <p className="text-slate-300">Yes! All paid plans come with a 7-day free trial. No credit card required to start your trial.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-8 tracking-tight">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl text-slate-300 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who have already succeeded with NextIntervu.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => window.location.href = '/signup'}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-12 py-6 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Start Free Trial
            </button>
            {/* <button className="border-2 border-slate-600 text-slate-300 px-12 py-6 rounded-xl text-lg font-semibold hover:border-slate-500 hover:text-white hover:bg-slate-800/50 transition-all duration-200 hover:scale-105">
              Contact Sales
            </button> */}
          </div>
          
          {/* Trust Signals */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure & Private
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancel Anytime
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              24/7 Support
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
