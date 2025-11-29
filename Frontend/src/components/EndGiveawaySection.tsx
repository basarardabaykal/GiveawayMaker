import { useState } from 'react';
import QRCode from 'react-qr-code';
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
    <section className="space-y-4">
        <div className="bg-gray-50 border rounded p-4">
          <h2 className="font-semibold text-lg">Giveaway Ready</h2>
          <p className="text-sm mt-1">ID: <span className="font-mono">{giveawayId}</span></p>
        </div>
        <div className="bg-white border rounded p-6">
          <div className="flex flex-col items-center gap-4">
            <p className="text-base">Scan or tap to participate</p>
            <a
              href={participationUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open participation link"
              className="inline-block bg-white p-4 rounded shadow cursor-pointer hover:shadow-md transition"
            >
              <div className="w-full flex justify-center">
                <QRCode
                  value={participationUrl}
                  size={512}
                  className="w-[70vw] max-w-[540px] md:w-[60vh] h-auto"
                />
              </div>
            </a>
            <p className="text-xs break-all text-gray-600">{participationUrl}</p>
          </div>
        </div>
      <div className="flex justify-center">
        <button
          onClick={onEnd}
          disabled={endLoading}
          className="bg-red-600 text-white px-5 py-2 rounded w-full disabled:opacity-50"
        >
          {endLoading ? 'Ending...' : 'End Giveaway'}
        </button>
      </div>
      {endError && <p className="text-red-600 text-sm">{endError}</p>}
      {endMessage && !endError && <p className="text-green-700 text-sm">{endMessage}</p>}

      {results && (
        <div className="space-y-2">
          <h3 className="font-medium">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold">Winners</p>
              {results.winners.length === 0 ? <p className="text-xs">None</p> : (
                <ul className="list-disc ml-5 text-sm">
                  {results.winners.map(w => <li key={w}>{w}</li>)}
                </ul>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold">Substitutes</p>
              {results.substitutes.length === 0 ? <p className="text-xs">None</p> : (
                <ul className="list-disc ml-5 text-sm">
                  {results.substitutes.map(s => <li key={s}>{s}</li>)}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
