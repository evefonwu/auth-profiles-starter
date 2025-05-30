"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/lib/types/database";

interface DashboardProps {
  profile: Profile;
}

export function Dashboard({ profile }: DashboardProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error signing out:", error);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
    }
  };
  const displayName = profile.full_name || profile.email;
  const initials =
    profile.full_name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || profile.email[0].toUpperCase();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={profile.avatar_url || undefined}
                  alt="profile image"
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  Welcome, {displayName}!
                </CardTitle>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="my-5 md:my-0"
            >
              Sign Out
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/profile">View Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
