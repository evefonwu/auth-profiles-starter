import { getCurrentUserProfile } from "@/lib/profile-server";
import { ProfileCard } from "@/components/profile/profile-card";
import { ProfileEditForm } from "@/components/profile/profile-edit-form";
import { Button } from "@/components/ui/button";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const profile = await getCurrentUserProfile();

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1>Profile Error</h1>
          <p>Unable to load your profile.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Button variant="outline" asChild>
            <Link href="/">← Back to Dashboard</Link>
          </Button>
        </div>

        <div className="grid gap-6">
          <ProfileCard profile={profile} />
          <ProfileEditForm profile={profile} />
        </div>
      </div>
    </main>
  );
}
