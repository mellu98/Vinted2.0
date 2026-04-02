"use client";

import { create } from "zustand";
import type { User, Item, SearchFilters, Notification } from "@/types";
import { CURRENT_USER, MOCK_ITEMS, MOCK_NOTIFICATIONS } from "@/lib/mock-data";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: CURRENT_USER,
  isAuthenticated: true,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

interface ItemsStore {
  items: Item[];
  favorites: Set<string>;
  toggleFavorite: (itemId: string) => void;
  addItem: (item: Item) => void;
}

export const useItemsStore = create<ItemsStore>((set) => ({
  items: MOCK_ITEMS,
  favorites: new Set(["item-2", "item-5", "item-11"]),
  toggleFavorite: (itemId) =>
    set((state) => {
      const newFavorites = new Set(state.favorites);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return { favorites: newFavorites };
    }),
  addItem: (item) =>
    set((state) => ({ items: [item, ...state.items] })),
}));

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: MOCK_NOTIFICATIONS,
  unreadCount: MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length,
  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      );
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.isRead).length,
      };
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
}));

interface SearchStore {
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: SearchFilters = {
  query: "",
  sortBy: "newest",
};

export const useSearchStore = create<SearchStore>((set) => ({
  filters: DEFAULT_FILTERS,
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
}));
