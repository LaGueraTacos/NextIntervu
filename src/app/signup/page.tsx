'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: '',
    experience: '',
    company: '',
    skills: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
  
  const roleSkillMap: Record<string, string[]> = {
    'Software Engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Git', 'Docker', 'Agile', 'Problem Solving'],
    'Product Manager': ['Product Strategy', 'User Research', 'Analytics', 'Agile', 'Leadership', 'Communication', 'Data Analysis', 'Roadmapping', 'Stakeholder Management', 'Design Thinking'],
    'Data Scientist': ['Python', 'Machine Learning', 'SQL', 'Statistics', 'R', 'TensorFlow', 'Data Analysis', 'Visualization', 'Big Data', 'Deep Learning'],
    'Marketing Manager': ['Digital Marketing', 'SEO/SEM', 'Analytics', 'Content Strategy', 'Social Media', 'Email Marketing', 'Brand Management', 'Campaign Management', 'ROI Analysis', 'Market Research'],
    'Sales Representative': ['Sales Strategy', 'CRM', 'Lead Generation', 'Negotiation', 'Communication', 'Relationship Building', 'Cold Calling', 'Pipeline Management', 'Closing', 'Customer Success'],
    'UX Designer': ['User Research', 'Wireframing', 'Prototyping', 'Figma', 'Design Thinking', 'Usability Testing', 'Information Architecture', 'Visual Design', 'Interaction Design', 'Accessibility'],
    'Business Analyst': ['Requirements Analysis', 'Process Improvement', 'Data Analysis', 'SQL', 'Excel', 'Project Management', 'Stakeholder Management', 'Documentation', 'Agile', 'Business Process Modeling'],
    'Project Manager': ['Project Planning', 'Agile', 'Scrum', 'Risk Management', 'Budget Management', 'Team Leadership', 'Communication', 'Timeline Management', 'Resource Allocation', 'Quality Assurance'],
    'DevOps Engineer': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Python', 'Monitoring', 'Infrastructure', 'Security', 'Automation'],
    'Data Analyst': ['SQL', 'Excel', 'Python', 'Tableau', 'Power BI', 'Statistics', 'Data Visualization', 'Reporting', 'Analytics', 'Business Intelligence'],
    'HR Manager': ['Recruitment', 'Employee Relations', 'Performance Management', 'HRIS', 'Compliance', 'Training & Development', 'Compensation', 'Benefits Administration', 'Leadership', 'Communication'],
    'Financial Analyst': ['Financial Modeling', 'Excel', 'SQL', 'Accounting', 'Budgeting', 'Forecasting', 'Risk Analysis', 'Investment Analysis', 'Reporting', 'Data Analysis'],
    'Operations Manager': ['Process Improvement', 'Supply Chain', 'Quality Management', 'Lean Six Sigma', 'Project Management', 'Team Leadership', 'Vendor Management', 'Cost Optimization', 'Performance Metrics', 'Strategic Planning'],
    'Customer Success Manager': ['Customer Relationship Management', 'Account Management', 'Communication', 'Problem Solving', 'Upselling', 'Retention', 'Analytics', 'Training', 'Support', 'Satisfaction'],
    'Content Manager': ['Content Strategy', 'SEO', 'Social Media', 'Copywriting', 'Analytics', 'CMS', 'Brand Management', 'Editorial Planning', 'Digital Marketing', 'Audience Development'],
    'Account Manager': ['Client Relations', 'Account Management', 'Sales', 'Communication', 'Negotiation', 'CRM', 'Revenue Growth', 'Customer Retention', 'Strategic Planning', 'Presentation Skills'],
    'Operations Analyst': ['Data Analysis', 'Process Improvement', 'Excel', 'SQL', 'Reporting', 'Business Intelligence', 'Operations Research', 'Cost Analysis', 'Performance Metrics', 'Automation'],
    'Marketing Analyst': ['Data Analysis', 'Marketing Analytics', 'Excel', 'SQL', 'Google Analytics', 'Campaign Analysis', 'ROI Measurement', 'Market Research', 'Reporting', 'A/B Testing'],
    'Business Development': ['Sales', 'Partnership Development', 'Market Research', 'Strategic Planning', 'Negotiation', 'Lead Generation', 'Relationship Building', 'Revenue Growth', 'Communication', 'Networking'],
    'Consultant': ['Problem Solving', 'Strategic Thinking', 'Communication', 'Project Management', 'Industry Knowledge', 'Client Management', 'Analysis', 'Presentation', 'Change Management', 'Leadership']
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear skills when role changes
    if (name === 'role') {
      setFormData(prev => ({ ...prev, skills: [] }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  // Get skills for the selected role
  const getSkillsForRole = () => {
    return formData.role ? roleSkillMap[formData.role] || [] : [];
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }
    
    if (!formData.experience) {
      newErrors.experience = 'Please select your experience level';
    }
    
    if (formData.skills.length === 0) {
      newErrors.skills = 'Please select at least one skill';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setIsSuccess(true);
      console.log('Successfully added to waitlist:', result.data);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ 
        submit: error instanceof Error ? error.message : 'Failed to submit form' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
    // POST request successful
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
        <Navigation />
        
        {/* Success Section */}
        <section className="px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6 tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                NextIntervu!
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
              You are now on the waitlist! We&apos;ll notify you as soon as we launch.
            </p>
            
            <div className="bg-slate-800/50 backdrop-blur-lg p-8 rounded-2xl border border-slate-600 mb-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-display font-semibold text-white mb-6">What happens next?</h3>
              <ul className="text-slate-300 space-y-4 text-left">
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">Exclusive early access tips and resources</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">Personalized interview prep strategies</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">Priority access to new features and updates</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-5 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Back to Home
              </button>
              <button 
                onClick={() => window.location.href = '/pricing'}
                className="border-2 border-slate-600 text-slate-300 px-10 py-5 rounded-lg text-lg font-semibold hover:border-slate-500 hover:text-white hover:bg-slate-800/20 transition-all duration-200"
              >
                View Pricing
              </button>
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
                <Link href="/#features" className="text-slate-400 hover:text-white transition-colors">Features</Link>
                <Link href="/#how-it-works" className="text-slate-400 hover:text-white transition-colors">How it Works</Link>
                <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 pt-8 border-t border-slate-700 text-center">
              <p className="text-slate-400 text-sm">
                &copy; 2024 NextIntervu. Made for job seekers to ace their next interview.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
// POST request successful
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <Navigation />

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4 sm:mb-6">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-blue-400 text-xs sm:text-sm font-medium">Join the Waitlist</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6 tracking-tight">
              Get Early Access to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                NextIntervu
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
              Be among the first to experience AI-powered interview prep. 
              Get personalized questions, instant feedback, and ace your next interview.
            </p>
          </div>

          {/* Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600/50 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.name ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Role and Experience */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="role" className="block text-white font-semibold mb-2">
                    Target Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.role ? 'border-red-500' : 'border-slate-600'
                    }`}
                  >
                    <option value="">Select your target role</option>
                    <optgroup label="Technology">
                      {['Software Engineer', 'DevOps Engineer', 'Data Scientist', 'Data Analyst'].map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Product & Design">
                      {['Product Manager', 'UX Designer'].map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Business & Operations">
                      {['Business Analyst', 'Project Manager', 'Operations Manager', 'Operations Analyst', 'Business Development', 'Consultant'].map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Marketing & Sales">
                      {['Marketing Manager', 'Marketing Analyst', 'Sales Representative', 'Account Manager', 'Customer Success Manager', 'Content Manager'].map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Finance & HR">
                      {['Financial Analyst', 'HR Manager'].map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </optgroup>
                  </select>
                  {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
                </div>

                <div>
                  <label htmlFor="experience" className="block text-white font-semibold mb-2">
                    Experience Level *
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.experience ? 'border-red-500' : 'border-slate-600'
                    }`}
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.experience && <p className="text-red-400 text-sm mt-1">{errors.experience}</p>}
                </div>
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-white font-semibold mb-2">
                  Target Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Google, Microsoft, Amazon"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Relevant Skills * (Select 2-5 skills)
                </label>
                {formData.role ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {getSkillsForRole().map(skill => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.skills.includes(skill)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600/50'
                        } border`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-400 text-sm p-4 rounded-lg bg-slate-700/30 border border-slate-600">
                    Please select a role first to see relevant skills
                  </div>
                )}
                {errors.skills && <p className="text-red-400 text-sm mt-2">{errors.skills}</p>}
                <p className="text-slate-400 text-sm mt-2">
                  Selected: {formData.skills.length} skills
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Joining Waitlist...
                  </div>
                ) : (
                  'Join Waitlist - Get Early Access'
                )}
              </button>

              {/* Submit Error Display */}
              {errors.submit && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm text-center">{errors.submit}</p>
                </div>
              )}

              {/* Trust Signals */}
              <div className="text-center pt-4">
                <p className="text-slate-400 text-sm">
                  <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Your information is secure and will never be shared
                </p>
              </div>
            </form>
          </div>

          {/* Benefits */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-slate-800/30 border border-slate-600/30">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Early Access</h3>
              <p className="text-slate-300 text-sm">Be among the first to try NextIntervu before public launch</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-slate-800/30 border border-slate-600/30">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Exclusive Tips</h3>
              <p className="text-slate-300 text-sm">Get personalized interview prep tips delivered to your inbox</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-slate-800/30 border border-slate-600/30">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Priority Support</h3>
              <p className="text-slate-300 text-sm">Get priority access to new features and customer support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
