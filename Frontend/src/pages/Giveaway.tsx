import { useState } from 'react';
import { CreateGiveawayForm } from '../components/CreateGiveawayForm';
import { EndGiveawaySection } from '../components/EndGiveawaySection';

export function Giveaway() {
  const [giveawayId, setGiveawayId] = useState<string | null>(null);
  const [participationUrl, setParticipationUrl] = useState<string | null>(null);
  const [results, setResults] = useState<{ winners: string[]; substitutes: string[] } | null>(null);

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Giveaway Manager</h1>
      {!giveawayId && (
        <CreateGiveawayForm onCreated={({ giveawayId, participationUrl }) => {
          setGiveawayId(giveawayId);
          setParticipationUrl(participationUrl);
          setResults(null);
        }} />
      )}

      {giveawayId && participationUrl && (
        <EndGiveawaySection giveawayId={giveawayId} participationUrl={participationUrl} />
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
