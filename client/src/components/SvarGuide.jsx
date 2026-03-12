import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { getReply, replySets } from "../services/assistantReplies";
import { synthesizeSpeech } from "../services/api";

const SpeechRecognitionApi = typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

const MicIcon = ({ active = false }) => (
  <svg viewBox="0 0 24 24" className={`h-5 w-5 ${active ? "text-white" : "text-indigo"}`} fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 1 0 6 0V6a3 3 0 0 0-3-3Z" />
    <path d="M19 11a7 7 0 0 1-14 0" />
    <path d="M12 18v3" />
    <path d="M8 21h8" />
  </svg>
);

const getVoices = () => (typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis.getVoices() : []);

const chooseVoice = (locale) => {
  const voices = getVoices();
  if (!voices.length) return null;

  if (locale === "te") {
    return (
      voices.find((voice) => voice.lang?.toLowerCase() === "te-in") ||
      voices.find((voice) => voice.lang?.toLowerCase().startsWith("te")) ||
      voices.find((voice) => /telugu/i.test(`${voice.name} ${voice.lang}`)) ||
      null
    );
  }

  return (
    voices.find((voice) => voice.lang?.toLowerCase() === "en-in") ||
    voices.find((voice) => /india|indian/i.test(`${voice.name} ${voice.lang}`)) ||
    voices.find((voice) => voice.lang?.toLowerCase().startsWith("en")) ||
    null
  );
};

const toTeluguSpeechText = (message) =>
  message
    .replaceAll("VISAKRUTHI", "విసాకృతి")
    .replaceAll("KalaSaathi", "కళాసాథి")
    .replaceAll("Google Maps", "గూగుల్ మ్యాప్స్")
    .replaceAll("Etikoppaka", "ఎటికొప్పాక")
    .replaceAll("Cheepuru", "చీపురు")
    .replaceAll("Bamboo", "బాంబూ")
    .replaceAll("Vizag", "వైజాగ్")
    .replaceAll("Rs.", "రూపాయలు");

