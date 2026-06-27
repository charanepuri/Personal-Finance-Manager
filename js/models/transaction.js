/**
 * Creates a new transaction object.
 *
 * @param {Object} data
 * @returns {Object}
 */

export function createTransaction(data) {

    const now = new Date();

    return {

        // Unique ID
        id: crypto.randomUUID(),

        // Transaction Details
        type: data.type,
        amount: Number(data.amount),
        category: data.category,
        paymentMethod: data.paymentMethod,

        // Date & Time
        date: data.date,
        time: now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }),

        // Optional Notes
        notes: data.notes?.trim() || "",

        // Metadata
        createdAt: now.toISOString(),
        updatedAt: null

    };

}