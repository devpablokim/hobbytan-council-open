import React from 'react';

const FormattedText = ({ text }) => {
  if (!text) return null;

  // 1. Regex for Markdown links: [label](url)
  const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  // 2. Regex for raw URLs (simple version)
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // We need to parse strictly. Let's do a simple split approach.
  // Actually, keeping it simple: First replace MD links with a special marker, then split by URLs?
  // Let's iterate.

  const parts = [];
  let lastIndex = 0;

  // Combine regex logic or just handle raw URLs if Markdown parsing is too complex for a quick fix.
  // The logs show Markdown style links: [회의록 (Log)](https://...)
  
  // Let's use a simple parser function
  const parseLine = (line) => {
      // Split by Markdown links first
      const mdParts = [];
      let match;
      let currentIndex = 0;
      
      // Reset regex state
      mdLinkRegex.lastIndex = 0;
      
      while ((match = mdLinkRegex.exec(line)) !== null) {
          // Push text before match
          if (match.index > currentIndex) {
              mdParts.push({ type: 'text', content: line.slice(currentIndex, match.index) });
          }
          // Push link
          mdParts.push({ type: 'link', label: match[1], url: match[2] });
          currentIndex = match.index + match[0].length;
      }
      // Push remaining text
      if (currentIndex < line.length) {
          mdParts.push({ type: 'text', content: line.slice(currentIndex) });
      }
      
      return mdParts.flatMap(part => {
          if (part.type === 'link') {
              return <a href={part.url} target="_blank" rel="noopener noreferrer" style={{ color: '#00f3ff', textDecoration: 'underline' }}>{part.label}</a>;
          }
          // Now check for raw URLs in the text part
          const urlParts = part.content.split(urlRegex);
          return urlParts.map((subPart, i) => {
              if (subPart.match(/^https?:\/\//)) {
                  return <a key={i} href={subPart} target="_blank" rel="noopener noreferrer" style={{ color: '#00f3ff', textDecoration: 'underline', wordBreak: 'break-all' }}>{subPart}</a>;
              }
              return subPart;
          });
      });
  };

  return (
      <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {text.split('\n').map((line, i) => (
              <div key={i}>
                  {parseLine(line)}
              </div>
          ))}
      </div>
  );
};

export default FormattedText;
