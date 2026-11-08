import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle, Sparkles, Volume2 } from 'lucide-react';
import { useToast } from '../common/Toast';
 
export interface VoiceLanguage {
  code: string;
  label: string;
  speechCode: string;
}
 
export const VOICE_LANGUAGES: VoiceLanguage[] = [
  { code: 'en', label: 'English', speechCode: 'en-IN' },
  { code: 'ml', label: 'മലയാളം (Malayalam)', speechCode: 'ml-IN' },
  { code: 'hi', label: 'हिन्दी (Hindi)', speechCode: 'hi-IN' },
  { code: 'ta', label: 'தமிழ் (Tamil)', speechCode: 'ta-IN' },
];
 
export interface GuidedPrompt {
  id: string;
  question: string;
  prefix: string;
}
 
export const ARTWORK_GUIDED_PROMPTS: GuidedPrompt[] = [
  {
    id: 'what',
    question: '1. What is this artwork and what does it show?',
    prefix: 'What this artwork depicts: ',
  },
  {
    id: 'how',
    question: '2. Who taught you, and how is it made?',
    prefix: 'Lineage & technique: ',
  },
  {
    id: 'tradition',
    question: '3. What does it mean in your tradition?',
    prefix: 'Traditional symbolism: ',
  },
];
 
interface VoiceInputProps {
  onTranscript: (text: string) => void;
  guidedPrompts?: GuidedPrompt[];
  currentValue?: string;
  fieldLabel?: string;
}
 
// Typing for Web Speech API recognition instance
type SpeechRecognitionType = any;
 
