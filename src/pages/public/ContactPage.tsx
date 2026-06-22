import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ContactPage() {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      <div className="border-b border-stone-200 bg-white">
        <div className="container-page py-10">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-stone-950">Get in Touch</h1>
          <p className="mt-2 text-sm text-stone-500">We'd love to hear from you.</p>
        </div>
      </div>

      <div className="container-page py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-display font-semibold text-stone-900 mb-6">Send us a message</h2>
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <Input label="Full name" type="text" placeholder="Your name" required />
            <Input label="Email address" type="email" placeholder="you@example.com" required />
            <Input label="Subject" type="text" placeholder="How can we help?" required />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-stone-700">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us more…"
                className="px-3.5 py-3 rounded-lg border border-stone-200 bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 resize-none"
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full">Send Message</Button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-display font-semibold text-stone-900">Contact Information</h2>
          {[
            { icon: Mail,    label: "Email",   value: "hello@decora.in" },
            { icon: Phone,   label: "Phone",   value: "+91 98765 43210" },
            { icon: MapPin,  label: "Address", value: "12, Design District, Bandra West, Mumbai — 400050" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4 p-5 rounded-2xl bg-stone-100 border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
                <Icon size={18} className="text-stone-500" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-0.5">{label}</p>
                <p className="text-sm text-stone-700">{value}</p>
              </div>
            </div>
          ))}
          <div className="mt-2 p-5 rounded-2xl bg-stone-100 border border-stone-200">
            <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-2">Hours</p>
            <p className="text-sm text-stone-700">Monday – Saturday: 9am – 6pm IST</p>
            <p className="text-sm text-stone-500 mt-0.5">We typically respond within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
