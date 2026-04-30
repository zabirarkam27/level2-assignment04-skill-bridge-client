"use client";

import { useEffect, useState } from "react";
import { useSessionContext } from "@/context/SessionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";
import { User, Save, Camera } from "lucide-react";

export default function StudentProfilePage() {
  const { user, refetch } = useSessionContext();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, image }),
        },
      );
      if (!res.ok) throw new Error("Failed");
      await refetch();
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <User className="w-6 h-6 text-[#611f69] dark:text-[#c084fc]" />
          My Profile
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Update your personal information
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#611f69]/20 dark:ring-[#c084fc]/20">
            {image ? (
              <Image src={image} alt="avatar" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#611f69]/10 dark:bg-[#c084fc]/10">
                <User className="w-10 h-10 text-[#611f69] dark:text-[#c084fc]" />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <Camera className="w-3.5 h-3.5" /> Paste image URL below
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Full Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email
            </label>
            <Input value={user?.email || ""} disabled className="opacity-60" />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Profile Picture URL
            </label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Role
            </label>
            <div className="h-10 flex items-center px-3 rounded-md border border-input bg-gray-50 dark:bg-gray-700 text-sm capitalize opacity-60">
              {user?.role?.toLowerCase()}
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-[#611f69] text-white hover:bg-[#4a174f] dark:bg-[#c084fc] dark:text-black dark:hover:bg-[#d8b4fe]"
        >
          {saving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
