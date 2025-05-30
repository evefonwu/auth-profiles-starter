import { LoginForm } from "@/components/auth/login-form";
import { Dashboard } from "@/components/dashboard";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/profile-server";

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <LoginForm />
      </main>
    );
  }

  const profile = await getCurrentUserProfile();

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1>Profile Error</h1>
          <p>Unable to load your profile. Please try signing in again.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
        <Dashboard profile={profile} />
      </div>
    </main>
  );
}
