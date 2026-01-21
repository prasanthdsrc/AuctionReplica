import { auctions as staticAuctions } from '@/lib/data';
import type { Auction } from '@/lib/types';

const API_BASE = '/api';

export async function getAuctions(): Promise<Auction[]> {
  try {
    const response = await fetch(`${API_BASE}/auctions`);
    if (!response.ok) {
      throw new Error('Failed to fetch auctions');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    return staticAuctions;
  }
}

export async function getAuctionById(id: string): Promise<Auction | undefined> {
  try {
    const response = await fetch(`${API_BASE}/auctions/${id}`);
    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error('Failed to fetch auction');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    return staticAuctions.find((a) => a.id === id);
  }
}

export async function getAuctionsByStatus(
  status: 'upcoming' | 'open' | 'closed'
): Promise<Auction[]> {
  try {
    const response = await fetch(`${API_BASE}/auctions?status=${status}`);
    if (!response.ok) {
      throw new Error('Failed to fetch auctions');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    return staticAuctions.filter((a) => a.status === status);
  }
}

export async function getCurrentAuctions(): Promise<Auction[]> {
  try {
    const response = await fetch(`${API_BASE}/auctions?status=open&status=upcoming`);
    if (!response.ok) {
      throw new Error('Failed to fetch auctions');
    }
    return response.json();
  } catch (error) {
    console.warn('API not available, using static data');
    return staticAuctions.filter((a) => a.status === 'open' || a.status === 'upcoming');
  }
}
