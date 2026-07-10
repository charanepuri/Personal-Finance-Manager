export function renderWishlist(container) {
    container.innerHTML = `
    <section class="page">
        <div class="page-header">
            <h1>My Wishlist</h1>
            <p>Track items you want to purchase in the future.</p>
        </div>

        <div class="wishlist-grid">
            <!-- Form to add new items -->
            <div class="wishlist-form-card">
                <h3>Add New Item</h3>
                <form id="wishlist-form">
                    <div class="form-group">
                        <label for="wishlist-item-name">Item Name</label>
                        <input type="text" id="wishlist-item-name" placeholder="e.g., New Laptop" required>
                    </div>
                    <div class="form-group">
                        <label for="wishlist-item-price">Price</label>
                        <input type="number" id="wishlist-item-price" placeholder="Enter price" required min="0">
                    </div>
                    <button type="submit" class="btn-primary" id="add-wishlist-item-btn">Add to Wishlist</button>
                </form>
            </div>

            <!-- Summary Card -->
            <div class="wishlist-summary-card">
                <h3>Total Required</h3>
                <h2 id="wishlist-total">₹0</h2>
                <p>This is the total cost for all items not yet marked as done.</p>
            </div>
        </div>

        <!-- List of wishlist items -->
        <div class="section-header" style="margin-top: 30px;">
            <h2>Wishlist Items</h2>
        </div>
        <div id="wishlist-items-container">
            <!-- Wishlist items will be rendered here by JavaScript -->
        </div>
    </section>

    <!-- Edit Modal for Wishlist -->
    <div class="modal" id="wishlistEditModal">
        <div class="modal-content modal-sm">
            <div class="modal-header">
                <h2>Edit Wishlist Item</h2>
                <button class="close-btn" id="closeWishlistEditModal">&times;</button>
            </div>
            <form id="wishlistEditForm">
                <div class="form-group">
                    <label>Item Name</label>
                    <input type="text" id="edit-wishlist-name" required>
                </div>
                <div class="form-group">
                    <label>Price</label>
                    <input type="number" id="edit-wishlist-price" required min="0">
                </div>
                <button type="submit" class="save-btn">Update Item</button>
            </form>
        </div>
    </div>
    `;
}