"use client";

import { useEffect, useRef, useState } from "react";
import { Window } from "@/components/window";
import { runCommand, type TerminalContext, type TerminalStrings } from "./commands";

type Entry = { id: number; input: string; lines: string[] };

const MAX_ENTRIES = 8;

export function AskTerminal({
  context,
  strings,
  lang,
}: {
  context: TerminalContext;
  strings: TerminalStrings;
  lang: string;
}) {
  const [history, setHistory] = useState<Entry[]>(() => [
    { id: 0, input: "help", lines: runCommand("help", context, strings, lang).lines },
  ]);
  const [value, setValue] = useState("");
  const nextId = useRef(1);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = value.trim();
    setValue("");
    if (!input) return;
    const result = runCommand(input, context, strings, lang);
    if (result.clear) {
      setHistory([]);
      return;
    }
    const entry = { id: nextId.current++, input, lines: result.lines };
    setHistory((prev) => [...prev, entry].slice(-MAX_ENTRIES));
  }

  return (
    <Window title={strings.windowTitle} className="mt-6 max-w-md">
      <div
        ref={outputRef}
        aria-live="polite"
        className="max-h-64 overflow-y-auto whitespace-pre-wrap break-words"
      >
        {history.map((entry) => (
          <div key={entry.id} className="mb-2">
            <p className="text-accent">&gt; {entry.input}</p>
            {entry.lines.map((line, i) => (
              <p key={i} className="text-muted">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span aria-hidden="true" className="text-accent">
          &gt;
        </span>
        <input
          aria-label={strings.inputLabel}
          placeholder={strings.placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-base text-foreground sm:text-xs placeholder:text-muted/60 focus:outline-none"
        />
      </form>
    </Window>
  );
}
