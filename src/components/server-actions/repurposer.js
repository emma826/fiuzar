// repurposer.js

function extractMetadata(content) {
    const paragraphs = content.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
    const title = paragraphs[0]?.slice(0, 100);
    const summary = paragraphs[1]?.slice(0, 300);
    const hook = summary?.split('.')[0] + '.';
  
    const takeaways = paragraphs.slice(2, 6).map(p => p.slice(0, 150));
  
    const keywordRegex = /\b\w{5,}\b/g;
    const keywords = [...new Set(content.match(keywordRegex))].slice(0, 10);
  
    const cta = "Want more like this? Follow for updates or subscribe to our newsletter!";
  
    return { title, summary, hook, takeaways, keywords, cta };
  }
  
  function generateForX({ title, hook, takeaways, cta }) {
    const thread = [
      `${hook}\n\n👇 Thread:`,
      ...takeaways.map((point, i) => `${i + 1}. ${point}`),
      `✅ ${cta}`
    ];
    return thread;
  }
  
  function generateForLinkedIn({ summary, takeaways, cta }) {
    return [
      `${summary}\n\nHere’s what you need to know:`,
      ...takeaways.map(t => `• ${t}`),
      `\n${cta}`
    ].join("\n");
  }
  
  function generateForFacebook({ title, summary, keywords, cta }) {
    return [
      `🔥 ${title} 🔥`,
      `\n${summary}`,
      `\n#${keywords.slice(0, 5).join(' #')}`,
      `\n${cta}`
    ].join("\n");
  }
  
  function generateForYouTube({ title, summary, keywords }) {
    return {
      title: title.slice(0, 70),
      description: `${summary}\n\n#${keywords.join(' #')}`.slice(0, 500)
    };
  }
  
  function generateForTikTok({ title, summary, keywords }) {
    return {
      overlayText: title,
      caption: `${summary}\n#${keywords.slice(0, 5).join(' #')}`
    };
  }
  
  function generateForInstagram({ hook, takeaways, keywords, cta }) {
    return [
      `${hook}\n\n`,
      ...takeaways.map(t => `• ${t}`),
      `\n${cta}`,
      `\n#${keywords.slice(0, 5).join(' #')}`
    ].join("\n");
  }
  
  export function repurposeContent(content) {
    const meta = extractMetadata(content);
  
    return {
      title: meta.title,
      summary: meta.summary,
      platforms: {
        x: generateForX(meta),
        linkedin: generateForLinkedIn(meta),
        facebook: generateForFacebook(meta),
        youtube: generateForYouTube(meta),
        tiktok: generateForTikTok(meta),
        instagram: generateForInstagram(meta),
      }
    };
  }