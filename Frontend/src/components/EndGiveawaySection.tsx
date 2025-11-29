import { useState } from 'react';
import { giveawayService } from '../services/giveawayService';

export function EndGiveawaySection({ giveawayId, participationUrl }: { giveawayId: string; participationUrl: string }) {
  const [endLoading, setEndLoading] = useState(false);
  const [endError, setEndError] = useState<string | null>(null);
  const [results, setResults] = useState<{ winners: string[]; substitutes: string[] } | null>(null);

  async function onEnd() {
    setEndLoading(true);
    setEndError(null);
    try {
      const response = await giveawayService.endGiveaway(giveawayId);
      if (!response) {
        setEndError('Request failed');
      } else {
        const d = response.data ?? {};
        const success = d.Success ?? d.success;
        const message = d.Message ?? d.message;
        const data = d.Data ?? d.data;
        if (!success) {
          setEndError(message || 'End failed');
        } else if (!data) {
          setEndError('Empty response data');
        } else {
          setResults({ winners: (data.Winners ?? data.winners) || [], substitutes: (data.Substitutes ?? data.substitutes) || [] });
        }
      }
    } catch {
      setEndError('Unexpected error');
    } finally {
      setEndLoading(false);
    }
  }

  return (
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

      {results && (
        <div className="space-y-2">
          <h3 className="font-medium">Results</h3>
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
        </div>
      )}
    </section>
  );
}
