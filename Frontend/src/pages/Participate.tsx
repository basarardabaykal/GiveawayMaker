import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { participatorService } from '../services/participatorService';
import { AppLayout } from '../components/AppLayout';
import { isValidInternationalPhone } from '../lib/phone';

function getQueryGiveawayId(): string | null {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('giveawayId');
  } catch {
    return null;
  }
}

function getOrCreateFingerprint(): string {
  try {
    const key = 'fingerprintId';
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const fp = crypto.randomUUID();
    localStorage.setItem(key, fp);
    return fp;
  } catch {
    return `${navigator.userAgent}-${Date.now()}`;
  }
}

export function Participate() {
  const giveawayId = useMemo(() => getQueryGiveawayId(), []);
  const fingerprint = useMemo(() => getOrCreateFingerprint(), []);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ipAddress, setIpAddress] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [locked, setLocked] = useState<boolean>(false);
  const [lockedReason, setLockedReason] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(r => r.ok ? r.json() : Promise.reject(new Error('ip fetch failed')))
      .then(data => setIpAddress(data.ip))
      .catch(() => setIpAddress(''));
  }, []);

  useEffect(() => {
    if (!giveawayId) return;
    try {
      const key = `giveawayJoined:${giveawayId}:${fingerprint}`;
      const val = localStorage.getItem(key);
      if (val === 'true') {
        setLocked(true);
        setLockedReason('You have already joined this giveaway.');
      }
    } catch {}
  }, [giveawayId, fingerprint]);

  if (!giveawayId) {
    return (
      <AppLayout title="Participate">
        <p className="text-red-600">Missing giveawayId in URL.</p>
      </AppLayout>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const schema = z.object({
      FullName: z.string().min(1, 'Full name is required'),
      PhoneNumber: z.string().refine(isValidInternationalPhone, {
        message: 'Enter a valid phone number including country code (e.g., 905061919083)',
      }),
    });
    const parsed = schema.safeParse({ FullName: fullName, PhoneNumber: phoneNumber });
    if (!parsed.success) {
      setLoading(false);
      setError(parsed.error.issues.map((issue) => issue.message).join(' '));
      return;
    }
    const result = await participatorService.joinGiveaway({
      FullName: fullName,
      PhoneNumber: phoneNumber,
      FingerPrintId: fingerprint,
      IpAddress: ipAddress || 'unknown',
      AuthProvider: 'local',
      ProviderUserId: fingerprint,
      GiveawayId: giveawayId || "",
    });
    if (!result.success) {
      setError(result.message || 'Join failed');
      if (result.statusCode === 400 && (result.message?.toLowerCase().includes('deactivated') || result.message?.toLowerCase().includes('not allowed'))) {
        setLocked(true);
        setLockedReason('Giveaway is deactivated.');
      }
      if (result.statusCode === 409 && (result.message?.toLowerCase().includes('already joined'))) {
        setLocked(true);
        setLockedReason('You have already joined this giveaway.');
      }
    } else {
      setMessage(result.message || 'Successfully joined');
      setFullName('');
      setPhoneNumber('');
      try {
        const key = `giveawayJoined:${giveawayId}:${fingerprint}`;
        localStorage.setItem(key, 'true');
        setLocked(true);
        setLockedReason('You have already joined this giveaway.');
      } catch {}
    }
    setLoading(false);
  }

  return (
    <AppLayout title="Participate in Giveaway">
      <div className="space-y-5">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-600">Giveaway ID</p>
          <p className="font-mono font-semibold text-gray-900">{giveawayId}</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your full name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
            disabled={locked}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            required
            disabled={locked}
          />
          <p className="text-xs text-gray-500">Include country code. Example: 905061919083</p>
        </div>
        <button type="submit" disabled={loading || locked} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {locked ? (lockedReason || 'Joining disabled') : (loading ? 'Joining...' : 'Join Giveaway')}
        </button>
        {error && <div className="bg-red-50 border border-red-200 rounded p-3"><p className="text-red-700 text-sm">{error}</p></div>}
        {message && !error && <div className="bg-green-50 border border-green-200 rounded p-3"><p className="text-green-700 text-sm">{message}</p></div>}
        </form>
      </div>
    </AppLayout>
  );
}
