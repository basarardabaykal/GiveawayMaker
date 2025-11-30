import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { giveawayService } from '../services/giveawayService';

export function EndGiveawaySection({ giveawayId, participationUrl }: { giveawayId: string; participationUrl: string }) {
  const [endLoading, setEndLoading] = useState(false);
  const [endError, setEndError] = useState<string | null>(null);
  const [endMessage, setEndMessage] = useState<string | null>(null);
  const [results, setResults] = useState<{ winners: string[]; substitutes: string[] } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

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
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-start gap-10 md:gap-14">
            <a
              href={participationUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open participation link"
              className="bg-white p-6 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors shadow-sm shrink-0"
            >
              <QRCode
                value={participationUrl}
                size={440}
                className="w-[440px] h-[440px]"
              />
            </a>
            <div className="flex flex-col gap-4 w-full md:w-64 mt-8 md:mt-12">
              <div className="text-center space-y-1">
                <h2 className="font-semibold text-lg text-green-700">✓ Giveaway Ready</h2>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    try { navigator.clipboard.writeText(participationUrl); setCopied(true); } catch {}
                  }}
                  className="group relative mx-auto flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors shadow-sm w-auto self-start"
                >
                  <span className="flex w-4 h-4 rounded bg-green-600 text-white items-center justify-center text-[9px] font-bold group-hover:scale-105 transition-transform">QR</span>
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
                {copied && (
                  <p className="text-[11px] text-green-600">Copied to clipboard</p>
                )}
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
