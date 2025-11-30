import { useEffect, useState } from 'react';
import { CreateGiveawayForm } from '../components/CreateGiveawayForm';
import { EndGiveawaySection } from '../components/EndGiveawaySection';
import { AppLayout } from '../components/AppLayout';

export function Giveaway() {
  const [giveawayId, setGiveawayId] = useState<string | null>(null);
  const [participationUrl, setParticipationUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('activeGiveaway');
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.giveawayId && data?.participationUrl) {
          setGiveawayId(data.giveawayId as string);
          setParticipationUrl(data.participationUrl as string);
        }
      }
    } catch {}
  }, []);

  return (
    <AppLayout title={giveawayId ? 'Manage Giveaway' : 'Create a Giveaway'}>
      <div className="space-y-6">
        {!giveawayId && (
          <CreateGiveawayForm
            onCreated={({ giveawayId, participationUrl }) => {
              setGiveawayId(giveawayId);
              setParticipationUrl(participationUrl);
              try {
                localStorage.setItem('activeGiveaway', JSON.stringify({ giveawayId, participationUrl }));
              } catch {}
            }}
          />
        )}

        {giveawayId && participationUrl && (
          <EndGiveawaySection giveawayId={giveawayId} participationUrl={participationUrl} />
        )}
      </div>
    </AppLayout>
  );
}
