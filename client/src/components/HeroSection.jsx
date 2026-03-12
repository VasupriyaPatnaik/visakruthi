import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

export default function HeroSection() {
  const { language, text } = useLanguage();
  const isTelugu = language === "te";

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12 lg:px-8 lg:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="fade-in">
          <div className="mb-6 inline-flex rounded-full border border-terracotta/15 bg-white/78 px-4 py-2 text-sm font-semibold text-terracotta shadow-sm">
            {text("Culture. Community. Craft.", "సంస్కృతి. సమాజం. కళ.")}
          </div>
          <h1
            className={`max-w-3xl font-extrabold text-indigo ${
              isTelugu ? "text-[2.7rem] leading-[1.18] tracking-[0.01em] md:text-[4rem]" : "font-display text-[3.4rem] leading-[0.98] md:text-[5.4rem]"
            }`}
          >
            {text("Discover the Untold Crafts of Vizag", "వైజాగ్ అపరిచిత కళలను అన్వేషించండి")}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-ink/72">
            {text(
              "VISAKRUTHI connects artisans from the Visakhapatnam region with tourists, students, and craft enthusiasts through stories, workshops, and direct cultural experiences.",
              "విశాఖపట్నం ప్రాంతంలోని కళాకారులను పర్యాటకులు, విద్యార్థులు, మరియు కళాభిమానులతో కథలు, వర్క్‌షాప్స్, మరియు ప్రత్యక్ష అనుభవాల ద్వారా కలిపే వేదికే VISAKRUTHI."
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/explore"
              className="rounded-full bg-gradient-to-r from-terracotta to-[#F07828] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-terracotta/40 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta/50"
            >
              {text("Explore Crafts", "కళలను చూడండి")}
            </Link>
            <Link
              to="/workshops"
              className="rounded-full border-2 border-indigo bg-white px-6 py-3 text-sm font-bold text-indigo transition hover:border-terracotta hover:text-terracotta hover:bg-terracotta/5"
            >
              {text("Book Workshop", "వర్క్‌షాప్ బుక్ చేయండి")}
            </Link>
          </div>
        </div>

        <div className="mesh-border card-surface relative rounded-[2rem] p-5">
          <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,#0D3B66_0%,#0D4975_42%,#E8540D_100%)] p-6 text-sand">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-gold">{text("Mission", "లక్ష్యం")}</p>
                <p className="mt-3 text-lg font-semibold">
                  {text(
                    "Preserve traditional craftsmanship through digital visibility and cultural tourism.",
                    "డిజిటల్ గుర్తింపు మరియు సాంస్కృతిక పర్యాటకం ద్వారా సంప్రదాయ కళలను సంరక్షించడం."
                  )}
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-gold">{text("Vision", "దృష్టి")}</p>
                <p className="mt-3 text-lg font-semibold">
                  {text(
                    "Build a sustainable ecosystem where technology and heritage support artisan communities.",
                    "సాంకేతికత మరియు వారసత్వం కలిసి కళాకారుల సమాజాలను బలోపేతం చేసే స్థిరమైన వ్యవస్థను నిర్మించడం."
                  )}
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-[1.5rem] bg-sand/95 p-5 text-indigo">
              <p className="text-xs uppercase tracking-[0.28em] text-terracotta">{text("Platform Highlights", "వేదిక విశేషాలు")}</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-3xl font-extrabold">4+</p>
                  <p className="text-sm text-indigo/70">{text("Artisan communities", "కళాకారుల సమూహాలు")}</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold">3</p>
                  <p className="text-sm text-indigo/70">{text("Workshop packages", "వర్క్‌షాప్ ప్యాకేజీలు")}</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold">2</p>
                  <p className="text-sm text-indigo/70">{text("Language modes", "భాషా ఎంపికలు")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
