import React, { useState } from "react";

const ZenGuide = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSoothe = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      // Check if user set key in env, otherwise warn
      const key = import.meta.env.VITE_GEMINI_API_KEY;

      if (!key) {
        throw new Error(
          "API Key missing. Please set VITE_GEMINI_API_KEY in .env file."
        );
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a gentle mindfulness coach. The user says: "${input}". Provide a very short (2 sentences), soothing metaphor.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) throw new Error("Connection faint...");

      const data = await response.json();
      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Peace comes from within.";
      setOutput(text);
    } catch (error) {
      setOutput(error.message || "The ether is silent right now. Breathe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col gap-4 relative border-2 border-purple-100 h-[350px]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>

      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg text-slate-700 flex items-center gap-2">
          <i className="fas fa-robot text-purple-400"></i> Zen Guide
        </h2>
        <i className="fas fa-sparkles text-yellow-400 animate-pulse"></i>
      </div>

      <p className="text-xs text-slate-500">
        Share a worry, get a personalized calm.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={`w-full p-3 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-purple-400 resize-none transition-all placeholder:text-slate-300 ${
          output ? "h-16" : "h-24"
        }`}
        placeholder="I'm feeling overwhelmed by..."
      />

      <button
        onClick={handleSoothe}
        disabled={loading}
        className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
      >
        {loading ? (
          <i className="fas fa-circle-notch fa-spin"></i>
        ) : (
          <>
            <span>Soothe Me</span> <i className="fas fa-magic"></i>
          </>
        )}
      </button>

      {output && (
        <div className="flex-1 overflow-y-auto text-sm text-slate-600 italic leading-relaxed border-t border-slate-100 pt-3 custom-scrollbar">
          {output}
        </div>
      )}
    </div>
  );
};

export default ZenGuide;
