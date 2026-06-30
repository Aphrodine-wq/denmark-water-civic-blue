import Link from "next/link";
import { org, quickActions, waterQuality, alertNotice, leakCheck, boilWater, conservationTips, assistance, faqs } from "@/lib/content";
import {
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckIcon,
  LeakIcon,
  ShieldIcon,
  quickActionIcon,
} from "@/components/icons";

const actionHref: Record<string, string> = { pay: "/pay", leak: "/report-leak", service: "/start-stop" };

export const metadata = { title: `${org.name} — Pay your water bill online` };

const nav = [
  { label: "Pay Bill", href: "/pay" },
  { label: "Services", href: "#services" },
  { label: "Water Quality", href: "#quality" },
  { label: "Help", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

export default function CivicBlueHome() {
  return (
    <div className="min-h-screen bg-white text-slate-700">
      {/* Service notice — boil-water / flushing / outage banner the office can post. */}
      {alertNotice.active && (
        <div className="bg-blue-700 text-blue-50">
          <div className="mx-auto flex max-w-6xl items-start gap-3 px-6 py-2.5 text-sm">
            <span className="mt-0.5 shrink-0 rounded bg-blue-800 px-3 py-0.5 text-xs font-bold uppercase tracking-wide">{alertNotice.label}</span>
            <p className="text-blue-50">{alertNotice.message}</p>
          </div>
        </div>
      )}
      {/* Utility bar */}
      <div className="hidden bg-slate-900 text-slate-300 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs">
          <span className="flex items-center gap-2"><MapPinIcon className="h-3.5 w-3.5" /> {org.address}</span>
          <span className="flex items-center gap-5">
            <span className="flex items-center gap-2"><ClockIcon className="h-3.5 w-3.5" /> {org.officeHours}</span>
            <a href={`tel:${org.phone}`} className="flex items-center gap-2 text-white"><PhoneIcon className="h-3.5 w-3.5" /> {org.phone}</a>
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">{org.name}</Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a key={n.label} href={n.href} className="text-sm font-semibold text-slate-600 transition hover:text-blue-700">
                {n.label}
              </a>
            ))}
          </nav>
          <Link
            href="/pay"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Pay My Bill <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </header>

      {/* Mobile quick bar — tap-to-call + section nav (desktop gets the utility bar + full nav). */}
      <div className="border-b border-slate-200 bg-white lg:hidden">
        <div className="flex items-center gap-1 overflow-x-auto px-4 py-2 text-sm">
          <a href={`tel:${org.phone}`} className="flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 font-semibold text-blue-700">
            <PhoneIcon className="h-4 w-4" /> Call office
          </a>
          {nav.filter((n) => n.href.startsWith("#")).map((n) => (
            <a key={n.label} href={n.href} className="shrink-0 rounded-lg px-3 py-1.5 font-semibold text-slate-600">{n.label}</a>
          ))}
        </div>
      </div>

      <main id="main">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <img src="/images/hero.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          {/* Scrim wraps the text (an ancestor) so contrast holds over the photo and in forced-colors mode. */}
          <div className="bg-gradient-to-r from-slate-950/95 via-slate-900/88 to-slate-900/45">
          <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Serving our community since {org.established}</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
                {org.tagline}
              </h1>
              <p className="mt-5 max-w-md text-lg text-slate-200">
                Pay your water bill online anytime — just have your account number ready.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/pay"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-9 py-5 text-xl font-bold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
                >
                  Pay My Bill <ArrowRightIcon className="h-6 w-6" />
                </Link>
                <Link href="/report-leak" className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-7 py-5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10">
                  Report a Leak
                </Link>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Quick actions */}
        <section id="services" className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {quickActions.map((a) => {
              const Icon = quickActionIcon[a.key as keyof typeof quickActionIcon];
              const href = actionHref[a.key] ?? "#contact";
              return (
                <Link key={a.key} href={href} className="group flex items-start gap-4 rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-bold text-slate-900">{a.title}</span>
                    <span className="mt-1 block text-sm text-slate-600">{a.desc}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* About / water-quality band */}
        <section id="quality" className="border-y border-slate-100 bg-slate-50">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img src="/images/band.jpg" alt="Local woodland" className="h-80 w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Clean water, close to home</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Member-owned, locally run since {org.established}</h2>
              <p className="mt-4 text-slate-600">
                {waterQuality.body}
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-slate-200 pt-6">
                {[["0", "Violations"], ["100%", "Standards met"], [org.membersServed, "Served"]].map(([k, v]) => (
                  <div key={v}>
                    <dt className="text-2xl font-bold text-blue-700">{k}</dt>
                    <dd className="mt-0.5 text-sm text-slate-600">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Helpful resources */}
        <section id="resources" className="border-y border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Member help</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Helpful for members</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <LeakIcon className="h-5 w-5 text-blue-600" /> {leakCheck.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{leakCheck.intro}</p>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700 marker:font-semibold marker:text-blue-600">
                  {leakCheck.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-slate-600">{leakCheck.note}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <ShieldIcon className="h-5 w-5 text-blue-600" /> {boilWater.title}
                </h3>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700 marker:font-semibold marker:text-blue-600">
                  {boilWater.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-slate-600">{boilWater.note}</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Save water, save money</h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {conservationTips.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <PhoneIcon className="h-5 w-5 text-blue-700" /> {assistance.title}
              </h3>
              <p className="mt-2 text-sm text-slate-700">{assistance.body}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Questions</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Frequently asked</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-900">
                  {f.q}
                  <span className="text-blue-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact + final CTA */}
        <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col items-start justify-between gap-10 rounded-3xl bg-blue-700 p-10 text-white md:flex-row md:items-center md:p-14">
            <div>
              <h2 className="text-3xl font-bold">Ready to pay your bill?</h2>
              <p className="mt-2 max-w-sm text-blue-50">Have your account number ready. Questions? Call the office at <a href={`tel:${org.phone}`} className="font-semibold text-white underline underline-offset-2">{org.phone}</a>.</p>
            </div>
            <Link href="/pay" className="inline-flex items-center gap-2.5 rounded-xl bg-white px-9 py-5 text-xl font-bold text-blue-700 shadow-lg transition hover:bg-blue-50">
              Pay My Bill <ArrowRightIcon className="h-6 w-6" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-900 py-8 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm md:flex-row">
          <span className="font-semibold text-white">{org.name}</span>
          <span className="text-slate-400">{org.address} · <a href={`tel:${org.phone}`} className="hover:text-white">{org.phone}</a></span>
          <span className="text-slate-400">© {waterQuality.reportYear}</span>
        </div>
      </footer>
    </div>
  );
}
