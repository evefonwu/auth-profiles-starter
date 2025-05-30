"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/profile-client";
import { Profile } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileEditFormProps {
  profile: Profile;
}

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    full_name: profile.full_name || "",
    avatar_url: profile.avatar_url || "",
  });

  // Generate avatar URL from name
  const generateAvatarUrl = () => {
    const name = formData.full_name.trim();
    if (!name) return;

    const encodedName = encodeURIComponent(name);
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=0D8ABC&color=fff&size=128`;

    setFormData((prev) => ({
      ...prev,
      avatar_url: avatarUrl,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error } = await updateProfile({
        full_name: formData.full_name.trim(),
        avatar_url: formData.avatar_url.trim(),
      });

      if (error) {
        setError(error);
      } else {
        setSuccess(true);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError(`An unexpected error occurred`);
    } finally {
      setLoading(false);
    }
  };

  const initials =
    formData.full_name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || profile.email[0].toUpperCase();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>Profile updated successfully!</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage
                alt="profile image"
                src={formData.avatar_url || undefined}
              />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="text-sm text-muted-foreground">
              <p>Profile preview</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              type="text"
              value={formData.full_name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  full_name: e.target.value,
                }))
              }
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <div className="space-y-2">
              {formData.full_name && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateAvatarUrl}
                >
                  Generate avatar from name
                </Button>
              )}
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
