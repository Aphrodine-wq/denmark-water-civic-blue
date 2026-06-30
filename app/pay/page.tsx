"use client";

import { useState } from "react";
import Link from "next/link";
import { org, payment } from "@/lib/content";
import { CardIcon, ShieldIcon, ArrowRightIcon, PhoneIcon, MapPinIcon, ClockIcon } from "@/components/icons";

// CONCEPT 1 — "Civic Blue" payment portal.
// Payments are handled by Denmark Water's billing provider, BBI EzPay. On desktop
// the portal is embedded; on phones (most members + rural connections) we show a
// big button that opens EzPay full-screen instead of cramming an external app into
// a tiny iframe. Fee disclosure + offline payment options are always shown so the
// page cuts calls to the office instead of creating them. Swap org.ezpayUrl when
// BBI confirms the entity-specific link.
export default function CivicBluePortal() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-bold text-slate-900">{org.name}</Link>
          <a href={`tel:${org.phone}`} className="flex items-center gap-1.5 text-sm font-semibold text-blue-700">
            <PhoneIcon className="h-4 w-4" /> {org.phone}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
          <CardIcon className="h-4 w-4" /> Pay My Bill
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Online payment portal</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Pay your water bill securely with <strong>BBI EzPay</strong>, our billing provider.
          Have the account number from your most recent bill ready — it&apos;s printed at the
          top of your bill, just above your service address.
        </p>

        {/* Fee disclosure — shown up front so the processor fee is never a surprise. */}
        <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Heads up:</strong> {payment.feeNote}
        </p>

        {/* MOBILE — open EzPay full-screen instead of a cramped iframe. */}
        <div className="mt-6 md:hidden">
          <a
            href={org.ezpayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Open the EzPay payment portal <ArrowRightIcon className="h-5 w-5" />
          </a>
          <p className="mt-2 text-center text-xs text-slate-500">Opens your secure payment page in a new tab.</p>
        </div>

        {/* DESKTOP — embedded portal with an always-visible new-tab fallback. */}
        <div className="hidden md:block">
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            <ShieldIcon className="h-5 w-5 shrink-0" />
            <span className="flex-1">Trouble seeing the payment form below? Open the secure EzPay portal in a new tab.</span>
            <a
              href={org.ezpayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Open EzPay <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <span className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
                  Loading secure payment portal…
                </span>
              </div>
            )}
            <iframe
              src={org.ezpayUrl}
              title="BBI EzPay — secure bill payment"
              onLoad={() => setLoaded(true)}
              className="h-[820px] w-full"
              allow="payment"
            />
          </div>
        </div>

        {/* Other ways to pay — for members who don't pay online. */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Other ways to pay</h2>
          <p className="mt-1 text-sm text-slate-600">Don&apos;t want to pay online? You have options.</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {payment.otherWays.map((w) => (
              <li key={w.method} className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{w.method}</p>
                <p className="mt-0.5 text-sm text-slate-600">{w.detail}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-2 border-t border-slate-200 pt-4 text-sm text-slate-600 sm:grid-cols-3">
            <a href={`tel:${org.phone}`} className="flex items-center gap-2 font-semibold text-blue-700">
              <PhoneIcon className="h-4 w-4" /> {org.phone}
            </a>
            <span className="flex items-center gap-2"><MapPinIcon className="h-4 w-4 text-slate-400" /> {org.address}</span>
            <span className="flex items-center gap-2"><ClockIcon className="h-4 w-4 text-slate-400" /> {org.officeHours}</span>
          </div>
        </section>

        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
          <ShieldIcon className="h-4 w-4" /> Payments are securely processed by BBI EzPay.{" "}
          {org.shortName} never sees or stores your card or bank details.
        </p>
      </main>
    </div>
  );
}
