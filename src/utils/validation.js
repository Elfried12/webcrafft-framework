/**
 * Fonctions de validation du formulaire d'inscription.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/;
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/;

/**
 * Vérifie qu'un champ texte n'est pas vide.
 * @param {string} value
 * @returns {boolean}
 */
export const isRequired = (value) => String(value ?? '').trim().length > 0;

/**
 * Vérifie le format d'une adresse e-mail.
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => EMAIL_REGEX.test(email.trim());

/**
 * Vérifie un numéro de téléphone français (06 12 34 56 78, +33 6 12 34 56 78…).
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => PHONE_REGEX.test(phone.trim());

/**
 * Vérifie un nom ou prénom : 2 à 50 lettres, espaces, tirets ou apostrophes.
 * @param {string} name
 * @returns {boolean}
 */
export const isValidName = (name) => NAME_REGEX.test(name.trim());

/**
 * Valide l'ensemble du formulaire d'inscription.
 * @param {Object} values - valeurs du formulaire
 * @param {string} values.firstName
 * @param {string} values.lastName
 * @param {string} values.email
 * @param {string} values.phone
 * @param {string} values.courseId
 * @param {string} values.message
 * @param {boolean} values.acceptTerms
 * @returns {Object<string, string>} erreurs indexées par nom de champ (vide si tout est valide)
 */
export const validateInscription = (values) => {
  const errors = {};

  if (!isRequired(values.firstName)) errors.firstName = 'Le prénom est obligatoire.';
  else if (!isValidName(values.firstName)) errors.firstName = 'Prénom invalide (2 à 50 lettres).';

  if (!isRequired(values.lastName)) errors.lastName = 'Le nom est obligatoire.';
  else if (!isValidName(values.lastName)) errors.lastName = 'Nom invalide (2 à 50 lettres).';

  if (!isRequired(values.email)) errors.email = "L'e-mail est obligatoire.";
  else if (!isValidEmail(values.email)) errors.email = 'Format d’e-mail invalide.';

  if (!isRequired(values.phone)) errors.phone = 'Le téléphone est obligatoire.';
  else if (!isValidPhone(values.phone)) errors.phone = 'Numéro invalide (ex : 06 12 34 56 78).';

  if (!isRequired(values.courseId)) errors.courseId = 'Choisissez une formation.';

  if (values.message.length > 500) errors.message = '500 caractères maximum.';

  if (!values.acceptTerms) errors.acceptTerms = 'Vous devez accepter les conditions.';

  return errors;
};

/**
 * Indique si un objet d'erreurs est vide.
 * @param {Object} errors
 * @returns {boolean}
 */
export const hasNoErrors = (errors) => Object.keys(errors).length === 0;
