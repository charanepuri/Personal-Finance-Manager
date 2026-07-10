import { APP } from "../config.js";

const WISHLIST_STORAGE_KEY = `${APP.STORAGE_KEY}-wishlist`;

/**
 * Retrieves wishlist items from localStorage.
 * @returns {Array} An array of wishlist items.
 */
export function getWishlistItems() {
    const items = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return items ? JSON.parse(items) : [];
}

/**
 * Saves the wishlist items array to localStorage.
 * @param {Array} items - The array of wishlist items to save.
 */
export function saveWishlistItems(items) {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
}