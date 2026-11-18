import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Package, MapPin, Zap, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PERKS = [
  { icon: Package, t: 'Track your orders', d: 'See every order and its status in one place' },
  { icon: MapPin, t: 'Save your addresses', d: 'Home, work and international addresses' },
  { icon: Zap, t: 'Faster checkout', d: 'Your details are filled in for you' },
];

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-[12px] font-bold uppercase tracking-wider text-muted block mb-1.5">{label}</label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="flex items-center gap-1.5 text-[12px] text-danger mt-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

export default function Login() {
  const { user, signIn, signUp, resetPassword, isDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dest = location.state?.from || '/account';

  const [mode, setMode] = useState('signin'); // signin | signup | forgot
  const [form, setForm] = useState({ name: '', email: '', password: '', agree: false });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (user) navigate(dest, { replace: true });
  }, [user]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const switchMode = (m) => { setMode(m); setErrors({}); setFormError(''); setDone(false); };

  const validate = () => {
    const e = {};
    if (mode === 'signup' && form.name.trim().length < 2) e.name = 'Enter your full name.';
    if (!EMAIL_RE.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (mode !== 'forgot') {
      if (form.password.length < 8) e.password = 'Use at least 8 characters.';
    }
    if (mode === 'signup' && !form.agree) e.agree = 'Please accept the Terms and Privacy Policy to continue.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setFormError('');
    if (!validate()) return;
    setBusy(true);
    try {
      const email = form.email.trim().toLowerCase();
      if (mode === 'signin') await signIn({ email, password: form.password });
      if (mode === 'signup') await signUp({ name: form.name.trim(), email, password: form.password });
      if (mode === 'forgot') { await resetPassword(email); setDone(true); }
    } catch {
      setFormError('Something went wrong. Please try again in a moment.');
    } finally {
      setBusy(false);
    }
  };

  const input = (err) =>
    `w-full border ${err ? 'border-danger' : 'border-line'} bg-white px-4 py-3 text-[15px] outline-none focus:border-ink transition-colors`;

  const titles = { signin: 'WELCOME BACK', signup: 'CREATE YOUR ACCOUNT', forgot: 'RESET PASSWORD' };

  return (
    <div className="bg-mist min-h-[80vh] py-10 md:py-16">
      <div className="max-w-[1080px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 shadow-xl">
        {/* Brand panel */}
        <aside className="relative bg-dark-grad text-white p-8 md:p-12 flex flex-col justify-between overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-40 blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(254,215,0,0.6), transparent 70%)' }} />
          <div className="relative">
            <img src="/logo.png" alt="Cocktail Custom" className="w-16 h-16 rounded-full mb-8" />
            <h2 className="font-display text-4xl md:text-5xl leading-none">PRINT WHATEVER YOU IMAGINE.</h2>
            <p className="text-white/70 text-[15px] mt-4 max-w-sm">Sign in to manage your custom orders from anywhere in the world.</p>
          </div>
          <ul className="relative mt-10 space-y-5">
            {PERKS.map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex gap-3">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-gold" /></span>
                <div><p className="font-semibold text-[15px]">{t}</p><p className="text-[13px] text-white/60">{d}</p></div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Form panel */}
        <section className="bg-white p-8 md:p-12">
          {mode !== 'forgot' && (
            <div className="grid grid-cols-2 border border-line mb-8" role="tablist">
              {[['signin', 'Sign in'], ['signup', 'Create account']].map(([m, l]) => (
                <button key={m} role="tab" aria-selected={mode === m} onClick={() => switchMode(m)}
                  className={`py-3 text-[13px] font-bold uppercase tracking-wider transition-colors ${mode === m ? 'bg-ink text-white' : 'text-ink hover:bg-mist'}`}>
                  {l}
                </button>
              ))}
            </div>
          )}

          <h1 className="font-display text-3xl md:text-4xl text-ink mb-1">{titles[mode]}</h1>
          {mode === 'forgot' && <p className="text-muted text-[14px] mb-6">Enter your email and we will send you a link to set a new password.</p>}

          {isDemo && (
            <p className="mt-4 mb-6 text-[12px] text-ink bg-gold/20 border border-gold px-3 py-2">
              Demo mode: accounts are not connected to a real system yet. Nothing you type here is saved on a server.
            </p>
          )}

          {done ? (
            <div role="status" className="flex gap-3 p-4 bg-mist border border-line">
              <CheckCircle2 className="w-5 h-5 text-whatsapp shrink-0 mt-0.5" />
              <p className="text-[14px]">If an account exists for <b>{form.email}</b>, a reset link is on its way. Check your inbox.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5">
              {mode === 'signup' && (
                <Field id="name" label="Full name" error={errors.name}>
                  <input id="name" autoComplete="name" className={input(errors.name)} value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} />
                </Field>
              )}
              <Field id="email" label="Email" error={errors.email}>
                <input id="email" type="email" inputMode="email" autoComplete="email" className={input(errors.email)} value={form.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} />
              </Field>
              {mode !== 'forgot' && (
                <Field id="password" label="Password" error={errors.password}>
                  <div className="relative">
                    <input id="password" type={show ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} className={`${input(errors.password)} pr-12`} value={form.password} onChange={set('password')} aria-invalid={!!errors.password} aria-describedby={errors.password ? 'password-err' : undefined} />
                    <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink" aria-label={show ? 'Hide password' : 'Show password'}>
                      {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </Field>
              )}

              {mode === 'signin' && (
                <button type="button" onClick={() => switchMode('forgot')} className="text-[13px] font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2 hover:decoration-ink">Forgot your password?</button>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="flex items-start gap-3 text-[13px] text-muted cursor-pointer">
                    <input type="checkbox" checked={form.agree} onChange={set('agree')} className="mt-0.5 w-4 h-4 accent-[#0B0B0B]" />
                    <span>I agree to the <Link to="/policy/terms" className="text-ink underline">Terms of Service</Link> and <Link to="/policy/privacy" className="text-ink underline">Privacy Policy</Link>.</span>
                  </label>
                  {errors.agree && <p role="alert" className="flex items-center gap-1.5 text-[12px] text-danger mt-1.5"><AlertCircle className="w-3.5 h-3.5" /> {errors.agree}</p>}
                </div>
              )}

              {formError && <p role="alert" className="text-[13px] text-danger">{formError}</p>}

              <button type="submit" disabled={busy}
                className="w-full py-4 rounded-full bg-button-grad text-ink font-bold text-[13px] uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'}
              </button>
            </form>
          )}

          {mode === 'forgot' && (
            <button onClick={() => switchMode('signin')} className="mt-6 text-[13px] font-semibold text-ink hover:underline decoration-brand decoration-2 underline-offset-4">← Back to sign in</button>
          )}

          <p className="flex items-center gap-2 text-[12px] text-muted mt-8"><Lock className="w-3.5 h-3.5" /> Your details are used only to manage your orders.</p>
        </section>
      </div>
    </div>
  );
}
