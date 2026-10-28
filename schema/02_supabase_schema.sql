-- ============================================================================
-- Learning Point — Supabase PostgreSQL Authoritative Schema
-- Handles Identity, Authoritative Sessions, Courses, Payments & Access Control
-- ============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Student Profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  phone text unique not null,
  full_name text not null,
  avatar_url text,
  target_exam text,
  state text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 2. Authoritative Active Sessions (Single Active Login Enforcement)
create table if not exists public.active_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  session_token text unique not null,
  device_info text,
  ip_address text,
  is_active boolean default true not null,
  created_at timestamptz default now() not null,
  last_seen_at timestamptz default now() not null
);

create index if not exists idx_active_sessions_user on public.active_sessions(user_id, is_active);

-- 3. Staff Roles & Permissions (Super Admin, Question Reviewer, Finance, Support)
create table if not exists public.staff_roles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  role text not null check (role in ('super_admin', 'admin', 'course_manager', 'paper_manager', 'question_reviewer', 'test_manager', 'student_support', 'finance_manager', 'content_editor', 'read_only_analyst')),
  granted_by uuid references auth.users(id),
  granted_at timestamptz default now() not null,
  unique(user_id, role)
);

-- 4. Courses & Batches
create table if not exists public.courses (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  tagline text,
  description text,
  category text not null, -- 'agriculture', 'upsc', 'banking', etc.
  thumbnail_url text,
  price_inr numeric(10, 2) not null default 0,
  offer_price_inr numeric(10, 2),
  validity_days integer default 365,
  is_published boolean default false not null,
  is_featured boolean default false not null,
  features jsonb default '[]'::jsonb,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 5. Course Batches
create table if not exists public.batches (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references public.courses(id) on delete cascade not null,
  batch_name text not null,
  start_date timestamptz not null,
  end_date timestamptz,
  max_seats integer,
  is_active boolean default true not null
);

-- 6. Student Enrollments & Course Entitlements
create table if not exists public.enrollments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  batch_id uuid references public.batches(id) on delete set null,
  status text not null default 'active' check (status in ('active', 'expired', 'revoked')),
  valid_from timestamptz default now() not null,
  valid_until timestamptz not null,
  created_at timestamptz default now() not null,
  unique(user_id, course_id)
);

create index if not exists idx_enrollments_user on public.enrollments(user_id, status);

-- 7. Payment Orders (Razorpay Integration)
create table if not exists public.payment_orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  razorpay_order_id text unique not null,
  razorpay_payment_id text,
  amount_inr numeric(10, 2) not null,
  fee_inr numeric(10, 2) default 0,
  tax_inr numeric(10, 2) default 0,
  discount_inr numeric(10, 2) default 0,
  coupon_code text,
  status text not null default 'created' check (status in ('created', 'attempted', 'paid', 'failed', 'refunded')),
  receipt_number text unique not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index if not exists idx_payment_orders_user on public.payment_orders(user_id);
create index if not exists idx_payment_orders_rzp on public.payment_orders(razorpay_order_id);

-- 8. Question Reports (Flagging errors during/after exam)
create table if not exists public.question_reports (
  id uuid primary key default uuid_generate_v4(),
  question_id text not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  attempt_id text,
  issue_type text not null check (issue_type in ('incorrect_answer', 'incorrect_explanation', 'ambiguous_wording', 'typo', 'duplicate_question', 'missing_image', 'other')),
  description text not null,
  status text not null default 'pending' check (status in ('pending', 'under_review', 'resolved', 'rejected')),
  resolution_notes text,
  resolved_by uuid references auth.users(id),
  resolved_at timestamptz,
  created_at timestamptz default now() not null
);

-- 9. Privileged Audit Logs
create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references auth.users(id),
  action text not null,
  resource_type text not null,
  resource_id text not null,
  metadata jsonb,
  ip_address text,
  created_at timestamptz default now() not null
);

-- ----------------------------------------------------------------------------
-- Row-Level Security (RLS) Configuration
-- ----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.active_sessions enable row level security;
alter table public.enrollments enable row level security;
alter table public.payment_orders enable row level security;
alter table public.question_reports enable row level security;

-- Profiles: Students can read and update their own profile only
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Enrollments: Students can view their own enrollments
create policy "Users can view own enrollments" on public.enrollments
  for select using (auth.uid() = user_id);

-- Payment Orders: Students can view their own receipts
create policy "Users can view own orders" on public.payment_orders
  for select using (auth.uid() = user_id);

-- Public courses: Anyone can read published courses
alter table public.courses enable row level security;
create policy "Public can view published courses" on public.courses
  for select using (is_published = true);
