/**
 * @rj-business-solutions/integrations
 * Integration adapters for RJ Business Solutions infrastructure
 */

export * from './ghl.js';
export * from './stripe.js';
export * from './jukeyman.js';
export * from './cloudflare.js';

export const RJ_CONFIG = {
  brand: {
    name: 'RJ Business Solutions',
    website: 'https://rjbusinesssolutions.org',
    email: 'support@rjbusinesssolutions.org',
    github: 'rjbizsolution23-wq',
    address: '1342 NM 333, Tijeras, New Mexico 87059',
    colors: {
      cyan: '#06b6d4',
      pink: '#ec4899',
      dark: '#030712',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #ec4899 100%)',
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter',
      mono: 'Space Grotesk',
    },
  },
  jukeyman: {
    workerUrl: 'https://jukeyman-agents.rjbusiness.workers.dev',
    mcpUrl: 'https://jukeyman-agents.rjbusiness.workers.dev/mcp',
    kvNamespaceId: '4bfb9b2e73de4ffba823d31d56e85f87',
  },
  models: {
    primary: 'claude-sonnet-4-6',
    orchestrator: 'claude-opus-5',
    fast: 'moonshotai/kimi-k2',
    edge: '@cf/meta/llama-4-scout-17b-16e-instruct',
  },
} as const;
