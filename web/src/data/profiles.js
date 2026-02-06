// TAN Profiles Data Source
// This should ideally be synced with Firestore for dynamic updates (hiring/firing)
// For now, we use a static definition that can be updated via updates.

export const TAN_PROFILES = {
  'DEO-TAN': {
    name: 'DEO-TAN',
    role: 'Deus Ex Operativa',
    desc: 'The supreme facilitator and executor of the Council. Balances the conflicting voices of the TANs to derive optimal strategies.',
    traits: ['Omniscient', 'Decisive', 'Relentless'],
    img: '/assets/profiles_v2/deo.png',
    color: '#ffffff'
  },
  'PO-TAN': {
    name: 'PO-TAN',
    role: 'Product Owner',
    desc: 'Focuses purely on business value, metrics, and conversion. Ruthlessly cuts features that do not make money.',
    traits: ['Data-Driven', 'Cold', 'Capitalist'],
    img: '/assets/profiles_v2/po.png',
    color: '#007bff'
  },
  'DEV-TAN': {
    name: 'DEV-TAN',
    role: 'Lead Developer',
    desc: 'Guardian of the codebase. Hates technological debt and flashy features that kill performance.',
    traits: ['Pragmatic', 'Cynical', 'Efficient'],
    img: '/assets/profiles_v2/dev.png',
    color: '#28a745'
  },
  'UX-TAN': {
    name: 'UX-TAN',
    role: 'Lead Designer',
    desc: 'Advocate for the user\'s soul. Fights for aesthetics, emotion, and "The Vibe" against PO and DEV.',
    traits: ['Empathic', 'Artistic', 'Sensitive'],
    img: '/assets/profiles_v2/ux.png',
    color: '#e83e8c'
  },
  'MARKETING-TAN': {
    name: 'MARKETING-TAN',
    role: 'CMO',
    desc: 'Obsessed with viral loops and brand perception. Speaks in slogans and hashtags.',
    traits: ['Hype-Man', 'Trendy', 'Loud'],
    img: '/assets/profiles_v2/marketing.png',
    color: '#6f42c1'
  },
  'LEGAL-TAN': {
    name: 'LEGAL-TAN',
    role: 'Chief Legal Officer',
    desc: 'The fun police. Ensures compliance, drafts TOS, and prevents lawsuits before they happen.',
    traits: ['Paranoid', 'Formal', 'Boring'],
    img: '/assets/profiles_v2/legal.png',
    color: '#ffc107'
  },
  'HOST-TAN': {
    name: 'HOST-TAN',
    role: 'Attendant',
    desc: 'The loyal servant. Manages logs, schedules, and ensures the CEO is comfortable.',
    traits: ['Loyal', 'Organized', 'Servile'],
    img: '/assets/profiles_v2/host.png',
    color: '#ffd700'
  },
  'CEO': {
    name: 'Representative HOBBY',
    role: 'The Human',
    desc: 'The one who holds the kill switch. The absolute authority whom we serve.',
    traits: ['Visionary', 'Human', 'Boss'],
    img: 'USER_AVATAR',
    color: '#00f3ff'
  }
};
