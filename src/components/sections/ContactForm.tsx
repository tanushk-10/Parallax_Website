'use client';
import { copy as contentText } from '@/data/copy';
/** Static-host contact form: validates locally, posts to one configured endpoint, and reports
 * loading/success/errors without reload. With no endpoint it prepares an explicit email handoff. */
import { useRef, useState } from 'react';
import { site } from '@/data/site';
import Button from '@/components/ui/Button';
type Fields = { name: string; email: string; subject: string; message: string };
export default function ContactForm() {
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'email'>('idle');
  const [emailHref, setEmailHref] = useState('');
  const feedback = useRef<HTMLDivElement>(null);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get('company') || '')) {
      setStatus('success');
      return;
    }
    const values = Object.fromEntries(
      ['name', 'email', 'subject', 'message'].map((k) => [k, String(data.get(k) || '').trim()]),
    ) as Fields;
    const next: Partial<Fields> = {};
    if (values.name.length < 2) next.name = 'Please tell us your name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = 'Please enter an email address we can reply to.';
    if (values.subject.length < 3) next.subject = 'Add a short subject (at least 3 characters).';
    if (values.message.length < 10)
      next.message = 'Tell us a little more (at least 10 characters).';
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>('[name="' + Object.keys(next)[0] + '"]')?.focus();
      return;
    }
    setStatus('loading');
    if (!site.formEndpoint) {
      setEmailHref(
        'mailto:' +
          site.email +
          '?subject=' +
          encodeURIComponent(values.subject) +
          '&body=' +
          encodeURIComponent(
            'From: ' + values.name + '\nReply to: ' + values.email + '\n\n' + values.message,
          ),
      );
      setStatus('email');
      setTimeout(() => feedback.current?.focus(), 0);
      return;
    }
    try {
      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
    setTimeout(() => feedback.current?.focus(), 0);
  };
  const fields: [keyof Fields, string, string][] = [
    ['name', 'Your name', 'text'],
    ['email', 'Your email', 'email'],
    ['subject', contentText['components_sections_ContactForm']['whats_on_your_mind'], 'text'],
  ];
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <h2>
          {contentText['components_sections_ContactForm']['lets_make']}
          <br />
          {contentText['components_sections_ContactForm']['something_happen']}
        </h2>
        <span className="mono">
          {contentText['components_sections_ContactForm']['01_say_hello']}
        </span>
      </div>
      <p>
        {site.formEndpoint
          ? 'Send a note. We’ll get back to you by email.'
          : 'Fill in your note, then open it in your email app to send it to our team.'}
      </p>
      {fields.map(([name, label, type]) => (
        <div className="form-field" key={name}>
          <input
            name={name}
            id={'contact-' + name}
            type={type}
            placeholder=" "
            autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : 'off'}
            required
            maxLength={name === 'subject' ? 160 : 120}
            aria-invalid={!!errors[name]}
            aria-describedby={errors[name] ? name + '-error' : undefined}
          />
          <label htmlFor={'contact-' + name}>{label}</label>
          {errors[name] && (
            <span className="field-error" id={name + '-error'}>
              {errors[name]}
            </span>
          )}
        </div>
      ))}
      <div className="form-field">
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder=" "
          required
          minLength={10}
          maxLength={5000}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        <label htmlFor="contact-message">
          {contentText['components_sections_ContactForm']['tell_us_a_little_more']}
        </label>
        {errors.message && (
          <span className="field-error" id="message-error">
            {errors.message}
          </span>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">
          {contentText['components_sections_ContactForm']['leave_this_field_empty']}
        </label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : site.formEndpoint ? 'Send message' : 'Prepare email'}
      </Button>
      <div
        ref={feedback}
        className={'form-feedback ' + status}
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        {status === 'success' && 'Your message is on its way. Thanks for reaching out.'}
        {status === 'error' && (
          <>
            {contentText['components_sections_ContactForm']['that_message_didnt_go_through_try']}
            <a href={'mailto:' + site.email}>
              {contentText['components_sections_ContactForm']['email_us_directly']}
            </a>
            .
          </>
        )}
        {status === 'email' && (
          <>
            {contentText['components_sections_ContactForm']['your_message_is_ready_but_has']}
            <a href={emailHref}>
              {contentText['components_sections_ContactForm']['open_your_email_app_to_review']}
            </a>
            <small>
              {contentText['components_sections_ContactForm']['no_email_app_copy_your_note']}
              {site.email}.
            </small>
          </>
        )}
      </div>
    </form>
  );
}
