"use client";

import { useEffect, useState } from "react";
import { useSessionContext } from "@/context/SessionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { User, Save, Plus, X, DollarSign } from "lucide-react";
import Image from "next/image";

interface TutorProfile {
  bio: string;
  subjects: string[];
  price: number;
  image?: string;
}

export default function TutorProfilePage() {
  const { user } = useSessionContext();
  const [profile, setProfile] = useState<TutorProfile>({
    bio: "",
    subjects: [],
    price: 0,
    image: "",
  });
  const [newSubject, setNewSubject] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/mentors/profile/me`,
          { credentials: "include" },
        );
        const data = await res.json();
        if (data.data) setProfile(data.data);
      } catch {
        /* no existing profile yet */
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const addSubject = () => {
    const s = newSubject.trim();
    if (s && !profile.subjects.includes(s)) {
      setProfile((p) => ({ ...p, subjects: [...p.subjects, s] }));
      setNewSubject("");
    }
  };

  const removeSubject = (s: string) => {
    setProfile((p) => ({ ...p, subjects: p.subjects.filter((x) => x !== s) }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { image: _image, ...profileData } = profile;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mentors/profile`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        },
      );
      if (!res.ok) throw new Error("Failed");
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-8 h-8 border-4 border-[#611f69] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <User className="w-6 h-6 text-[#611f69] dark:text-[#c084fc]" />
          Tutor Profile
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your public tutor profile
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm space-y-5">
        {/* Avatar preview */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-[#611f69]/20">
            {profile.image ? (
              <Image src={profile.image} alt="avatar" width={64} height={64} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full bg-[#611f69]/10 flex items-center justify-center">
                <User className="w-7 h-7 text-[#611f69]" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Profile Image URL
            </label>
            <Input
              value={profile.image || ""}
              onChange={(e) => setProfile((p) => ({ ...p, image: e.target.value }))}
              placeholder="https://..."
              className="text-sm"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Bio
          </label>
          <Textarea
            value={profile.bio}
            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            placeholder="Tell students about yourself, your teaching style, experience..."
            rows={4}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Hourly Rate (৳)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="number"
              value={profile.price}
              onChange={(e) => setProfile((p) => ({ ...p, price: Number(e.target.value) }))}
              className="pl-9"
              placeholder="500"
              min={0}
            />
          </div>
        </div>

        {/* Subjects */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Subjects
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
              placeholder="Add subject (press Enter)"
              className="flex-1 text-sm"
            />
            <Button
              type="button"
              onClick={addSubject}
              size="sm"
              className="bg-[#611f69] text-white hover:bg-[#4a174f] dark:bg-[#c084fc] dark:text-black"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.subjects.map((s) => (
              <span
                key={s}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-[#611f69]/10 text-[#611f69] dark:bg-[#c084fc]/20 dark:text-[#e9d5ff]"
              >
                {s}
                <button onClick={() => removeSubject(s)} className="ml-1 hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {profile.subjects.length === 0 && (
              <p className="text-xs text-gray-400">No subjects added yet</p>
            )}
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-[#611f69] text-white hover:bg-[#4a174f] dark:bg-[#c084fc] dark:text-black dark:hover:bg-[#d8b4fe]"
        >
          {saving ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Profile</>}
        </Button>
      </div>
    </div>
  );
}
