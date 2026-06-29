"use client";

import { useState } from "react";
import Link from "next/link";
import { org } from "@/lib/content";
import {
  DEMO_ACCOUNT_NUMBER,
  DEMO_LAST_NAME,
} from "@/lib/mockAccounts";
import { usePortalFlow, formatCurrency } from "@/lib/usePortalFlow";
import {
  DropletIcon,
  CheckIcon,
  CardIcon,
  ArrowRightIcon,
  ShieldIcon,
} from "@/components/icons";

// CONCEPT 1 — "Civic Blue" payment portal mock.
export default function CivicBluePortal() {
  const flow = usePortalFlow();

  const steps = ["Look up account", "Review balance", "Payment", "Done"];
  const stepIndex =
    flow.step === "lookup" ? 0 : flow.step === "balance" ? 1 : flow.step === "pay" ? 2 : 3;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <DropletIcon className="h-5 w-5" />
            </span>
            <span className="text-sm font-bold text-slate-900">{org.name}</span>
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-blue-700">
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
          <CardIcon className="h-4 w-4" /> Pay My Bill
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Online payment portal</h1>

        {/* Stepper */}
        <ol className="mt-6 flex items-center gap-2 text-xs font-medium">
          {steps.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                  i < stepIndex
                    ? "border-blue-600 bg-blue-600 text-white"
                    : i === stepIndex
                    ? "border-blue-600 bg-white text-blue-700"
                    : "border-slate-300 bg-white text-slate-400"
                }`}
              >
                {i < stepIndex ? <CheckIcon className="h-4 w-4" /> : i + 1}
              </span>
              <span className={`hidden sm:block ${i <= stepIndex ? "text-slate-700" : "text-slate-400"}`}>
                {label}
              </span>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-slate-200" />}
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          {flow.step === "lookup" && <LookupStep flow={flow} />}
          {flow.step === "balance" && flow.account && <BalanceStep flow={flow} />}
          {flow.step === "pay" && flow.account && <PayStep flow={flow} />}
          {flow.step === "confirmation" && flow.result && <ConfirmationStep flow={flow} />}
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldIcon className="h-4 w-4" /> Demo only — no real payment is processed and no card data is stored.
        </p>
      </main>
    </div>
  );
}

type Flow = ReturnType<typeof usePortalFlow>;

function fieldClass() {
  return "w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
}

function LookupStep({ flow }: { flow: Flow }) {
  const [acct, setAcct] = useState("");
  const [last, setLast] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        flow.lookup(acct, last);
      }}
    >
      <h2 className="text-lg font-bold text-slate-900">Find your account</h2>
      <p className="mt-1 text-sm text-slate-600">
        Enter the account number from your bill along with the account holder&apos;s last name.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Account number</span>
          <input
            className={`mt-1 ${fieldClass()}`}
            value={acct}
            onChange={(e) => setAcct(e.target.value)}
            placeholder="e.g. 104872"
            inputMode="numeric"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Last name</span>
          <input
            className={`mt-1 ${fieldClass()}`}
            value={last}
            onChange={(e) => setLast(e.target.value)}
            placeholder="e.g. Mason"
          />
        </label>
      </div>

      {flow.lookupError && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{flow.lookupError}</p>
      )}

      <button
        type="submit"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
      >
        Look up account <ArrowRightIcon className="h-5 w-5" />
      </button>

      <p className="mt-4 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
        Demo account — account number <strong>{DEMO_ACCOUNT_NUMBER}</strong>, last name{" "}
        <strong>{DEMO_LAST_NAME}</strong>.
      </p>
    </form>
  );
}

function BalanceStep({ flow }: { flow: Flow }) {
  const a = flow.account!;
  const maxUsage = Math.max(...a.usage.map((u) => u.gallons));
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Account summary</h2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Account holder</p>
            <p className="font-semibold text-slate-900">{a.holderName}</p>
            <p className="mt-2 text-sm text-slate-500">Service address</p>
            <p className="text-sm text-slate-700">{a.serviceAddress}</p>
            <p className="mt-2 text-sm text-slate-500">Account #{a.accountNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Amount due</p>
            <p className="text-3xl font-bold text-slate-900">{formatCurrency(a.amountDue)}</p>
            <p className={`text-sm ${a.pastDue ? "font-semibold text-red-600" : "text-slate-500"}`}>
              {a.pastDue ? "Past due" : `Due ${a.dueDate}`}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-700">Recent usage (gallons)</p>
        <div className="mt-3 flex items-end gap-3">
          {a.usage.map((u) => (
            <div key={u.month} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-28 w-full items-end">
                <div
                  className="w-full rounded-t bg-blue-500"
                  style={{ height: `${(u.gallons / maxUsage) * 100}%` }}
                />
              </div>
              <span className="text-xs text-slate-500">{u.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={flow.goToPay}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Pay {formatCurrency(a.amountDue)} <ArrowRightIcon className="h-5 w-5" />
        </button>
        <button
          onClick={flow.reset}
          className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400"
        >
          Look up a different account
        </button>
      </div>
    </div>
  );
}

function PayStep({ flow }: { flow: Flow }) {
  const a = flow.account!;
  const [mode, setMode] = useState<"full" | "other">("full");
  const [other, setOther] = useState("");
  const [autopay, setAutopay] = useState(false);
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");

  const amount = mode === "full" ? a.amountDue : Math.max(0, parseFloat(other) || 0);
  const canPay = amount > 0 && card.replace(/\s/g, "").length >= 12 && exp.length >= 4 && cvc.length >= 3;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canPay) flow.submitPayment(amount, autopay);
      }}
    >
      <h2 className="text-lg font-bold text-slate-900">Payment details</h2>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-slate-700">Amount</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <label className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 ${mode === "full" ? "border-blue-500 bg-blue-50" : "border-slate-300"}`}>
            <input type="radio" name="amt" checked={mode === "full"} onChange={() => setMode("full")} className="accent-blue-600" />
            <span>
              <span className="block text-sm font-semibold text-slate-900">Full balance</span>
              <span className="block text-sm text-slate-500">{formatCurrency(a.amountDue)}</span>
            </span>
          </label>
          <label className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 ${mode === "other" ? "border-blue-500 bg-blue-50" : "border-slate-300"}`}>
            <input type="radio" name="amt" checked={mode === "other"} onChange={() => setMode("other")} className="accent-blue-600" />
            <span className="flex-1">
              <span className="block text-sm font-semibold text-slate-900">Other amount</span>
              <input
                value={other}
                onChange={(e) => { setMode("other"); setOther(e.target.value); }}
                placeholder="0.00"
                inputMode="decimal"
                className="mt-1 w-28 rounded border border-slate-300 px-2 py-1 text-sm"
              />
            </span>
          </label>
        </div>
      </fieldset>

      <div className="mt-5 grid gap-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Card number</span>
          <input className={`mt-1 ${fieldClass()}`} value={card} onChange={(e) => setCard(e.target.value)} placeholder="4242 4242 4242 4242" inputMode="numeric" />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Expiry</span>
            <input className={`mt-1 ${fieldClass()}`} value={exp} onChange={(e) => setExp(e.target.value)} placeholder="MM/YY" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">CVC</span>
            <input className={`mt-1 ${fieldClass()}`} value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" inputMode="numeric" />
          </label>
        </div>
      </div>

      <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
        <input type="checkbox" checked={autopay} onChange={(e) => setAutopay(e.target.checked)} className="h-4 w-4 accent-blue-600" />
        <span className="text-sm text-slate-700">Enroll in autopay — pay future bills automatically on the due date.</span>
      </label>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-blue-600 px-5 py-4 text-white">
        <span className="text-sm">Total to pay today</span>
        <span className="text-2xl font-bold">{formatCurrency(amount)}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={!canPay}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CardIcon className="h-5 w-5" /> Submit payment
        </button>
        <button type="button" onClick={flow.backToBalance} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400">
          Back
        </button>
      </div>
    </form>
  );
}

function ConfirmationStep({ flow }: { flow: Flow }) {
  const r = flow.result!;
  const a = flow.account!;
  return (
    <div className="text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckIcon className="h-9 w-9" />
      </span>
      <h2 className="mt-4 text-2xl font-bold text-slate-900">Payment received</h2>
      <p className="mt-1 text-slate-600">Thank you, {a.holderName.split(" ")[0]}. A receipt has been emailed to you.</p>

      <dl className="mx-auto mt-6 max-w-sm space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-left text-sm">
        <Row label="Confirmation #" value={r.confirmationNumber} />
        <Row label="Amount paid" value={formatCurrency(r.amountPaid)} />
        <Row label="Account" value={`#${a.accountNumber}`} />
        <Row label="Date" value={r.paidAt} />
        {r.enrolledAutopay && <Row label="Autopay" value="Enrolled" />}
      </dl>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={flow.reset} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
          Make another payment
        </button>
        <Link href="/" className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400">
          Return to site
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
