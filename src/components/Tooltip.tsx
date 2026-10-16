'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  text: string;
}

export function Tooltip({ text }: TooltipProps) {
  const tooltipId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  // Set by Escape while focused: hides the bubble until the next blur/focus cycle.
  const [focusDismissed, setFocusDismissed] = useState(false);

  const visible = hovered || (focused && !focusDismissed) || pinned;

  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setHovered(false);
        setPinned(false);
        setFocusDismissed(true);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (
        wrapperRef.current &&
        event.target instanceof Node &&
        !wrapperRef.current.contains(event.target)
      ) {
        setHovered(false);
        setPinned(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [visible]);

  return (
    <div ref={wrapperRef} className="relative inline-block ml-1">
      <button
        type="button"
        aria-label="More information"
        aria-expanded={visible}
        aria-describedby={visible ? tooltipId : undefined}
        onClick={() => {
          if (visible) {
            setHovered(false);
            setPinned(false);
            setFocusDismissed(true);
          } else {
            setPinned(true);
          }
        }}
        onFocus={() => {
          setFocused(true);
          setFocusDismissed(false);
        }}
        onBlur={() => {
          setFocused(false);
          setFocusDismissed(false);
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') setHovered(false);
        }}
        className="p-1 text-gray-500 hover:text-blue-400 cursor-help"
      >
        <Info className="w-4 h-4" />
      </button>
      {visible && (
        <div
          role="tooltip"
          id={tooltipId}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 max-w-[calc(100vw-2rem)] bg-gray-900 border border-gray-600 p-3 rounded-sm text-xs text-gray-200 shadow-xl z-50 pointer-events-none leading-tight"
        >
          {text}
        </div>
      )}
    </div>
  );
}
