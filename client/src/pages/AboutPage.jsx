import SectionHeader from "../components/SectionHeader";
import { getFounderNote } from "../data/demoData";
import { useLanguage } from "../components/LanguageContext";
import { founders } from "../data/demoData";

export default function AboutPage() {
  const { language, text } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader
        eyebrow={text("About VISAKRUTHI", "VISAKRUTHI గురించి")}
        title={text(
          "A cultural technology platform for heritage, livelihoods, and tourism.",
          "వారసత్వం, జీవనోపాధి, మరియు పర్యాటకాన్ని కలిపే సాంస్కృతిక సాంకేతిక వేదిక."
        )}
        description={text(
          "VISAKRUTHI is built to give traditional artisans in and around Visakhapatnam a strong digital presence, connect them with visitors, and turn cultural interest into sustainable opportunities.",
          "విశాఖపట్నం మరియు పరిసర ప్రాంతాల సాంప్రదాయ కళాకారులకు బలమైన డిజిటల్ గుర్తింపును ఇవ్వడానికి, వారిని సందర్శకులతో కలపడానికి, మరియు సాంస్కృతిక ఆసక్తిని స్థిరమైన అవకాశాలుగా మార్చడానికి VISAKRUTHI రూపొందించబడింది."
        )}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="mesh-border card-surface rounded-[2rem] p-8 lg:col-span-2">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("The Idea", "ఆలోచన")}</p>
          <p className="mt-4 text-lg leading-8 text-ink/80">
            {text(
              "Many artisans such as Etikoppaka toy makers, cheepuru broom makers, bamboo craftsmen, and tribal artisan communities create remarkable work but still depend on fragmented local visibility. VISAKRUTHI turns that gap into a digital-first cultural tourism platform where artisans can showcase their craft, share their stories, host workshops, and connect directly with tourists, students, and craft enthusiasts.",
              "ఎటికొప్పాక బొమ్మల తయారీదారులు, చీపురు తయారీదారులు, బాంబూ కళాకారులు, గిరిజన కళా సమూహాలు వంటి అనేక మంది కళాకారులు గొప్ప పనులు చేస్తున్నప్పటికీ విభిన్నమైన స్థానిక గుర్తింపుపైనే ఆధారపడుతున్నారు. ఈ లోటును VISAKRUTHI డిజిటల్ ఆధారిత సాంస్కృతిక పర్యాటక వేదికగా మార్చి, కళాకారులు తమ కళను ప్రదర్శించడానికి, తమ కథలను పంచుకోవడానికి, వర్క్‌షాప్స్ నిర్వహించడానికి, మరియు పర్యాటకులు, విద్యార్థులు, కళాభిమానులతో నేరుగా కలవడానికి సహాయపడుతుంది."
            )}
          </p>
        </div>
        <div className="mesh-border card-surface rounded-[2rem] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("Mission", "మిషన్")}</p>
          <p className="mt-4 text-lg leading-8 text-ink/80">
            {text(
              "Preserve traditional craftsmanship while empowering artisans through digital visibility and cultural tourism.",
              "డిజిటల్ గుర్తింపు మరియు సాంస్కృతిక పర్యాటకంతో కళాకారులను శక్తివంతం చేస్తూ సాంప్రదాయ కళలను సంరక్షించడం."
            )}
          </p>
        </div>
        <div className="mesh-border card-surface rounded-[2rem] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("Vision", "విజన్")}</p>
          <p className="mt-4 text-lg leading-8 text-ink/80">
            {text(
              "Create a sustainable ecosystem where technology, heritage, and tourism support artisan communities.",
              "సాంకేతికత, వారసత్వం, మరియు పర్యాటకం కలిసి కళాకారుల సమాజాలను ఆదరించే స్థిరమైన వ్యవస్థను సృష్టించడం."
            )}
          </p>
        </div>
      </div>

      <section className="mt-16">
        <SectionHeader
          eyebrow={text("Why It Matters", "ఇది ఎందుకు ముఖ్యం")}
          title={text("A platform shaped around real cultural value.", "నిజమైన సాంస్కృతిక విలువను కేంద్రంగా ఉంచుకుని రూపుదిద్దుకున్న వేదిక.")}
          description={text(
            "The platform brings together artisan discovery, workshop access, volunteer participation, story-led media, and visitor insights in one connected experience.",
            "ఈ వేదిక కళాకారుల అన్వేషణ, వర్క్‌షాప్ యాక్సెస్, వాలంటీర్ భాగస్వామ్యం, కథన ఆధారిత మీడియా, మరియు సందర్శకుల అవగాహనలను ఒకే అనుసంధాన అనుభవంగా అందిస్తుంది."
          )}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="mesh-border card-surface rounded-[1.8rem] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("For Artisans", "కళాకారుల కోసం")}</p>
            <p className="mt-4 text-base leading-8 text-ink/75">
              {text(
                "Digital visibility, direct audience reach, and new income opportunities through experiences and storytelling.",
                "డిజిటల్ గుర్తింపు, ప్రత్యక్ష ప్రేక్షకుల చేరిక, మరియు అనుభవాలు, కథనాల ద్వారా కొత్త ఆదాయ అవకాశాలు."
              )}
            </p>
          </div>
          <div className="mesh-border card-surface rounded-[1.8rem] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("For Visitors", "సందర్శకుల కోసం")}</p>
            <p className="mt-4 text-base leading-8 text-ink/75">
              {text(
                "Authentic craft discovery, bookable workshops, regional navigation, and deeper cultural context.",
                "నిజమైన కళా అన్వేషణ, బుక్ చేయదగిన వర్క్‌షాప్స్, ప్రాంతీయ మార్గదర్శనం, మరియు లోతైన సాంస్కృతిక అవగాహన."
              )}
            </p>
          </div>
          <div className="mesh-border card-surface rounded-[1.8rem] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("For Students", "విద్యార్థుల కోసం")}</p>
            <p className="mt-4 text-base leading-8 text-ink/75">
              {text(
                "Volunteer pathways for documentation, outreach, event support, and preserving local heritage through technology.",
                "డాక్యుమెంటేషన్, ప్రచారం, ఈవెంట్ సహాయం, మరియు సాంకేతికత ద్వారా స్థానిక వారసత్వ పరిరక్షణకు వాలంటీర్ మార్గాలు."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader
          eyebrow={text("Founders", "స్థాపకులు")}
          title={text("Built by a team focused on culture-led innovation.", "సంస్కృతి ఆధారిత ఆవిష్కరణపై దృష్టి పెట్టిన బృందం నిర్మించింది.")}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {founders.map((founder) => (
            <article key={founder.name} className="mesh-border card-surface rounded-[2rem] p-6">
              <img src={founder.image} alt={founder.name} className="h-72 w-full rounded-[1.5rem] object-contain" />
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text(founder.role, founder.role === "Founder" ? "స్థాపకురాలు" : "సహ-స్థాపకురాలు")}</p>
              <h3 className="mt-2 font-display text-3xl font-bold text-indigo">{founder.name}</h3>
              <p className="mt-4 text-base leading-8 text-ink/75">{getFounderNote(founder, language)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
