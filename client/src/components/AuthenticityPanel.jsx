import { useMemo, useState } from "react";
import { verifyAuthenticityCode } from "../services/api";
import { useLanguage } from "./LanguageContext";

export default function AuthenticityPanel({ artisan }) {
  const { text } = useLanguage();
  const [codeInput, setCodeInput] = useState(artisan?.authenticity?.code || "");
  const [result, setResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!artisan?.authenticity?.code) {
    return null;
  }

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";

  const verifyUrl = useMemo(
    () => `${baseUrl}/artisans/${artisan.id}?verify=${encodeURIComponent(artisan.authenticity.code)}`,
    [artisan.authenticity.code, artisan.id, baseUrl]
  );

  const qrImage = useMemo(
    () => `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(verifyUrl)}`,
    [verifyUrl]
  );

  const handleVerify = async () => {
    setIsVerifying(true);
    const response = await verifyAuthenticityCode(codeInput);
    setResult(response);
    setIsVerifying(false);
  };

  const isValidForThisArtisan = Boolean(result?.valid && result?.artisanId === artisan.id);

  return (
    <section className="mesh-border card-surface mt-8 rounded-4xl p-6 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-terracotta">{text("QR Authenticity", "QR ప్రామాణికత")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-indigo">
            {text("Scan to verify origin and artisan authenticity", "మూలం మరియు కళాకారుడి ప్రామాణికతను నిర్ధారించడానికి స్కాన్ చేయండి")}
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink/75">
            {text(
              "Each registered artisan has a traceable code linked to origin, story, and craft details.",
              "ప్రతి నమోదైన కళాకారుడికి మూలం, కథ, మరియు కళా వివరాలకు అనుసంధానమైన ట్రేస్ చేయగల కోడ్ ఉంటుంది."
            )}
          </p>

          <div className="mt-5 rounded-3xl bg-sand p-4 text-sm text-indigo/85">
            <p>
              <span className="font-semibold">{text("Origin", "మూలం")}:</span> {artisan.authenticity.origin}
            </p>
            <p className="mt-1">
              <span className="font-semibold">{text("Registry Code", "రిజిస్ట్రి కోడ్")}:</span> {artisan.authenticity.code}
            </p>
            <p className="mt-1">
              <span className="font-semibold">{text("Issued By", "జారీ చేసింది")}:</span> {artisan.authenticity.issuedBy}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <input
              value={codeInput}
              onChange={(event) => setCodeInput(event.target.value)}
              placeholder={text("Paste scanned QR code", "స్కాన్ చేసిన QR కోడ్‌ను పేస్ట్ చేయండి")}
              className="w-full max-w-md rounded-2xl border border-indigo/10 bg-white px-4 py-3 text-sm outline-none"
            />
            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying || !codeInput.trim()}
              className="rounded-full bg-indigo px-5 py-3 text-sm font-bold text-sand disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isVerifying ? text("Verifying...", "ధృవీకరిస్తోంది...") : text("Verify Code", "కోడ్ ధృవీకరించండి")}
            </button>
          </div>

          {result ? (
            <p className={`mt-4 text-sm font-semibold ${isValidForThisArtisan ? "text-emerald-700" : "text-amber-700"}`}>
              {isValidForThisArtisan
                ? text("Authentic: origin and artisan record verified.", "ప్రామాణికం: మూలం మరియు కళాకారుడి రికార్డు ధృవీకరించబడింది.")
                : text("Code exists, but it belongs to a different artisan record.", "కోడ్ ఉంది, కానీ అది వేరే కళాకారుడి రికార్డుకు చెందింది.")}
            </p>
          ) : null}
        </div>

        <div className="rounded-3xl bg-white p-4 text-center shadow-sm">
          <img src={qrImage} alt={text("Artisan authenticity QR", "కళాకారుడి ప్రామాణికత QR")} className="mx-auto h-56 w-56" loading="lazy" />
          <p className="mt-3 text-xs text-ink/60">{text("Scan with phone camera to open verification link", "ధృవీకరణ లింక్ తెరవడానికి ఫోన్ కెమెరాతో స్కాన్ చేయండి")}</p>
        </div>
      </div>
    </section>
  );
}
