import React from "react";
import ZenGuide from "./components/ZenGuide";
import CanvasWidget from "./components/CanvasWidget";
import { animations } from "./lib/animations";

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-700">
            Serenity Station
          </h1>
          <p className="text-slate-500 mt-2">
            A complete collection of interactive mindfulness tools.
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-500 bg-purple-50 px-3 py-1 rounded-full">
            <i className="fas fa-sparkles"></i>AI Powered
          </span>
        </div>
      </header>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
        {/* 0. AI Guide */}
        <ZenGuide />

        {/* 1. Breathing */}
        <CanvasWidget
          title="1. Rhythmic Breathing"
          type="breathe"
          drawFn={animations.breathe}
          controlType="slider"
          initialValue={4000}
          min={2000}
          max={8000}
          step={100}
        />

        {/* 2. Focus */}
        <CanvasWidget
          title="2. Focus Flow"
          drawFn={animations.focus}
          controlType="slider"
          initialValue={3}
          min={1}
          max={10}
          step={0.5}
        />

        {/* 3. Aqua Tap */}
        <CanvasWidget
          title="3. Aqua Tap"
          drawFn={animations.water}
          controlType="text"
          controlLabel="Tap for ripples"
        />

        {/* 4. Drift Away */}
        <CanvasWidget
          title="4. Drift Away"
          drawFn={animations.bubbles}
          controlType="text"
          controlLabel="Pop the bubbles"
        />

        {/* 5. Zen Canvas */}
        <CanvasWidget
          title="5. Zen Canvas"
          drawFn={animations.zen}
          controlType="text"
          controlLabel="Draw impermanent lines"
        />

        {/* 6. Firefly Forest */}
        <CanvasWidget
          title="6. Firefly Forest"
          titleColor="text-slate-200"
          drawFn={animations.firefly}
          controlType="text"
          controlLabel="Move mouse to attract"
        />

        {/* 7. Cosmic Voyage */}
        <CanvasWidget
          title="7. Cosmic Voyage"
          titleColor="text-slate-200"
          drawFn={animations.cosmic}
          controlType="text"
          controlLabel="Warp speed visualization"
        />

        {/* 8. Digital Rain */}
        <CanvasWidget
          title="8. Digital Rain"
          titleColor="text-green-400"
          drawFn={animations.matrix}
          controlType="text"
          controlLabel="Flowing code"
        />

        {/* 9. Winter Peace */}
        <CanvasWidget
          title="9. Winter Peace"
          drawFn={animations.snow}
          controlType="text"
          controlLabel="Gentle snowfall"
        />

        {/* 10. Aurora Waves */}
        <CanvasWidget
          title="10. Aurora Waves"
          titleColor="text-slate-200"
          drawFn={animations.aurora}
          controlType="text"
          controlLabel="Drifting colors"
        />

        {/* 11. Mandala Mirror */}
        <CanvasWidget
          title="11. Mandala Mirror"
          drawFn={animations.mandala}
          controlType="text"
          controlLabel="Draw for symmetry"
        />

        {/* 12. Spirit Strings */}
        <CanvasWidget
          title="12. Spirit Strings"
          drawFn={animations.strings}
          controlType="text"
          controlLabel="Pluck the strings"
        />

        {/* 13. Hypno Spiral */}
        <CanvasWidget
          title="13. Hypno Spiral"
          drawFn={animations.spiral}
          controlType="text"
          controlLabel="Deep focus"
        />

        {/* 14. Joy Pop */}
        <CanvasWidget
          title="14. Joy Pop"
          drawFn={animations.confetti}
          controlType="text"
          controlLabel="Click for confetti"
        />

        {/* 15. Lanterns */}
        <CanvasWidget
          title="15. Lanterns"
          titleColor="text-slate-200"
          drawFn={animations.lanterns}
          controlType="text"
          controlLabel="Rising hopes"
        />

        {/* 16. Lava Lamp */}
        <CanvasWidget
          title="16. Lava Lamp"
          drawFn={animations.lava}
          controlType="text"
          controlLabel="Morphing blobs"
        />

        {/* 17. Solar Harmony */}
        <CanvasWidget
          title="17. Solar Harmony"
          titleColor="text-slate-200"
          drawFn={animations.solar}
          controlType="text"
          controlLabel="Orbital balance"
        />

        {/* 18. Kinetic */}
        <CanvasWidget
          title="18. Kinetic"
          drawFn={animations.newton}
          controlType="text"
          controlLabel="Momentum"
        />

        {/* 19. Bloom */}
        <CanvasWidget
          title="19. Bloom"
          drawFn={animations.bloom}
          controlType="text"
          controlLabel="Expanding circles"
        />

        {/* 20. Balance */}
        <CanvasWidget
          title="20. Balance"
          drawFn={animations.yinyang}
          controlType="text"
          controlLabel="Finding center"
        />
      </div>
    </div>
  );
}

export default App;