export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  guidedPrompts,
  currentValue = '',
  fieldLabel = 'field',
}) => {
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<VoiceLanguage>(VOICE_LANGUAGES[1]); // Default to Malayalam
  const [activePrompt, setActivePrompt] = useState<GuidedPrompt | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const { showToast } = useToast();
 
  // Keep the latest props/state in refs so the recognition instance can be
  // created ONCE. Re-creating it on every keystroke/transcript (the old
  // behaviour) aborted the mic right after the first spoken phrase.
  const currentValueRef = useRef(currentValue);
  const onTranscriptRef = useRef(onTranscript);
  const showToastRef = useRef(showToast);
  const activePromptRef = useRef<GuidedPrompt | null>(activePrompt);
  const pendingPrefixRef = useRef<string | null>(null);
 
  currentValueRef.current = currentValue;
  onTranscriptRef.current = onTranscript;
  showToastRef.current = showToast;
  activePromptRef.current = activePrompt;
 
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
 
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }
 
    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false; // only final results are used below
      recognition.lang = VOICE_LANGUAGES[1].speechCode;
 
      recognition.onstart = () => {
        setIsListening(true);
        setPermissionError(null);
      };
 
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
 
        const cleanText = finalTranscript.trim();
        if (!cleanText) return;
 
        // Add the guided-prompt prefix only once per selected prompt
        const prefix = pendingPrefixRef.current ? `\n${pendingPrefixRef.current}` : '';
        pendingPrefixRef.current = null;
 
        const base = currentValueRef.current;
        const separator = base && !base.endsWith(' ') && !prefix ? ' ' : '';
        const newContent = `${base}${separator}${prefix}${cleanText}`;
 
        onTranscriptRef.current(newContent);
        // Update immediately so two quick results in a row don't overwrite each other
        currentValueRef.current = newContent;
      };
 
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        const notify = showToastRef.current;
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setPermissionError('Microphone permission was denied. Please allow mic access in browser settings.');
          notify('Microphone access denied.', 'error');
        } else if (event.error === 'no-speech' || event.error === 'aborted') {
          // silence or manual stop: nothing to report
        } else if (event.error === 'language-not-supported') {
          notify('This browser does not support voice input for the selected language. Try English or type directly.', 'info');
        } else if (event.error === 'network') {
          notify('Voice input needs an internet connection (the browser sends audio to its speech service).', 'info');
        } else {
          notify(`Voice input notice: ${event.error}`, 'info');
        }
        setIsListening(false);
      };
 
      recognition.onend = () => {
        setIsListening(false);
      };
 
      recognitionRef.current = recognition;
    } catch (err) {
      console.error('Failed to initialize speech recognition:', err);
      setIsSupported(false);
    }
 
    return () => {
      try {
        recognitionRef.current?.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    };
  }, []); // create once
 
  const toggleListening = () => {
    if (!isSupported || !recognitionRef.current) {
      showToast('Voice input is not supported in this browser. Please use Chrome or Edge, or type directly.', 'info');
      return;
    }
 
    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
      showToast('Stopped listening. You can edit the transcribed text with keyboard.', 'info');
    } else {
      try {
        setPermissionError(null);
        pendingPrefixRef.current = activePromptRef.current?.prefix ?? null;
        recognitionRef.current.lang = selectedLanguage.speechCode;
        recognitionRef.current.start();
        showToast(`Listening in ${selectedLanguage.label}... Speak clearly into your microphone.`, 'info');
      } catch (err: any) {
        console.error('Error starting recognition:', err);
        showToast('Could not start the microphone. Please try again.', 'error');
      }
    }
  };
 
  const handlePromptClick = (prompt: GuidedPrompt) => {
    setActivePrompt(activePrompt?.id === prompt.id ? null : prompt);
  };
 
  return (
    <div className="my-2.5 p-3 rounded-xl bg-paper-cream border border-terracotta/25">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-oxblood">
          <Sparkles className="w-4 h-4 text-madder-red" />
          <span>Voice "Tell Your Story"</span>
          <span className="text-[10px] text-charcoal/60 font-normal">
            (Web Speech API • Zero AI)
          </span>
        </div>
 
        {/* Language selector for speech */}
        <div className="flex items-center gap-1">
          <Volume2 className="w-3.5 h-3.5 text-charcoal/60" />
          <select
            value={selectedLanguage.code}
            onChange={(e) => {
              const found = VOICE_LANGUAGES.find((l) => l.code === e.target.value);
              if (found) setSelectedLanguage(found);
            }}
            disabled={isListening}
            className="text-[11px] py-1 px-2 rounded border border-terracotta/30 bg-warm-ivory text-charcoal font-medium outline-none focus:ring-1 focus:ring-madder-red disabled:opacity-50"
            aria-label="Select voice recognition language"
          >
            {VOICE_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>
 
      {/* Guided Prompts (for Artworks Story) */}
      {guidedPrompts && guidedPrompts.length > 0 && (
        <div className="mb-2.5">
          <span className="text-[11px] font-semibold text-charcoal/80 block mb-1">
            Choose a guided prompt, then tap mic to answer:
          </span>
          <div className="space-y-1">
            {guidedPrompts.map((p) => {
              const isSelected = activePrompt?.id === p.id;
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => handlePromptClick(p)}
                  className={`w-full text-left text-xs p-2 rounded-lg border transition ${
                    isSelected
                      ? 'bg-warm-ivory border-madder-red text-madder-red font-semibold shadow-2xs'
                      : 'bg-paper-cream/80 border-terracotta/20 text-charcoal/80 hover:bg-warm-ivory'
                  }`}
                >
                  {p.question}
                </button>
              );
            })}
          </div>
        </div>
      )}
 
      {/* Mic Action Bar */}
      <div className="flex items-center justify-between gap-3 pt-1 border-t border-terracotta/15">
        <button
          type="button"
          onClick={toggleListening}
          aria-label={isListening ? `Stop listening for ${fieldLabel}` : `Speak with mic to fill ${fieldLabel}`}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition touch-target shadow-2xs cursor-pointer ${
            isListening
              ? 'bg-madder-red text-warm-ivory animate-pulse'
              : 'bg-warm-ivory border border-terracotta/30 text-oxblood hover:border-madder-red'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4 text-warm-ivory" />
              <span>Stop Recording</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 text-madder-red" />
              <span>Tap to Speak in {selectedLanguage.label.split(' ')[0]}</span>
            </>
          )}
        </button>
 
        <span className="text-[11px] text-charcoal/60">
          {isListening
            ? 'Listening... Speak into your mic'
            : 'Speech turns into text in your box'}
        </span>
      </div>
 
      {/* Unsupported browser fallback notice */}
      {!isSupported && (
        <div className="mt-2.5 p-2 rounded bg-turmeric/15 border border-turmeric/35 text-[11px] text-charcoal/80 flex items-start gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
          <span>
            Voice input works best in Google Chrome, Microsoft Edge, and Android browsers. You can always type directly into the box.
          </span>
        </div>
      )}
 
      {/* Permission denial message */}
      {permissionError && (
        <div className="mt-2.5 p-2 rounded bg-madder-red/10 border border-madder-red/30 text-[11px] text-madder-red flex items-start gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>{permissionError}</span>
        </div>
      )}
    </div>
  );
};
 