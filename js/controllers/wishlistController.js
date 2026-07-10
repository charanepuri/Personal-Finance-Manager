import { getWishlistItems, saveWishlistItems } from "../services/wishlistService.js";
import { showToast } from "../ui/toast.js";
import { showConfirmation } from "../ui/confirmation.js";

let currentlyEditingId = null;

export function initializeWishlist() {
    const form = document.getElementById("wishlist-form");
    form.addEventListener("submit", handleAddItem);

    const editModal = document.getElementById("wishlistEditModal");
    const closeEditModalBtn = document.getElementById("closeWishlistEditModal");
    const editForm = document.getElementById("wishlistEditForm");

    closeEditModalBtn.addEventListener("click", () => editModal.classList.remove("active"));
    editForm.addEventListener("submit", handleUpdateItem);

    renderWishlist();
}

function handleAddItem(event) {
    event.preventDefault();
    const nameInput = document.getElementById("wishlist-item-name");
    const priceInput = document.getElementById("wishlist-item-price");

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);

    if (!name || isNaN(price) || price <= 0) {
        showToast("Please enter a valid name and a price greater than zero.", "warning");
        return;
    }

    const newItem = {
        id: crypto.randomUUID(),
        name,
        price,
        done: false,
        createdAt: new Date().toISOString(),
    };

    const items = getWishlistItems();
    items.push(newItem);
    saveWishlistItems(items);

    showToast("Item added to wishlist!", "success");
    event.target.reset();
    renderWishlist();
}

function renderWishlist() {
    const items = getWishlistItems();
    const container = document.getElementById("wishlist-items-container");
    const totalEl = document.getElementById("wishlist-total");

    if (items.length === 0) {
        container.innerHTML = `<div class="transaction-card"><p>Your wishlist is empty. Add an item to get started!</p></div>`;
        totalEl.textContent = "₹0";
        return;
    }

    let totalRequired = 0;
    container.innerHTML = "";

    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach(item => {
        if (!item.done) {
            totalRequired += item.price;
        }

        const itemCard = document.createElement("div");
        itemCard.className = `transaction-card wishlist-item ${item.done ? 'done' : ''}`;
        itemCard.innerHTML = `
            <div class="transaction-left">
                <div class="transaction-info">
                    <h3>${item.name}</h3>
                    <p class="item-price">₹${item.price.toLocaleString("en-IN")}</p>
                </div>
            </div>
            <div class="transaction-right">
                <div class="action-buttons">
                    <button class="done-btn" data-id="${item.id}" title="${item.done ? 'Mark as Not Done' : 'Mark as Done'}">
                        <i class="fa-solid ${item.done ? 'fa-xmark' : 'fa-check'}"></i>
                    </button>
                    <button class="edit-btn" data-id="${item.id}" title="Edit Item">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="delete-btn" data-id="${item.id}" title="Delete Item">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(itemCard);
    });

    totalEl.textContent = `₹${totalRequired.toLocaleString("en-IN")}`;
    attachActionEvents();
}

function attachActionEvents() {
    document.querySelectorAll(".wishlist-item .delete-btn").forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.id;
            showConfirmation("Are you sure you want to delete this wishlist item?", () => {
                let items = getWishlistItems();
                items = items.filter(item => item.id !== id);
                saveWishlistItems(items);
                showToast("Item removed from wishlist.");
                renderWishlist();
            });
        };
    });

    document.querySelectorAll(".wishlist-item .done-btn").forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.id;
            let items = getWishlistItems();
            const item = items.find(i => i.id === id);
            if (item) {
                item.done = !item.done;
                saveWishlistItems(items);
                renderWishlist();
            }
        };
    });

    document.querySelectorAll(".wishlist-item .edit-btn").forEach(btn => {
        btn.onclick = () => {
            currentlyEditingId = btn.dataset.id;
            const items = getWishlistItems();
            const item = items.find(i => i.id === currentlyEditingId);
            if (item) {
                document.getElementById("edit-wishlist-name").value = item.name;
                document.getElementById("edit-wishlist-price").value = item.price;
                document.getElementById("wishlistEditModal").classList.add("active");
            }
        };
    });
}

function handleUpdateItem(event) {
    event.preventDefault();
    const newName = document.getElementById("edit-wishlist-name").value.trim();
    const newPrice = parseFloat(document.getElementById("edit-wishlist-price").value);

    if (!newName || isNaN(newPrice) || newPrice <= 0) {
        showToast("Please enter a valid name and price.", "warning");
        return;
    }

    let items = getWishlistItems();
    const itemIndex = items.findIndex(i => i.id === currentlyEditingId);

    if (itemIndex > -1) {
        items[itemIndex].name = newName;
        items[itemIndex].price = newPrice;
        saveWishlistItems(items);
        showToast("Wishlist item updated!", "success");
        document.getElementById("wishlistEditModal").classList.remove("active");
        renderWishlist();
    }
    currentlyEditingId = null;
}