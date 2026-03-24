import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useChallengeStore } from '@/store/useChallengeStore';
import { ChallengeWeek } from '@/types';

export function useChallengeSync() {
  const { setWeeks, setLoading } = useChallengeStore();

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('week_number', { ascending: true });

      if (!error && data) {
        setWeeks(data as ChallengeWeek[]);
      } else {
        console.error('Failed to sync challenges:', error);
      }
      setLoading(false);
    };

    fetchChallenges();
  }, [setWeeks, setLoading]);
}
