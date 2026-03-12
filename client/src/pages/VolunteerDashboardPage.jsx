import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../components/LanguageContext";
import { getVolunteers } from "../services/api";

const DEMO_WORKSHOPS = [
  { id: 1, craft: "Etikoppaka Toys", date: "March 20, 2026", role: "Documentation Lead", status: "Upcoming" },
  { id: 2, craft: "Cheepuru Craft", date: "March 28, 2026", role: "Visitor Guide", status: "Upcoming" },
  { id: 3, craft: "Bamboo Craft", date: "February 15, 2026", role: "Media Support", status: "Completed" }
];

export default function VolunteerDashboardPage({ user }) {
  const { text } = useLanguage();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getVolunteers().then((volunteers) => {
      const match = volunteers.find((v) => v.email === user?.email);
      if (match) setProfile(match);
    });
  }, [user?.email]);

  const handleLogout = () => {
    window.localStorage.removeItem("visakruthiUser");
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 rounded-4xl bg-linear-to-r from-[#16A366] to-[#0D8A55] px-8 py-7 text-white shadow-xl shadow-[#16A366]/20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/60">
            {text("Volunteer Dashboard", "వాలంటీర్ డాష్‌బోర్డ్")}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold">
            {text("Welcome back", "స్వాగతం")}, {profile?.name || user?.email?.split("@")[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-white/65">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          {text("Logout", "లాగ్అవుట్")}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="mesh-border card-surface rounded-[1.6rem] p-6">
          <div className="inline-flex rounded-xl bg-[#16A366]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#16A366]">
            {text("Status", "స్థితి")}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#16A366]"></span>
            <p className="font-display text-2xl font-bold text-indigo">{text("Active", "చురుకుగా ఉంది")}</p>
          </div>
          <p className="mt-1 text-sm text-ink/55">{text("Registered volunteer", "నమోదిత వాలంటీర్")}</p>
        </div>
        <div className="mesh-border card-surface rounded-[1.6rem] p-6">
          <div className="inline-flex rounded-xl bg-terracotta/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-terracotta">
            {text("Workshops", "వర్క్‌షాప్స్")}
          </div>
          <p className="mt-4 font-display text-5xl font-bold text-indigo">3</p>
          <p className="mt-1 text-sm text-ink/55">{text("Total assigned", "మొత్తం కేటాయించబడిన")}</p>
        </div>
        <div className="mesh-border card-surface rounded-[1.6rem] p-6">
          <div className="inline-flex rounded-xl bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold">
            {text("Hours", "గంటలు")}
          </div>
          <p className="mt-4 font-display text-5xl font-bold text-indigo">18</p>
          <p className="mt-1 text-sm text-ink/55">{text("Community hours logged", "లాగ్ చేసిన సమాజ గంటలు")}</p>
        </div>
      </div>

      {/* Profile Card */}
      {profile ? (
        <div className="mt-6 mesh-border card-surface rounded-[1.8rem] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#16A366]">{text("My Profile", "నా ప్రొఫైల్")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: text("Name", "పేరు"), value: profile.name },
              { label: text("College", "కాలేజ్"), value: profile.college },
              { label: text("Phone", "ఫోన్"), value: profile.phone },
              { label: text("Interest Area", "ఆసక్తి రంగం"), value: profile.interestArea }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-sand/60 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/45">{item.label}</p>
                <p className="mt-1 font-semibold text-indigo">{item.value || "—"}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 mesh-border card-surface rounded-[1.8rem] p-6 text-center">
          <p className="text-ink/55">
            {text(
              "No volunteer profile found for this email. Register on the Volunteer page first.",
              "ఈ ఈమెయిల్‌కు వాలంటీర్ ప్రొఫైల్ కనుగొనలేదు. ముందుగా వాలంటీర్ పేజీలో నమోదు చేసుకోండి."
            )}
          </p>
          <Link
            to="/volunteer"
            className="mt-4 inline-flex rounded-full bg-[#16A366] px-6 py-2.5 text-sm font-bold text-white"
          >
            {text("Go to Registration", "నమోదుకు వెళ్ళండి")}
          </Link>
        </div>
      )}

      {/* Workshop Assignments */}
      <div className="mt-6 mesh-border card-surface rounded-[1.8rem] p-6">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">
          {text("Workshop Assignments", "వర్క్‌షాప్ కేటాయింపులు")}
        </p>
        <div className="mt-5 space-y-3">
          {DEMO_WORKSHOPS.map((w) => (
            <div key={w.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/70 px-5 py-4">
              <div>
                <p className="font-semibold text-indigo">{w.craft}</p>
                <p className="text-sm text-ink/60">
                  {w.role} · {w.date}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  w.status === "Completed"
                    ? "bg-[#16A366]/12 text-[#16A366]"
                    : "bg-gold/15 text-gold"
                }`}
              >
                {w.status === "Completed" ? text("Completed", "పూర్తయింది") : text("Upcoming", "రాబోయే")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          to="/explore"
          className="mesh-border card-surface flex items-center gap-4 rounded-[1.6rem] p-5 transition hover:-translate-y-0.5"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta/10 text-xl">🎨</span>
          <div>
            <p className="font-semibold text-indigo">{text("Explore Artisans", "కళాకారులను తెలుసుకోండి")}</p>
            <p className="text-sm text-ink/55">{text("Browse profiles and craft stories", "ప్రొఫైళ్లు మరియు కళా కథలు చూడండి")}</p>
          </div>
        </Link>
        <Link
          to="/workshops"
          className="mesh-border card-surface flex items-center gap-4 rounded-[1.6rem] p-5 transition hover:-translate-y-0.5"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#16A366]/10 text-xl">🗓️</span>
          <div>
            <p className="font-semibold text-indigo">{text("View Workshops", "వర్క్‌షాప్స్ చూడండి")}</p>
            <p className="text-sm text-ink/55">{text("See upcoming workshop schedules", "రాబోయే వర్క్‌షాప్ షెడ్యూళ్లు చూడండి")}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
