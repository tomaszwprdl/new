import React from 'react';

export interface LegalSection {
  title: string;
  content: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function renderLine(line: string, key: React.Key) {
  const trimmed = line.trim();
  if (EMAIL_REGEX.test(trimmed)) {
    return (
      <a
        key={key}
        href={`mailto:${trimmed}`}
        className="text-[#1A2B49] font-semibold underline underline-offset-2 hover:text-[#0D1B33] break-all"
      >
        {trimmed}
      </a>
    );
  }
  return <span key={key}>{line}</span>;
}

function renderBlocks(content: string) {
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (bullets.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="list-disc pl-5 space-y-1 mb-3 text-slate-700">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    );
    bullets = [];
  };

  lines.forEach((line, i) => {
    if (line.startsWith('- ')) {
      bullets.push(line.slice(2));
      return;
    }
    flushBullets();
    if (line.trim().length > 0) {
      blocks.push(
        <p key={`p-${i}`} className="text-slate-700 leading-relaxed mb-3">
          {renderLine(line, `line-${i}`)}
        </p>
      );
    }
  });
  flushBullets();

  return blocks;
}

export default function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <div>
      {sections.map((section) => (
        <section key={section.title} className="mb-7 last:mb-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1A2B49] mb-2">
            {section.title}
          </h2>
          {renderBlocks(section.content)}
        </section>
      ))}
    </div>
  );
}
