/**
 * GoHighLevel CRM adapter for RJ Business Solutions
 */

const GHL_BASE_URL = 'https://rest.gohighlevel.com/v1';

export interface GHLContact {
  id?: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  tags?: string[];
  customFields?: Record<string, string>;
}

export interface GHLContactCreateResult {
  contact: { id: string; email: string; firstName: string };
}

export class GHLClient {
  private readonly apiKey: string;
  private readonly locationId: string;

  constructor(apiKey: string, locationId: string) {
    this.apiKey = apiKey;
    this.locationId = locationId;
  }

  private headers(): HeadersInit {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    };
  }

  async createContact(contact: GHLContact): Promise<GHLContactCreateResult> {
    const res = await fetch(`${GHL_BASE_URL}/contacts/`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({ ...contact, locationId: this.locationId }),
    });
    if (!res.ok) throw new Error(`GHL createContact failed: ${res.status} ${await res.text()}`);
    return res.json() as Promise<GHLContactCreateResult>;
  }

  async updateContact(contactId: string, updates: Partial<GHLContact>): Promise<void> {
    const res = await fetch(`${GHL_BASE_URL}/contacts/${contactId}`, {
      method: 'PUT',
      headers: this.headers(),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`GHL updateContact failed: ${res.status} ${await res.text()}`);
  }

  async addTags(contactId: string, tags: string[]): Promise<void> {
    const res = await fetch(`${GHL_BASE_URL}/contacts/${contactId}/tags`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({ tags }),
    });
    if (!res.ok) throw new Error(`GHL addTags failed: ${res.status} ${await res.text()}`);
  }

  async addToCampaign(contactId: string, campaignId: string): Promise<void> {
    const res = await fetch(`${GHL_BASE_URL}/contacts/${contactId}/campaigns/${campaignId}`, {
      method: 'POST',
      headers: this.headers(),
    });
    if (!res.ok) throw new Error(`GHL addToCampaign failed: ${res.status} ${await res.text()}`);
  }

  async getContact(contactId: string): Promise<GHLContact & { id: string }> {
    const res = await fetch(`${GHL_BASE_URL}/contacts/${contactId}`, {
      headers: this.headers(),
    });
    if (!res.ok) throw new Error(`GHL getContact failed: ${res.status}`);
    const data = await res.json() as { contact: GHLContact & { id: string } };
    return data.contact;
  }

  async lookupByEmail(email: string): Promise<(GHLContact & { id: string }) | null> {
    const res = await fetch(
      `${GHL_BASE_URL}/contacts/lookup?email=${encodeURIComponent(email)}`,
      { headers: this.headers() },
    );
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GHL lookupByEmail failed: ${res.status}`);
    const data = await res.json() as { contacts: Array<GHLContact & { id: string }> };
    return data.contacts[0] ?? null;
  }

  async upsertContact(contact: GHLContact): Promise<string> {
    const existing = await this.lookupByEmail(contact.email);
    if (existing?.id) {
      await this.updateContact(existing.id, contact);
      return existing.id;
    }
    const result = await this.createContact(contact);
    return result.contact.id;
  }
}

export function createGHLClient(env: { GHL_API_KEY: string; GHL_LOCATION_ID: string }): GHLClient {
  return new GHLClient(env.GHL_API_KEY, env.GHL_LOCATION_ID);
}
