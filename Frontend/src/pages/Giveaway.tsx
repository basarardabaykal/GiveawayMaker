import { useState } from 'react';
import { CreateGiveawayForm } from '../components/CreateGiveawayForm';
import { EndGiveawaySection } from '../components/EndGiveawaySection';
import { AppLayout } from '../components/AppLayout';

export function Giveaway() {
  const [giveawayId, setGiveawayId] = useState<string | null>(null);
  const [participationUrl, setParticipationUrl] = useState<string | null>(null);

  return (
    <AppLayout title={giveawayId ? 'Manage Giveaway' : 'Create a Giveaway'}>
      <div className="space-y-6">
        {!giveawayId && (
          <CreateGiveawayForm
            onCreated={({ giveawayId, participationUrl }) => {
              setGiveawayId(giveawayId);
              setParticipationUrl(participationUrl);
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
