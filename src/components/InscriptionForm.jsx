import { useState } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import { validateInscription, hasNoErrors } from '../utils/validation';

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  courseId: '',
  message: '',
  acceptTerms: false,
};

/**
 * Formulaire d'inscription à une formation (composant contrôlé).
 * - Toute la logique de validation est externalisée dans utils/validation.js.
 * - Les erreurs s'affichent après la première tentative d'envoi,
 *   puis se mettent à jour en temps réel à chaque modification.
 */
function InscriptionForm({ courses, defaultCourseId = '' }) {
  const [values, setValues] = useState({ ...INITIAL_VALUES, courseId: defaultCourseId });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValues = { ...values, [name]: type === 'checkbox' ? checked : value };
    setValues(nextValues);
    if (isSubmitted) setErrors(validateInscription(nextValues));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateInscription(values);
    setErrors(validationErrors);
    setIsSubmitted(true);

    if (hasNoErrors(validationErrors)) {
      // Pas de back-end dans le sujet : on simule l'envoi
      console.info('Inscription envoyée :', values);
      setIsSuccess(true);
      setValues(INITIAL_VALUES);
      setIsSubmitted(false);
    }
  };

  /** Props communes à tous les champs (valeur, classe d'erreur, accessibilité) */
  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    className: `form-control ${errors[name] ? 'is-invalid' : ''}`,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  if (isSuccess) {
    return (
      <div className="alert alert-success">
        <h2 className="h5">Merci pour votre inscription !</h2>
        <p className="mb-2">Nous vous recontactons sous 48 h.</p>
        <button type="button" className="btn btn-success" onClick={() => setIsSuccess(false)}>
          Nouvelle inscription
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row">
        <div className="col-md-6">
          <FormField id="firstName" label="Prénom *" error={errors.firstName}>
            <input type="text" autoComplete="given-name" {...fieldProps('firstName')} />
          </FormField>
        </div>
        <div className="col-md-6">
          <FormField id="lastName" label="Nom *" error={errors.lastName}>
            <input type="text" autoComplete="family-name" {...fieldProps('lastName')} />
          </FormField>
        </div>
      </div>

      <FormField id="email" label="E-mail *" error={errors.email}>
        <input type="email" autoComplete="email" {...fieldProps('email')} />
      </FormField>

      <FormField id="phone" label="Téléphone *" error={errors.phone}>
        <input type="tel" autoComplete="tel" {...fieldProps('phone')} />
      </FormField>

      <FormField id="courseId" label="Formation *" error={errors.courseId}>
        <select {...fieldProps('courseId')} className={`form-select ${errors.courseId ? 'is-invalid' : ''}`}>
          <option value="">— Choisir une formation —</option>
          {courses.map((course) => (
            <option key={course.id} value={String(course.id)} disabled={!course.available}>
              {course.title} ({course.level}){course.available ? '' : ' — complet'}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="message" label="Message (optionnel)" error={errors.message}>
        <textarea rows="4" {...fieldProps('message')} />
      </FormField>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
          checked={values.acceptTerms}
          onChange={handleChange}
        />
        <label htmlFor="acceptTerms" className="form-check-label">
          J&apos;accepte que mes données soient utilisées pour traiter ma demande *
        </label>
        {errors.acceptTerms && <div className="invalid-feedback">{errors.acceptTerms}</div>}
      </div>

      <button type="submit" className="btn btn-primary btn-lg">
        Envoyer mon inscription
      </button>
    </form>
  );
}

InscriptionForm.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      level: PropTypes.string,
      available: PropTypes.bool,
    })
  ).isRequired,
  defaultCourseId: PropTypes.string,
};

export default InscriptionForm;
