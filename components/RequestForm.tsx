"use client";

import { useState } from "react";
import Link from "next/link";
import { org } from "@/lib/content";
import { CheckIcon, ArrowRightIcon, ShieldIcon } from "@/components/icons";

type Kind = "leak" | "service";

const copy = {
  leak: {
    eyebrow: "Report a Leak",
    title: "Report a leak or water emergency",
    intro: "Tell us what you're seeing and where. For a main break or no-water emergency, please also call us right away.",
    submit: "Submit leak report",
    done: "Leak report received",
  },
  service: {
    eyebrow: "Start / Stop Service",
    title: "Start, stop, or transfer service",
    intro: "Moving in or out of the service area? Send us the details and the office will set up your account.",
    submit: "Submit request",
    done: "Request received",
  },
} as const;

function field() {
  return "w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
}

export default function RequestForm({ kind }: { kind: Kind }) {
  const c = copy[kind];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [type, setType] = useState("Start service");
  const [ref, setRef] = useState<string | null>(null);

  const canSubmit = name.trim() && phone.trim() && address.trim();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setRef("DWA-" + Math.random().toString(36).slice(2, 7).toUpperCase());
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">{org.name}</Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-blue-700">← Back to site</Link>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600">{c.eyebrow}</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">{c.title}</h1>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          {ref ? (
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckIcon className="h-9 w-9" />
              </span>
              <h2 className="mt-4 text-2xl font-bold text-slate-900">{c.done}</h2>
              <p className="mt-1 text-slate-600">Thanks, {name.split(" ")[0]}. The office will follow up within one business day.</p>
              <p className="mt-4 inline-block rounded-lg bg-slate-100 px-4 py-2 text-sm">Reference <strong className="text-slate-900">{ref}</strong></p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">Return to site</Link>
                <Link href="/pay" className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400">Pay My Bill</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p className="text-sm text-slate-600">{c.intro}</p>
              <div className="mt-5 grid gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Full name</span>
                  <input className={`mt-1.5 ${field()}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Phone</span>
                    <input className={`mt-1.5 ${field()}`} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(601) 555-0000" inputMode="tel" required />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Service address</span>
                    <input className={`mt-1.5 ${field()}`} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 County Road" required />
                  </label>
                </div>

                {kind === "service" && (
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Request type</span>
                    <select className={`mt-1.5 ${field()}`} value={type} onChange={(e) => setType(e.target.value)}>
                      <option>Start service</option>
                      <option>Stop service</option>
                      <option>Transfer service</option>
                    </select>
                  </label>
                )}

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">{kind === "leak" ? "What are you seeing?" : "Anything else we should know?"}</span>
                  <textarea className={`mt-1.5 ${field()} min-h-24`} value={details} onChange={(e) => setDetails(e.target.value)} placeholder={kind === "leak" ? "Water pooling near the meter, low pressure, etc." : "Move-in date, account number, etc."} />
                </label>
              </div>

              <button type="submit" disabled={!canSubmit} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-base font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">
                {c.submit} <ArrowRightIcon className="h-5 w-5" />
              </button>
            </form>
          )}
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-600">
          <ShieldIcon className="h-4 w-4" /> Demo only — this request is not sent anywhere.
        </p>
      </main>
    </div>
  );
}
