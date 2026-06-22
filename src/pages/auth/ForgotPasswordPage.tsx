import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/utils/constants";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
          <Mail size={28} className="text-emerald-600" />
        </div>
        <h1 className="text-2xl font-display font-semibold text-stone-950">Check your inbox</h1>
        <p className="mt-3 text-sm text-stone-500 max-w-sm mx-auto">
          We sent a password reset link to <strong className="text-stone-800">{email}</strong>. It expires in 30 minutes.
        </p>
        <Link to={ROUTES.LOGIN} className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-stone-900">
          <ArrowLeft size={15} /> Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold text-stone-950">Reset your password</h1>
        <p className="mt-2 text-sm text-stone-500">
          Enter your email and we'll send you a reset link.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail size={16} />}
          required
        />
        <Button type="submit" size="lg" loading={loading} className="w-full">
          Send Reset Link
        </Button>
      </form>
      <div className="mt-6 text-center">
        <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700">
          <ArrowLeft size={14} /> Back to sign in
        </Link>
      </div>
    </div>
  );
}
