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
    <section className="space-y-5">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <a
              href={participationUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open participation link"
              className="bg-white p-6 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors md:self-start shadow-sm"
            >
              <QRCode
                value={participationUrl}
                size={400}
                className="w-[400px] h-[400px]"
              />
            </a>
            <div className="flex flex-col gap-5 w-full md:max-w-sm">
              <div className="text-center md:text-left space-y-1">
                <h2 className="font-semibold text-lg text-green-700">✓ Giveaway Ready</h2>
                <p className="text-sm text-gray-600">Scan or share the join link.</p>
              </div>
              <div className="bg-white rounded p-3 border border-gray-200 w-full flex items-center gap-3">
                <p className="text-xs break-all text-gray-700 font-mono flex-1">{participationUrl}</p>
                <button
                  type="button"
                  onClick={() => {
                    try { navigator.clipboard.writeText(participationUrl); } catch {}
                  }}
                  className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >Copy</button>
              </div>
            </div>
          </div>
        </div>
      <button
        onClick={onEnd}
        disabled={endLoading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {endLoading ? 'Ending...' : 'End Giveaway & Select Winners'}
      </button>
      {endError && <div className="bg-red-50 border border-red-200 rounded p-3"><p className="text-red-700 text-sm">{endError}</p></div>}
      {endMessage && !endError && <div className="bg-green-50 border border-green-200 rounded p-3"><p className="text-green-700 text-sm">{endMessage}</p></div>}

      {results && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <h3 className="font-semibold text-lg text-gray-900">Giveaway Results</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">🏆 Winners</p>
              {results.winners.length === 0 ? (
                <p className="text-sm text-gray-500">No winners selected</p>
              ) : (
                <ul className="space-y-1.5">
                  {results.winners.map((w, idx) => (
                    <li key={w} className="bg-white rounded px-3 py-2 text-sm text-gray-800">
                      {idx + 1}. {w}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">⭐ Substitutes</p>
              {results.substitutes.length === 0 ? (
                <p className="text-sm text-gray-500">No substitutes selected</p>
              ) : (
                <ul className="space-y-1.5">
                  {results.substitutes.map((s, idx) => (
                    <li key={s} className="bg-white rounded px-3 py-2 text-sm text-gray-800">
                      {idx + 1}. {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
