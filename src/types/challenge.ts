export interface ChallengeWeek {
  id: string;
  week_number: number;
  title: string;
  description: string;
  status: 'locked' | 'active' | 'completed';
  assets: {
    rive_url?: string;
    lottie_url?: string;
    figma_url?: string;
  };
  unlocks_at: string;
}
