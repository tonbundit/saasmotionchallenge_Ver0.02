import { create } from 'zustand';
import { ChallengeWeek } from '@/types';

interface ChallengeState {
  weeks: ChallengeWeek[];
  activeWeek: number;
  isLoading: boolean;
  setWeeks: (weeks: ChallengeWeek[]) => void;
  setActiveWeek: (week: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useChallengeStore = create<ChallengeState>((set) => ({
  weeks: [],
  activeWeek: 1,
  isLoading: false,
  setWeeks: (weeks) => set({ weeks }),
  setActiveWeek: (activeWeek) => set({ activeWeek }),
  setLoading: (isLoading) => set({ isLoading }),
}));
