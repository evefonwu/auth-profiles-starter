import { Profile } from "@/lib/types/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Email:</span>
          <span>{profile.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Full Name:</span>
          <span>{profile.full_name || "Not set"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Member Since:</span>
          <span>{new Date(profile.created_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
