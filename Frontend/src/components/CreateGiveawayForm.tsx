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
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Giveaway Content
          </label>
          <textarea
            className="w-full h-12 border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            value={form.content}
            onChange={e => update('content', e.target.value)}
            placeholder="Enter your giveaway description..."
            required
            rows={4}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Winners
            </label>
            <input
              type="number"
              min={1}
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={form.numberOfWinners}
              onChange={e => update('numberOfWinners', parseInt(e.target.value, 10) || 1)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Substitutes
            </label>
            <input
              type="number"
              min={0}
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={form.numberOfSubstitutes}
              onChange={e => update('numberOfSubstitutes', parseInt(e.target.value, 10) || 0)}
              required
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Creating...' : 'Create Giveaway'}
      </button>
      {error && <div className="bg-red-50 border border-red-200 rounded p-3"><p className="text-red-700 text-sm">{error}</p></div>}
      {messageText && !error && <div className="bg-green-50 border border-green-200 rounded p-3"><p className="text-green-700 text-sm">{messageText}</p></div>}
    </form>
  );
}
