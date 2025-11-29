import { useState } from 'react';
import { giveawayService } from '../services/giveawayService';

interface FormState {
  content: string;
  numberOfWinners: number;
  numberOfSubstitutes: number;
}

export function CreateGiveawayForm({ onCreated }: { onCreated: (info: { giveawayId: string; participationUrl: string }) => void }) {
  const [form, setForm] = useState<FormState>({ content: '', numberOfWinners: 1, numberOfSubstitutes: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageText, setMessageText] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessageText(null);
    const result = await giveawayService.createGiveaway(form.content, form.numberOfWinners, form.numberOfSubstitutes);
    if (!result.success) {
      setError(result.message || 'Creation failed');
    } else if (!result.data) {
      setError('Empty response data');
    } else {
      if (result.message) setMessageText(result.message);
      const data: any = result.data;
      const giveawayId = data.GiveawayId ?? data.giveawayId;
      const participationUrl = data.ParticipationURL ?? data.participationURL;
      onCreated({ giveawayId, participationUrl });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 border p-4 rounded">
      <h2 className="text-lg font-semibold">Create Giveaway</h2>
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
      {messageText && !error && <p className="text-green-700 text-sm">{messageText}</p>}
    </form>
  );
}
