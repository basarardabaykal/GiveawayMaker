import { useState } from 'react';
import { giveawayService } from '../services/giveawayService';

export function EndGiveawaySection({ giveawayId, participationUrl }: { giveawayId: string; participationUrl: string }) {
  const [endLoading, setEndLoading] = useState(false);
  const [endError, setEndError] = useState<string | null>(null);
  const [endMessage, setEndMessage] = useState<string | null>(null);
  const [results, setResults] = useState<{ winners: string[]; substitutes: string[] } | null>(null);

  async function onEnd() {
    setEndLoading(true);
    setEndError(null);
    setEndMessage(null);
    const result = await giveawayService.endGiveaway(giveawayId);
    if (!result.success) {
      setEndError(result.message || 'End failed');
    } else if (!result.data) {
      setEndError('Empty response data');
    } else {
      if (result.message) setEndMessage(result.message);
      const data: any = result.data;
      setResults({ winners: (data.Winners ?? data.winners) || [], substitutes: (data.Substitutes ?? data.substitutes) || [] });
    }
    setEndLoading(false);
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
      {endMessage && !endError && <p className="text-green-700 text-sm">{endMessage}</p>}

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
