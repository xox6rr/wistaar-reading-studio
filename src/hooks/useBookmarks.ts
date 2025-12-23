import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";

// ============================================
// FRONTEND-ONLY BOOKMARKS HOOK
// Replace API calls with your backend
// ============================================

export interface Bookmark {
  id: string;
  book_id: string;
  chapter_number: number;
  scroll_position: number;
  note: string | null;
  highlighted_text: string | null;
  created_at: string;
}

const STORAGE_KEY = 'wistaar_bookmarks';

// Helper to get all bookmarks from localStorage
const getAllBookmarks = (): Record<string, Record<string, Bookmark[]>> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Helper to save all bookmarks to localStorage
const saveAllBookmarks = (data: Record<string, Record<string, Bookmark[]>>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export function useBookmarks(bookId: string | undefined) {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load bookmarks on mount
  useEffect(() => {
    if (!user || !bookId) {
      setIsLoading(false);
      return;
    }

    // ============================================
    // TODO: Replace with your backend API call
    // Example: GET /api/bookmarks?userId={userId}&bookId={bookId}
    // ============================================
    const loadBookmarks = () => {
      try {
        setTimeout(() => {
          const allBookmarks = getAllBookmarks();
          const userBookmarks = allBookmarks[user.id];
          if (userBookmarks && userBookmarks[bookId]) {
            setBookmarks(userBookmarks[bookId]);
          }
          setIsLoading(false);
        }, 100);
      } catch (err) {
        console.error("Failed to load bookmarks:", err);
        setIsLoading(false);
      }
    };

    loadBookmarks();
  }, [user, bookId]);

  // ============================================
  // TODO: Replace with your backend API call
  // Example: POST /api/bookmarks
  // ============================================
  const addBookmark = useCallback(
    async (
      chapterNumber: number,
      scrollPosition: number = 0,
      note?: string,
      highlightedText?: string
    ): Promise<Bookmark | null> => {
      if (!user || !bookId) return null;

      try {
        const newBookmark: Bookmark = {
          id: crypto.randomUUID(),
          book_id: bookId,
          chapter_number: chapterNumber,
          scroll_position: scrollPosition,
          note: note || null,
          highlighted_text: highlightedText || null,
          created_at: new Date().toISOString(),
        };

        // TODO: Replace with actual API call
        // const response = await fetch('/api/bookmarks', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ userId: user.id, ...newBookmark }),
        // });
        // const data = await response.json();

        // Save to localStorage
        const allBookmarks = getAllBookmarks();
        if (!allBookmarks[user.id]) {
          allBookmarks[user.id] = {};
        }
        if (!allBookmarks[user.id][bookId]) {
          allBookmarks[user.id][bookId] = [];
        }
        allBookmarks[user.id][bookId].unshift(newBookmark);
        saveAllBookmarks(allBookmarks);

        setBookmarks((prev) => [newBookmark, ...prev]);
        return newBookmark;
      } catch (err) {
        console.error("Failed to add bookmark:", err);
        return null;
      }
    },
    [user, bookId]
  );

  // ============================================
  // TODO: Replace with your backend API call
  // Example: PATCH /api/bookmarks/{id}
  // ============================================
  const updateBookmark = useCallback(
    async (bookmarkId: string, note: string): Promise<boolean> => {
      if (!user || !bookId) return false;

      try {
        // TODO: Replace with actual API call
        // await fetch(`/api/bookmarks/${bookmarkId}`, {
        //   method: 'PATCH',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ note }),
        // });

        // Update localStorage
        const allBookmarks = getAllBookmarks();
        if (allBookmarks[user.id]?.[bookId]) {
          allBookmarks[user.id][bookId] = allBookmarks[user.id][bookId].map(
            (b) => (b.id === bookmarkId ? { ...b, note } : b)
          );
          saveAllBookmarks(allBookmarks);
        }

        setBookmarks((prev) =>
          prev.map((b) => (b.id === bookmarkId ? { ...b, note } : b))
        );
        return true;
      } catch (err) {
        console.error("Failed to update bookmark:", err);
        return false;
      }
    },
    [user, bookId]
  );

  // ============================================
  // TODO: Replace with your backend API call
  // Example: DELETE /api/bookmarks/{id}
  // ============================================
  const deleteBookmark = useCallback(
    async (bookmarkId: string): Promise<boolean> => {
      if (!user || !bookId) return false;

      try {
        // TODO: Replace with actual API call
        // await fetch(`/api/bookmarks/${bookmarkId}`, { method: 'DELETE' });

        // Update localStorage
        const allBookmarks = getAllBookmarks();
        if (allBookmarks[user.id]?.[bookId]) {
          allBookmarks[user.id][bookId] = allBookmarks[user.id][bookId].filter(
            (b) => b.id !== bookmarkId
          );
          saveAllBookmarks(allBookmarks);
        }

        setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
        return true;
      } catch (err) {
        console.error("Failed to delete bookmark:", err);
        return false;
      }
    },
    [user, bookId]
  );

  return {
    bookmarks,
    isLoading,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    isAuthenticated: !!user,
  };
}

// ============================================
// Get all bookmarks for a user (for Library page)
// ============================================
export function useAllBookmarks() {
  const { user } = useAuth();
  const [allBookmarks, setAllBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    // TODO: Replace with API call: GET /api/bookmarks?userId={userId}
    const loadAllBookmarks = () => {
      try {
        const stored = getAllBookmarks();
        const userBookmarks = stored[user.id];
        if (userBookmarks) {
          const all = Object.values(userBookmarks).flat();
          setAllBookmarks(all);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load all bookmarks:", err);
        setIsLoading(false);
      }
    };

    loadAllBookmarks();
  }, [user]);

  return { allBookmarks, isLoading };
}
