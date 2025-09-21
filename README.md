# NextIntervu - AI-Powered Interview Prep Platform

NextIntervu is an AI-powered interview preparation platform that helps job seekers practice with tailored questions and receive instant feedback.

## 🚀 Features

- **AI-Powered Questions**: Role-specific interview questions tailored to your target company and position
- **Instant Feedback**: Structured feedback on structure, clarity, and relevance using the STAR method
- **Progress Tracking**: Save sessions and track improvement over time
- **Waitlist System**: Join the waitlist to be notified when we launch

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd nextintervu
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the environment variables in `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Service Role Key for server-side operations
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Set up Supabase

1. Create a new Supabase project
2. Create the `waitlist_signups` table:

```sql
CREATE TABLE public.waitlist_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  experience VARCHAR(50) NOT NULL,
  company VARCHAR(255),
  skills TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS for development (or set up proper policies)
ALTER TABLE public.waitlist_signups DISABLE ROW LEVEL SECURITY;
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (optional)

4. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for server-side operations)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # Waitlist API endpoint
│   ├── pricing/
│   │   └── page.tsx              # Pricing page
│   ├── signup/
│   │   └── page.tsx              # Signup/waitlist page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/
│   └── Navigation.tsx            # Navigation component
└── lib/
    └── supabase.ts               # Supabase client configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.