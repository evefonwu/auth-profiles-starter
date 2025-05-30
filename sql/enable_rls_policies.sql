
-- Enable Row Level Security

-- Enable RLS on profiles table 
alter table profiles enable row level security;

-- Add policies 
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);
