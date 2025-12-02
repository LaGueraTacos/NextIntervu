'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function ProfileSetupPage() {
  const router = useRouter();
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
  const [isLoadingEmail, setIsLoadingEmail] = useState(true);

  // Get email and name from Supabase session, URL params, or localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First, try to get email and name from Supabase session (for OAuth users)
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const updates: { email?: string; name?: string } = {};
          
          // Get email
          if (session.user.email) {
            updates.email = session.user.email;
          }
          
          // Get name from user metadata (Google OAuth provides full_name)
          const fullName = session.user.user_metadata?.full_name || 
                          session.user.user_metadata?.name ||
                          (session.user.user_metadata?.given_name && session.user.user_metadata?.family_name
                            ? `${session.user.user_metadata.given_name} ${session.user.user_metadata.family_name}`
                            : null);
          
          if (fullName) {
            updates.name = fullName;
          }
          
          if (updates.email || updates.name) {
            setFormData(prev => ({ ...prev, ...updates }));
          }
          
          setIsLoadingEmail(false);
          return;
        }

        // Fallback to URL params
        const urlParams = new URLSearchParams(window.location.search);
        const emailFromUrl = urlParams.get('email');
        const nameFromUrl = urlParams.get('name');
        if (emailFromUrl || nameFromUrl) {
          setFormData(prev => ({ 
            ...prev, 
            ...(emailFromUrl && { email: emailFromUrl }),
            ...(nameFromUrl && { name: nameFromUrl })
          }));
          setIsLoadingEmail(false);
          return;
        }

        // Fallback to localStorage (for email signup users)
        const emailFromStorage = localStorage.getItem('userEmail');
        const nameFromStorage = localStorage.getItem('userName');
        if (emailFromStorage || nameFromStorage) {
          setFormData(prev => ({ 
            ...prev, 
            ...(emailFromStorage && { email: emailFromStorage }),
            ...(nameFromStorage && { name: nameFromStorage })
          }));
          setIsLoadingEmail(false);
          return;
        }

        setIsLoadingEmail(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoadingEmail(false);
      }
    };

    fetchUserData();
  }, []);

  // Auto-scroll to form section once email is loaded
  useEffect(() => {
    if (!isLoadingEmail) {
      // Small delay to ensure form is rendered
      const timer = setTimeout(() => {
        const formSection = document.getElementById('profile-form-section');
        if (formSection) {
          // Calculate offset for navigation bar (approximately 80px)
          const offset = 80;
          const elementPosition = formSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Focus the first input field after scroll completes
          setTimeout(() => {
            const firstInput = document.getElementById('role') as HTMLSelectElement;
            if (firstInput && !formData.role) {
              // Don't auto-focus on mobile devices to avoid keyboard popup
              if (window.innerWidth >= 768) {
                firstInput.focus();
              }
            }
          }, 600);
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [isLoadingEmail, formData.role]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before submission
    if (!formData.email) {
      setErrors({ 
        submit: 'Email is required. Please refresh the page or sign in again.' 
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting profile data:', formData);
      
      // Save profile data
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('API response:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save profile');
      }

      setIsSuccess(true);
      
    } catch (error) {
      console.error('Profile save error:', error);
      setErrors({ 
        submit: error instanceof Error ? error.message : 'Failed to save profile' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
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
              Profile Complete!{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Ready to practice?
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
              Your profile has been saved. You&apos;re now ready to start practicing with AI-powered interview questions tailored to your role and experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => router.push('/dashboard')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-5 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Start Your First Interview
              </button>
              <button 
                onClick={() => router.push('/pricing')}
                className="border-2 border-slate-600 text-slate-300 px-10 py-5 rounded-lg text-lg font-semibold hover:border-slate-500 hover:text-white hover:bg-slate-800/20 transition-all duration-200"
              >
                View Pricing Plans
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
                  src="/logo/intervu (3).png"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <Navigation />

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-slate-800/50 border border-slate-600 mb-4 sm:mb-6">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-300 text-xs sm:text-sm font-medium">Account created successfully</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6 tracking-tight">
              Quick setup for{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                better questions
              </span>
            </h1>
          
          </div>

          {/* Profile Setup Form */}
          <div id="profile-form-section" className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600/50 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-display font-bold text-white mb-2">Complete your profile</h2>
              <p className="text-slate-400 text-sm">All fields are optional - you can skip and add them later</p>
            </div>

            {/* Email Loading/Error State */}
            {isLoadingEmail && (
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-blue-400 text-sm text-center flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading your account information...
                </p>
              </div>
            )}

            {!isLoadingEmail && !formData.email && (
              <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-400 text-sm text-center">
                  Unable to detect your email. Please make sure you&apos;re signed in or refresh the page.
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Email (Hidden field for API) */}
              <input
                type="hidden"
                name="email"
                value={formData.email}
              />
              
              {/* Name (Hidden field for API) */}
              <input
                type="hidden"
                name="name"
                value={formData.name}
              />
              
              {/* Role and Experience - Core Fields */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Target Role */}
                <div className="space-y-2">
                  <label htmlFor="role" className="flex flex-col gap-1">
                    <span className="text-white font-semibold text-base">Target Role</span>
                    <span className="text-slate-400 text-xs font-normal">Helps tailor questions to your career goals</span>
                  </label>
                  <div className="relative">
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-700/60 border-2 border-slate-600/80 text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 hover:border-slate-500 transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-800">Select your target role</option>
                      <optgroup label="Technology" className="bg-slate-800 text-slate-300 font-semibold">
                        {['Software Engineer', 'DevOps Engineer', 'Data Scientist', 'Data Analyst'].map(role => (
                          <option key={role} value={role} className="bg-slate-700 text-white font-normal py-2">{role}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Product & Design" className="bg-slate-800 text-slate-300 font-semibold">
                        {['Product Manager', 'UX Designer'].map(role => (
                          <option key={role} value={role} className="bg-slate-700 text-white font-normal py-2">{role}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Business & Operations" className="bg-slate-800 text-slate-300 font-semibold">
                        {['Business Analyst', 'Project Manager', 'Operations Manager', 'Operations Analyst', 'Business Development', 'Consultant'].map(role => (
                          <option key={role} value={role} className="bg-slate-700 text-white font-normal py-2">{role}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Marketing & Sales" className="bg-slate-800 text-slate-300 font-semibold">
                        {['Marketing Manager', 'Marketing Analyst', 'Sales Representative', 'Account Manager', 'Customer Success Manager', 'Content Manager'].map(role => (
                          <option key={role} value={role} className="bg-slate-700 text-white font-normal py-2">{role}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Finance & HR" className="bg-slate-800 text-slate-300 font-semibold">
                        {['Financial Analyst', 'HR Manager'].map(role => (
                          <option key={role} value={role} className="bg-slate-700 text-white font-normal py-2">{role}</option>
                        ))}
                      </optgroup>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                  <label htmlFor="experience" className="flex flex-col gap-1">
                    <span className="text-white font-semibold text-base">Experience Level</span>
                    <span className="text-slate-400 text-xs font-normal">Adjusts question difficulty and depth</span>
                  </label>
                  <div className="relative">
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-700/60 border-2 border-slate-600/80 text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 hover:border-slate-500 transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-800">Select experience level</option>
                      {experienceLevels.map(level => (
                        <option key={level} value={level} className="bg-slate-700 text-white font-normal py-2">{level}</option>
                      ))}
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label htmlFor="company" className="flex flex-col gap-1">
                  <span className="text-white font-semibold text-base">
                    Target Company{' '}
                    <span className="text-slate-400 text-sm font-normal">(Optional)</span>
                  </span>
                  <span className="text-slate-400 text-xs font-normal">Get company-specific interview questions</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-700/60 border-2 border-slate-600/80 text-white text-base font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 hover:border-slate-500 transition-all duration-200"
                    placeholder="e.g., Google, Microsoft, Amazon"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Skills - Expandable Section */}
              <div className="space-y-3">
                <label className="flex flex-col gap-1">
                  <span className="text-white font-semibold text-base">Current Skills</span>
                  <span className="text-slate-400 text-xs font-normal">Pick 2-3 key skills for personalized feedback</span>
                </label>
                {formData.role ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                      {getSkillsForRole().map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            formData.skills.includes(skill)
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-2 border-blue-400 shadow-md shadow-blue-500/20 scale-[1.02]'
                              : 'bg-slate-700/60 text-slate-300 border-2 border-slate-600/80 hover:bg-slate-600/60 hover:border-slate-500 hover:text-white'
                          }`}
                        >
                          {formData.skills.includes(skill) && (
                            <svg className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                          {skill}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                      <span className="text-slate-300 text-sm font-medium">
                        Selected: <span className="text-white font-semibold">{formData.skills.length}</span> {formData.skills.length === 1 ? 'skill' : 'skills'}
                      </span>
                      {formData.skills.length > 0 && (
                        <span className="flex items-center text-green-400 text-sm font-medium">
                          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Great choice!
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-slate-400 text-sm p-5 rounded-xl bg-slate-700/40 border-2 border-slate-600/50 border-dashed">
                    <svg className="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Select a target role above to see relevant skills for your field</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
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
                      Saving Profile...
                    </div>
                  ) : (
                    'Save & Start Practicing'
                  )}
                </button>

                
              </div>

              {/* Submit Error Display */}
              {errors.submit && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm text-center">{errors.submit}</p>
                </div>
              )}
            </form>
          </div>

          {/* Benefits */}
          {/* <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-600/20 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-4 sm:mb-6">AI-Powered Questions</h3>
              <p className="text-slate-300 font-medium leading-relaxed text-sm sm:text-base">Get role-specific interview questions tailored to your target company and position</p>
            </div>
            
            <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-600/20 border border-slate-600/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-4 sm:mb-6">Instant Feedback</h3>
              <p className="text-slate-300 font-medium leading-relaxed text-sm sm:text-base">Receive structured feedback on structure, clarity, and relevance using the STAR method</p>
            </div>
            
            <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-600/20 border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-4 sm:mb-6">Progress Tracking</h3>
              <p className="text-slate-300 font-medium leading-relaxed text-sm sm:text-base">Save your sessions and track your improvement over time with detailed analytics</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
