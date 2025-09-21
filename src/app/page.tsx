'use client';

import Image from "next/image";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <Navigation />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
              Ace your next interview with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                AI-powered practice
              </span>
            </h1>
            
            {/* Trust Badge */}
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-slate-800/50 border border-slate-600 mb-6 sm:mb-8">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-300 text-xs sm:text-sm font-medium">For Job Seekers. Get ready for your next interview.</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button 
                onClick={() => window.location.href = '/signup'}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-lg text-base sm:text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Start Free Practice Session
              </button>
            </div>
            
            {/* Free Trial Badge */}
            <div className="mt-6 sm:mt-8 text-slate-400 text-xs sm:text-sm">
              <span className="inline-flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Join the Waitlist
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 py-16 sm:py-20 lg:py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6 tracking-tight">Why Choose NextIntervu?</h2>
            <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto">Everything you need to prepare for your next interview</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-600/20 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-4 sm:mb-6">AI-Powered Questions</h3>
              <p className="text-slate-300 font-medium leading-relaxed text-sm sm:text-base">Get role-specific interview questions tailored to your target company and position.</p>
            </div>

            <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-600/20 border border-slate-600/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-4 sm:mb-6">Instant Feedback</h3>
              <p className="text-slate-300 font-medium leading-relaxed text-sm sm:text-base">Receive structured feedback on structure, clarity, and relevance using the STAR method.</p>
            </div>

            <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-600/20 border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-4 sm:mb-6">Progress Tracking</h3>
              <p className="text-slate-300 font-medium leading-relaxed text-sm sm:text-base">Save your sessions and track your improvement over time with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 py-24 bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6 tracking-tight">How It Works</h2>
            <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto">Get interview-ready in just 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-6">Tell Us About Your Role</h3>
              <p className="text-slate-300 font-medium leading-relaxed max-w-sm mx-auto">Enter your target company, job title, experience level, and select relevant skills.</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-6">Practice with AI</h3>
              <p className="text-slate-300 font-medium leading-relaxed max-w-sm mx-auto">Answer tailored interview questions and receive instant AI-powered feedback.</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-6">Track Your Progress</h3>
              <p className="text-slate-300 font-medium leading-relaxed max-w-sm mx-auto">Review your sessions, see your improvement, and get ready to ace your interview.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 mb-8">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-400 text-sm font-medium">Join 10,000+ successful job seekers</span>
          </div> */}
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-8 tracking-tight">Ready to Land Your Dream Job?</h2>
          <p className="text-xl text-slate-300 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
            Start practicing today with NextIntervu.
          </p>
          
          {/* Urgency Element */}
          <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 mb-8 max-w-md mx-auto">
            <div className="text-slate-300 text-sm mb-2">Limited Time Offer</div>
            <div className="text-white font-semibold text-lg">Get 50% off your first month</div>
            <div className="text-slate-400 text-sm mt-1">Offer expires in 7 days</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => window.location.href = '/signup'}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-12 py-6 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Start Free Trial Now
            </button>
            {/* <button className="border-2 border-slate-600 text-slate-300 px-12 py-6 rounded-lg text-lg font-semibold hover:border-slate-500 hover:text-white hover:bg-slate-800/50 transition-all duration-200 hover:scale-105">
              Schedule Demo Call
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

      {/* Footer */}
      <footer className="px-6 py-12 bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Brand */}
            <div className="flex items-center mb-6 md:mb-0">
          <Image
                  src="/logo/intervu (2).png"
                  alt="NextIntervu Logo"
                  width={120}
                  height={66}
                  className="object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                />
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-8 text-sm">
              <a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors">How it Works</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" onClick={() => window.location.href = '/pricing'}>Pricing</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 pt-8 border-t border-slate-700 text-center">
            <p className="text-slate-400 text-sm">
              &copy; 2025 NextIntervu. Made for job seekers to ace their next interview.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}