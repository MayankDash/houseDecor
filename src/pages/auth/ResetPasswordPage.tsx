import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/utils/constants";

export default function ResetPasswordPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  };

  if (done) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
          <Lock size={28} className="text-emerald-600" />
        </div>
        <h1 className="text-2xl font-display font-semibold text-stone-950">Password updated</h1>
        <p className="mt-3 text-sm text-stone-500">Your password has been reset successfully.</p>
        <div className="mt-8">
          <Link to={ROUTES.LOGIN}>
            <Button size="lg" className="w-full">Sign In Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold text-stone-950">Set new password</h1>
        <p className="mt-2 text-sm text-stone-500">Choose a strong password for your account.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="New password"
          type={showPw ? "text" : "password"}
          placeholder="At least 8 characters"
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button type="button" onClick={() => setShowPw((v) => !v)} className="text-stone-400 hover:text-stone-600">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          required
        />
        <Input label="Confirm password" type="password" placeholder="••••••••" leftIcon={<Lock size={16} />} required />
        <Button type="submit" size="lg" loading={loading} className="w-full">Update Password</Button>
      </form>
    </div>
  );
}
