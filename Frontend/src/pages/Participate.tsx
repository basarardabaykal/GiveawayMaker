import { useEffect, useMemo, useState } from 'react';
import { participatorService } from '../services/participatorService';
import { AppLayout } from '../components/AppLayout';

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
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ipAddress, setIpAddress] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(r => r.ok ? r.json() : Promise.reject(new Error('ip fetch failed')))
      .then(data => setIpAddress(data.ip))
      .catch(() => setIpAddress(''));
  }, []);

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
    const result = await participatorService.joinGiveaway({
      FullName: fullName,
      PhoneNumber: phoneNumber,
      FingerPrintId: getOrCreateFingerprint(),
      IpAddress: ipAddress || 'unknown',
      AuthProvider: 'local',
      ProviderUserId: getOrCreateFingerprint(),
      GiveawayId: giveawayId || "",
    });
    if (!result.success) {
      setError(result.message || 'Join failed');
    } else {
      setMessage(result.message || 'Successfully joined');
      setFullName('');
      setPhoneNumber('');
    }
    setLoading(false);
  }

  return (
    <AppLayout title="Participate in Giveaway">
      <div className="space-y-3">
        <p className="text-sm">Giveaway ID: <span className="font-mono">{giveawayId}</span></p>
        <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Full Name</label>
          <input
            type="text"
            className="border rounded p-2"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Phone Number</label>
          <input
            type="tel"
            className="border rounded p-2"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50">
          {loading ? 'Joining...' : 'Join Giveaway'}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && !error && <p className="text-green-700 text-sm">{message}</p>}
        </form>
      </div>
    </AppLayout>
  );
}