export default function SvarGuide() {
  const { language, text } = useLanguage();
  const isTelugu = language === "te";
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState(replySets.en.greeting);
  const [error, setError] = useState("");
  const [voiceReady, setVoiceReady] = useState(false);

  const supported = Boolean(SpeechRecognitionApi) && typeof window !== "undefined" && "speechSynthesis" in window;

  const uiCopy = useMemo(
    () => ({
      title: text("Svar Guide", "స్వర గైడ్"),
      subtitle: text("Voice Craft Assistant", "వాయిస్ కళా సహాయకుడు"),
      prompt: text("Speak your question and I will answer out loud.", "మీ ప్రశ్నను మాట్లాడండి. నేను గళంగా సమాధానం ఇస్తాను."),
      listening: text("Listening...", "వింటున్నాను..."),
      start: text("Start Mic", "మైక్ ప్రారంభించండి"),
      stop: text("Stop Mic", "మైక్ ఆపండి"),
      transcript: text("Transcript", "మీ మాట"),
      answer: text("Svar Reply", "స్వర సమాధానం"),
      unsupported: text(
        "Voice input is not supported in this browser. Please use a recent Chrome or Edge build.",
        "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు. దయచేసి తాజా Chrome లేదా Edge ను ఉపయోగించండి."
      ),
      cloudFallback: text(
        "Using browser voice because Google Cloud TTS is not configured yet.",
        "Google Cloud TTS ఇంకా సిద్ధంగా లేనందున ప్రస్తుతం బ్రౌజర్ వాయిస్ ఉపయోగిస్తోంది."
      ),
      teluguVoiceHint: text(
        "If Telugu still sounds unnatural, install a Telugu voice in your system speech settings for better local pronunciation.",
        "తెలుగు స్వరం ఇంకా సహజంగా లేకపోతే, మీ సిస్టమ్ స్పీచ్ సెట్టింగ్స్‌లో తెలుగు వాయిస్ ఇన్‌స్టాల్ చేస్తే ఉచ్చారణ మెరుగ్గా ఉంటుంది."
      )
    }),
    [text]
  );

  useEffect(() => {
    setResponse(replySets[isTelugu ? "te" : "en"].greeting);
    setTranscript("");
    setError("");
  }, [isTelugu]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return undefined;

    const updateVoices = () => setVoiceReady(getVoices().length > 0);
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
      recognitionRef.current?.stop?.();
      audioRef.current?.pause?.();
    };
  }, []);

  const speakWithBrowser = (message, locale) => {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(locale === "te" ? toTeluguSpeechText(message) : message);
    const voice = chooseVoice(locale);

    utterance.rate = locale === "te" ? 0.88 : 1;
    utterance.pitch = locale === "te" ? 0.96 : 1.02;
    utterance.lang = locale === "te" ? "te-IN" : "en-IN";

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const speak = async (message, locale) => {
    const audioPayload = await synthesizeSpeech({ text: message, language: locale });

    if (audioPayload?.audioContent) {
      const audio = new Audio(`data:${audioPayload.audioMimeType || "audio/mpeg"};base64,${audioPayload.audioContent}`);
      audioRef.current?.pause?.();
      audioRef.current = audio;
      audio.play().catch(() => speakWithBrowser(message, locale));
      return;
    }

    if (locale === "te" && audioPayload?.fallback) {
      setError(uiCopy.cloudFallback);
    }

    speakWithBrowser(message, locale);
  };

  const stopListening = () => {
    recognitionRef.current?.stop?.();
    setIsListening(false);
  };

  const startListening = () => {
    if (!supported) {
      setError(uiCopy.unsupported);
      return;
    }

    const recognition = new SpeechRecognitionApi();
    recognition.lang = isTelugu ? "te-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setError("");
      setIsListening(true);
      setTranscript("");
    };

    recognition.onerror = () => {
      setError(uiCopy.unsupported);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const heardText = event.results?.[0]?.[0]?.transcript?.trim() || "";
      if (!heardText) return;

      const answer = getReply(heardText);
      const locale = /[\u0C00-\u0C7F]/.test(heardText) ? "te" : isTelugu ? "te" : "en";

      setTranscript(heardText);
      setResponse(answer);
      speak(answer, locale);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {open ? (
        <div className="mesh-border card-surface w-[23rem] rounded-[1.8rem] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="font-display text-2xl font-bold text-indigo">{uiCopy.title}</p>
              <p className="text-xs uppercase tracking-[0.22em] text-terracotta">{uiCopy.subtitle}</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="text-xl text-indigo/55">
              x
            </button>
          </div>

          <p className="rounded-2xl bg-[#FEFAF5] px-4 py-3 text-sm leading-6 text-ink/78">{uiCopy.prompt}</p>

          <div className="mt-3 space-y-3">
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-terracotta">{uiCopy.transcript}</p>
              <p className="mt-2 min-h-12 text-sm leading-6 text-indigo">{transcript || uiCopy.listening}</p>
            </div>
            <div className="rounded-2xl bg-sand px-4 py-3 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-terracotta">{uiCopy.answer}</p>
              <p className="mt-2 text-sm leading-6 text-indigo">{response}</p>
            </div>
            {error ? <p className="text-sm font-medium text-terracotta">{error}</p> : null}
            {isTelugu && voiceReady ? <p className="text-xs leading-5 text-ink/65">{uiCopy.teluguVoiceHint}</p> : null}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
                isListening ? "bg-terracotta text-white shadow-lg shadow-terracotta/25" : "border border-indigo/15 bg-white text-indigo"
              }`}
            >
              <MicIcon active={isListening} />
              {isListening ? uiCopy.stop : uiCopy.start}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-indigo/15 bg-white px-5 py-4 text-sm font-bold text-indigo shadow-lg"
        >
          <MicIcon />
          {uiCopy.title}
        </button>
      )}
    </div>
  );
}
