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
          />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {loading ? 'Joining...' : 'Join Giveaway'}
        </button>
        {error && <div className="bg-red-50 border border-red-200 rounded p-3"><p className="text-red-700 text-sm">{error}</p></div>}
        {message && !error && <div className="bg-green-50 border border-green-200 rounded p-3"><p className="text-green-700 text-sm">{message}</p></div>}
        </form>
      </div>
    </AppLayout>
  );
}
