import React, { useRef, useEffect, useState } from "react";

const CanvasWidget = ({
  title,
  type,
  drawFn,
  controlType = "none",
  controlLabel = "",
  min,
  max,
  step,
  initialValue,
  titleColor = "text-slate-700",
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const sliderRef = useRef(initialValue);
  const requestRef = useRef();
  const interactionRef = useRef({ x: 0, y: 0, isDown: false, clicked: false });
  const dataRef = useRef({});

  // State to track full screen status
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleSliderChange = (e) => {
    sliderRef.current = parseFloat(e.target.value);
  };

  // --- Interaction Handlers ---
  const handleMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    // Safety check if touch/mouse event is valid
    if (clientX !== undefined) {
      interactionRef.current.x = clientX - rect.left;
      interactionRef.current.y = clientY - rect.top;
    }
  };

  const handleDown = (e) => {
    handleMove(e);
    interactionRef.current.isDown = true;
    interactionRef.current.clicked = true;
  };

  const handleUp = () => {
    interactionRef.current.isDown = false;
  };

  // --- Full Screen Logic ---
  const toggleFullScreen = () => {
    const elem = containerRef.current;

    if (!document.fullscreenElement) {
      // Enter Full Screen
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    } else {
      // Exit Full Screen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Listen for native full screen changes (e.g. user pressing ESC key)
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
      // Trigger a resize logic slightly after transition
      setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);

  // --- Canvas Animation Loop ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      if (containerRef.current && canvas) {
        // We use window.innerWidth/Height in fullscreen to ensure it covers everything
        // Otherwise we use the container's size
        const width = document.fullscreenElement
          ? window.innerWidth
          : containerRef.current.clientWidth;
        const height = document.fullscreenElement
          ? window.innerHeight
          : containerRef.current.clientHeight;

        canvas.width = width;
        canvas.height = height;
      }
    };

    window.addEventListener("resize", resize);
    // Call resize immediately to set initial size
    resize();

    const animate = () => {
      if (drawFn && canvas) {
        drawFn(ctx, {
          width: canvas.width,
          height: canvas.height,
          valueRef: sliderRef,
          interactionRef,
          dataRef,
        });
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [drawFn]); // Re-run if draw function changes

  return (
    <div
      ref={containerRef}
      className={`
                bg-white transition-all duration-300 relative overflow-hidden flex flex-col group
                ${
                  isFullScreen
                    ? "fixed inset-0 z-50 w-screen h-screen rounded-none" // Fullscreen styles
                    : "widget-card rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 h-[350px]" // Normal styles
                }
            `}
    >
      {/* Title Overlay (Hide in Fullscreen unless hovered? Or keep strictly hidden for immersion) */}
      {!isFullScreen && (
        <div className="absolute top-4 left-6 z-10 pointer-events-none">
          <h2 className={`font-bold text-lg ${titleColor}`}>{title}</h2>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
        onTouchStart={handleDown}
        onTouchMove={handleMove}
        onTouchEnd={handleUp}
      />

      {/* Controls Bar */}
      {!isFullScreen && (
        <div
          className={`
                absolute bottom-0 left-0 right-0 p-3 px-4 bg-white/85 backdrop-blur-sm border-t border-slate-100 flex items-center gap-4 transition-transform duration-300
                opacity-100
                ${
                  controlType === "text" ? "justify-between" : "justify-between"
                }
            `}
        >
          {/* Left Side: Controls */}
          <div className="flex-1 flex items-center gap-4">
            {controlType === "slider" && (
              <>
                <i
                  className={`fas fa-${
                    type === "breathe" ? "lungs" : "eye"
                  } text-slate-400`}
                ></i>
                <input
                  type="range"
                  defaultValue={initialValue}
                  min={min}
                  max={max}
                  step={step}
                  onChange={handleSliderChange}
                  className="w-full max-w-[150px]"
                />
              </>
            )}
            {controlType === "text" && (
              <span className="text-sm text-slate-400 mx-auto">
                {controlLabel}
              </span>
            )}
          </div>

          {/* Right Side: Expand Button */}
          <button
            onClick={toggleFullScreen}
            className="text-slate-400 hover:text-purple-500 transition-colors p-1"
            title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
          >
            <i className={`fas fa-${isFullScreen ? "compress" : "expand"}`}></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default CanvasWidget;
