import { useState } from "react";
import { User, Mail, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/authStore";

export default function ProfilePage() {
  const { user, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      <div className="border-b border-stone-200 bg-white">
        <div className="container-page py-8">
          <h1 className="text-3xl font-display font-semibold text-stone-950">My Profile</h1>
        </div>
      </div>

      <div className="container-page py-10 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center">
            <User size={28} className="text-stone-500" />
          </div>
          <div>
            <p className="font-semibold text-stone-900">{user?.name ?? "Guest User"}</p>
            <p className="text-sm text-stone-500">{user?.email ?? "Not signed in"}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-stone-200 bg-white flex flex-col gap-5">
            <h2 className="text-sm font-semibold text-stone-900 flex items-center gap-2"><User size={16} /> Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full name" type="text" defaultValue={user?.name} />
              <Input label="Email address" type="email" defaultValue={user?.email} leftIcon={<Mail size={16} />} />
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-stone-200 bg-white flex flex-col gap-5">
            <h2 className="text-sm font-semibold text-stone-900 flex items-center gap-2"><Lock size={16} /> Change Password</h2>
            <Input label="Current password" type="password" placeholder="••••••••" />
            <Input label="New password" type="password" placeholder="••••••••" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button type="submit" size="lg" loading={loading}>Save Changes</Button>
            <Button type="button" variant="outline" size="lg" onClick={clearAuth} className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300">
              <LogOut size={16} /> Sign Out
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
