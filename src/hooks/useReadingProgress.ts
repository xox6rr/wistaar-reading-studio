import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";

// ============================================
// FRONTEND-ONLY READING PROGRESS HOOK
// Replace API calls with your backend
// ============================================

export interface ReadingProgress {
  book_id: string;
  current_chapter: number;
  scroll_position: number;
  last_read_at: string;
}

const STORAGE_KEY = 'wistaar_reading_progress';

// Helper to get all progress from localStorage
const getAllProgress = (): Record<string, Record<string, ReadingProgress>> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Helper to save all progress to localStorage
const saveAllProgress = (data: Record<string, Record<string, ReadingProgress>>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export function useReadingProgress(bookId: string | undefined) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ReadingProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress on mount
  useEffect(() => {
    if (!user || !bookId) {
      setIsLoading(false);
      return;
    }

    // ============================================
    // TODO: Replace with your backend API call
    // Example: GET /api/reading-progress?userId={userId}&bookId={bookId}
    // ============================================
    const loadProgress = () => {
      try {
        // Simulate API delay
        setTimeout(() => {
          const allProgress = getAllProgress();
          const userProgress = allProgress[user.id];
          if (userProgress && userProgress[bookId]) {
            setProgress(userProgress[bookId]);
          }
          setIsLoading(false);
        }, 100);
      } catch (err) {
        console.error("Failed to load reading progress:", err);
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [user, bookId]);

  // ============================================
  // TODO: Replace with your backend API call
  // Example: POST /api/reading-progress
  // ============================================
  const saveProgress = useCallback(
    async (chapter: number, scrollPosition: number = 0) => {
      if (!user || !bookId) return;

      try {
        const newProgress: ReadingProgress = {
          book_id: bookId,
          current_chapter: chapter,
          scroll_position: scrollPosition,
          last_read_at: new Date().toISOString(),
        };

        // TODO: Replace with actual API call
        // await fetch('/api/reading-progress', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ userId: user.id, ...newProgress }),
        // });

        // Save to localStorage
        const allProgress = getAllProgress();
        if (!allProgress[user.id]) {
          allProgress[user.id] = {};
        }
        allProgress[user.id][bookId] = newProgress;
        saveAllProgress(allProgress);

        setProgress(newProgress);
      } catch (err) {
        console.error("Failed to save reading progress:", err);
      }
    },
    [user, bookId]
  );

  return {
    progress,
    isLoading,
    saveProgress,
    isAuthenticated: !!user,
  };
}

// ============================================
// Get all reading progress for a user (for Library page)
// ============================================
export function useAllReadingProgress() {
  const { user } = useAuth();
  const [allProgress, setAllProgress] = useState<ReadingProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    // TODO: Replace with API call: GET /api/reading-progress?userId={userId}
    const loadAllProgress = () => {
      try {
        const stored = getAllProgress();
        const userProgress = stored[user.id];
        if (userProgress) {
          setAllProgress(Object.values(userProgress));
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load all reading progress:", err);
        setIsLoading(false);
      }
    };

    loadAllProgress();
  }, [user]);

  return { allProgress, isLoading };
}
