import { useState } from 'react';
import { giveawayService } from '../services/giveawayService';

interface FormState {
  content: string;
  numberOfWinners: number;
  numberOfSubstitutes: number;
}

export function Giveaway() {
  const [form, setForm] = useState<FormState>({ content: '', numberOfWinners: 1, numberOfSubstitutes: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [giveawayId, setGiveawayId] = useState<string | null>(null);
  const [participationUrl, setParticipationUrl] = useState<string | null>(null);
  const [endLoading, setEndLoading] = useState(false);
  const [endError, setEndError] = useState<string | null>(null);
  const [results, setResults] = useState<{ winners: string[]; substitutes: string[] } | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const response = await giveawayService.createGiveaway(form.content, form.numberOfWinners, form.numberOfSubstitutes);
      if (!response) {
        setError('Request failed');
      } else if (!response.data.success) {
        setError(response.data.message || 'Creation failed');
      } else {
        setGiveawayId(response.data.data.GiveawayId);
        setParticipationUrl(response.data.data.ParticipationURL);
      }
    } catch {
      setError('Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  async function onEnd() {
    if (!giveawayId) return;
    setEndLoading(true);
    setEndError(null);
    try {
      const response = await giveawayService.endGiveaway(giveawayId);
      if (!response) {
        setEndError('Request failed');
      } else if (!response.data.success) {
        setEndError(response.data.message || 'End failed');
      } else {
        setResults({ winners: response.data.data.Winners, substitutes: response.data.data.Substitutes });
      }
    } catch {
      setEndError('Unexpected error');
    } finally {
      setEndLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Giveaway Manager</h1>
      <form onSubmit={onCreate} className="space-y-4 border p-4 rounded">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Content</label>
          <textarea
            className="border rounded p-2"
            value={form.content}
            onChange={e => update('content', e.target.value)}
            required
            rows={3}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Winners</label>
            <input
              type="number"
              min={1}
              className="border rounded p-2"
              value={form.numberOfWinners}
              onChange={e => update('numberOfWinners', parseInt(e.target.value, 10) || 1)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Substitutes</label>
            <input
              type="number"
              min={0}
              className="border rounded p-2"
              value={form.numberOfSubstitutes}
              onChange={e => update('numberOfSubstitutes', parseInt(e.target.value, 10) || 0)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Giveaway'}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>

      {participationUrl && (
        <section className="border p-4 rounded space-y-2">
          <h2 className="font-medium">Giveaway Created</h2>
          <p className="text-sm">ID: <span className="font-mono">{giveawayId}</span></p>
          <p className="text-sm break-all">URL: <a href={participationUrl} className="text-blue-700" target="_blank" rel="noreferrer">{participationUrl}</a></p>
          <button
            onClick={onEnd}
            disabled={endLoading}
            className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {endLoading ? 'Ending...' : 'End Giveaway'}
          </button>
          {endError && <p className="text-red-600 text-sm">{endError}</p>}
        </section>
      )}

      {results && (
        <section className="border p-4 rounded space-y-2">
          <h2 className="font-medium">Results</h2>
          <div>
            <p className="text-sm font-semibold">Winners:</p>
            {results.winners.length === 0 ? <p className="text-xs">None</p> : (
              <ul className="list-disc ml-5 text-sm">
                {results.winners.map(w => <li key={w}>{w}</li>)}
              </ul>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold">Substitutes:</p>
            {results.substitutes.length === 0 ? <p className="text-xs">None</p> : (
              <ul className="list-disc ml-5 text-sm">
                {results.substitutes.map(s => <li key={s}>{s}</li>)}
              </ul>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
