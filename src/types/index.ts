export type ItemCondition = "new_with_tags" | "new_without_tags" | "like_new" | "good" | "fair" | "worn";
export type ItemStatus = "active" | "reserved" | "given" | "expired" | "removed";
export type ListingType = "free" | "offerta_libera";
export type TransactionStatus = "requested" | "approved" | "pickup_scheduled" | "completed" | "cancelled";
export type NotificationType = "item_requested" | "request_approved" | "request_declined" | "new_message" | "pickup_reminder" | "review_received" | "karma_milestone" | "badge_earned" | "nearby_item";
export type BadgeType = "first_gift" | "generous_10" | "generous_50" | "eco_warrior" | "top_rated" | "quick_responder" | "community_builder" | "early_adopter";

export interface User {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  locationName: string;
  karmaPoints: number;
  karmaLevel: number;
  isVerified: boolean;
  itemsGiven: number;
  itemsReceived: number;
  rating: number;
  reviewCount: number;
  followersCount: number;
  followingCount: number;
  badges: BadgeType[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  itemCount: number;
}

export interface Item {
  id: string;
  userId: string;
  user: User;
  title: string;
  description: string;
  condition: ItemCondition;
  status: ItemStatus;
  listingType: ListingType;
  categoryId: string;
  category: Category;
  images: string[];
  locationName: string;
  viewCount: number;
  favoriteCount: number;
  requestCount: number;
  createdAt: string;
  isFavorited?: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  imageUrl?: string;
  isSystem: boolean;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  item?: Item;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  itemId: string;
  item: Item;
  giverId: string;
  giver: User;
  receiverId: string;
  receiver: User;
  status: TransactionStatus;
  message?: string;
  voluntaryAmount?: number;
  pickupDate?: string;
  pickupLocation?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewer: User;
  reviewedId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  data: Record<string, string>;
  isRead: boolean;
  createdAt: string;
}

export interface SearchFilters {
  query: string;
  categoryId?: string;
  condition?: ItemCondition;
  listingType?: ListingType;
  location?: string;
  maxDistance?: number;
  sortBy: "newest" | "nearest" | "popular";
}

export const ITEM_CONDITIONS: Record<ItemCondition, string> = {
  new_with_tags: "Nuovo con etichette",
  new_without_tags: "Nuovo senza etichette",
  like_new: "Come nuovo",
  good: "Buono",
  fair: "Discreto",
  worn: "Usato",
};

export const LISTING_TYPES: Record<ListingType, string> = {
  free: "Gratis",
  offerta_libera: "Offerta libera",
};

export const TRANSACTION_STATUSES: Record<TransactionStatus, string> = {
  requested: "Richiesto",
  approved: "Approvato",
  pickup_scheduled: "Ritiro programmato",
  completed: "Completato",
  cancelled: "Annullato",
};
