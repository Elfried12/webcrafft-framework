/**
 * Formate un prix en euros (ex : 599 -> "599 €").
 * @param {number} price
 * @returns {string}
 */
export const formatPrice = (price) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
    .format(price);

/**
 * Transforme une liste de valeurs en options pour FilterBar.
 * @param {string[]} values
 * @returns {{ value: string, label: string }[]}
 */
export const toOptions = (values = []) => values.map((value) => ({ value, label: value }));
