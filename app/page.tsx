import Link from "next/link";
import {
  org,
  alertNotice,
  quickActions,
  services,
  rates,
  waterQuality,
  board,
  boardMeetings,
  faqs,
} from "@/lib/content";
import {
  DropletIcon,
  ShieldIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  quickActionIcon,
} from "@/components/icons";

// CONCEPT 1 — "Civic Blue": conventional, trustworthy municipal utility.
export const metadata = { title: `${org.name} — Concept 1` };

const nav = [
  { label: "Services", href: "#services" },
  { label: "Rates", href: "#rates" },
  { label: "Water Quality", href: "#quality" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function CivicBlueHome() {
  return (
    <div className="min-h-screen bg-white text-slate-700">
      {/* Alert banner */}
      {alertNotice.active && (
        <div className="bg-blue-900 text-blue-50">
          <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-2.5 text-sm">
            <span className="mt-0.5 rounded bg-blue-700 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide">
              {alertNotice.label}
            </span>
            <p className="text-blue-100">{alertNotice.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="#top" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              <DropletIcon className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-bold text-slate-900">{org.name}</span>
              <span className="block text-xs text-slate-500">Est. {org.established} · {org.serviceArea}</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-slate-600 hover:text-blue-700">
                {n.label}
              </a>
            ))}
          </nav>
          <Link
            href="/pay"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Pay My Bill <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                <ShieldIcon className="h-4 w-4" /> Serving {org.membersServed}
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
                {org.tagline}
              </h1>
              <p className="mt-4 max-w-md text-lg text-slate-600">
                Pay your bill, report a leak, or set up new service — all online, anytime.
                Proudly serving {org.serviceArea} since {org.established}.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/pay"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Pay My Bill <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700"
                >
                  Explore Services
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-900/5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <DropletIcon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Account at a glance</p>
                    <p className="text-xs text-slate-500">Sample customer dashboard</p>
                  </div>
                </div>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Current balance</dt>
                    <dd className="font-semibold text-slate-900">$64.35</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Due date</dt>
                    <dd className="font-medium text-slate-700">July 20, 2026</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">This month&apos;s usage</dt>
                    <dd className="font-medium text-slate-700">7,450 gal</dd>
                  </div>
                </dl>
                <Link
                  href="/pay"
                  className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-blue-50 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  Open the payment portal <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-5 md:grid-cols-3">
            {quickActions.map((a) => {
              const Icon = quickActionIcon[a.key as keyof typeof quickActionIcon];
              const href = a.href === "pay" ? "/pay" : a.href;
              return (
                <Link
                  key={a.key}
                  href={href}
                  className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{a.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{a.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                    Get started <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-y border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading eyebrow="What we do" title="Services for our members" />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {services.map((s) => (
                <div key={s.title} className="flex gap-4 rounded-xl bg-white p-6 shadow-sm">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <DropletIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rates */}
        <section id="rates" className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <SectionHeading eyebrow="Billing" title="Rates & fees" />
            <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Charge</th>
                    <th className="hidden px-5 py-3 font-semibold sm:table-cell">Detail</th>
                    <th className="px-5 py-3 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rates.map((r) => (
                    <tr key={r.label} className="bg-white">
                      <td className="px-5 py-3 font-medium text-slate-800">{r.label}</td>
                      <td className="hidden px-5 py-3 text-slate-500 sm:table-cell">{r.detail}</td>
                      <td className="px-5 py-3 text-right font-semibold text-slate-900">{r.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Rates shown are representative. Current rate schedules are available at the association office.
            </p>
          </div>
        </section>

        {/* Water quality */}
        <section id="quality" className="bg-blue-600 py-16 text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                <ShieldIcon className="h-4 w-4" /> {waterQuality.reportYear} Consumer Confidence Report
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight">{waterQuality.headline}</h2>
              <p className="mt-4 max-w-xl text-blue-100">{waterQuality.body}</p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Request the full report <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "0", v: "Violations" },
                { k: "100%", v: "Standards met" },
                { k: "24/7", v: "Monitoring" },
                { k: org.established.toString(), v: "Serving since" },
              ].map((stat) => (
                <div key={stat.v} className="rounded-xl bg-blue-500/30 p-5">
                  <p className="text-3xl font-bold">{stat.k}</p>
                  <p className="mt-1 text-sm text-blue-100">{stat.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About / Board */}
        <section id="about" className="py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
            <div>
              <SectionHeading eyebrow="About us" title="Member-owned, locally run" />
              <p className="mt-4 text-slate-600">
                {org.name} is a member-owned, not-for-profit water system. Every dollar goes
                back into maintaining clean, reliable water for the families and businesses we serve.
              </p>
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Board meetings</p>
                <p className="mt-1 text-sm text-slate-600">{boardMeetings.cadence}</p>
                <p className="text-sm text-slate-600">{boardMeetings.location}</p>
                <p className="mt-2 text-xs text-slate-500">{boardMeetings.note}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Board of directors</p>
              <ul className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200">
                {board.map((m) => (
                  <li key={m.name} className="flex items-center justify-between px-5 py-3.5">
                    <span className="font-medium text-slate-800">{m.name}</span>
                    <span className="text-sm text-slate-500">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-4xl px-4">
            <SectionHeading eyebrow="Questions" title="Frequently asked" />
            <div className="mt-8 space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-slate-200 bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
                    {f.q}
                    <span className="text-blue-600 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading eyebrow="Get in touch" title="Contact the office" />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <ContactCard icon={<PhoneIcon className="h-5 w-5" />} label="Office phone" value={org.phone} sub={`Emergency: ${org.emergencyPhone}`} />
              <ContactCard icon={<MapPinIcon className="h-5 w-5" />} label="Office address" value={org.address} sub={org.email} />
              <ContactCard icon={<ClockIcon className="h-5 w-5" />} label="Office hours" value={org.officeHours} sub="Closed weekends & holidays" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 py-10 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm md:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <DropletIcon className="h-5 w-5" />
            </span>
            <span className="font-semibold text-white">{org.name}</span>
          </div>
          <p className="text-slate-400">© {waterQuality.reportYear} {org.name}. All rights reserved.</p>
          <Link href="/" className="text-slate-400 underline hover:text-white">
            ← Back to concepts
          </Link>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{eyebrow}</p>
      <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </span>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-900">{value}</p>
      <p className="mt-0.5 text-sm text-slate-500">{sub}</p>
    </div>
  );
}
