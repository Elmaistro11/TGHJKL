/* =========================================================
   Bite & Sting First Aid — site interactivity (updated)
   - safer DOM updates, improved i18n helper, auth guards
   - Added Email-link (magic link) sign-in flow
   ========================================================= */

const translations = {
  /* ... same translations object as before ... */
};

// (Full translations object omitted here to keep snippet short — keep your existing translations block)
document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     App state
  --------------------------------------------------------- */
  const state = {
    triage: { animal: null, bleed: null, swell: null },
    user: null // { role: 'patient' | 'doctor', email }
  };

  let currentLang = localStorage.getItem('siteLang') || 'en';

  // safer i18n helper — supports dot-notation and returns values (not only strings)
  function t(key) {
    if (!key) return '';
    const parts = key.split('.');
    let val = translations[currentLang];
    for (const p of parts) {
      if (val == null) { val = undefined; break; }
      val = val[p];
    }
    if (val === undefined) {
      val = translations.en;
      for (const p of parts) {
        if (val == null) { val = undefined; break; }
        val = val[p];
      }
    }
    return val === undefined ? '' : val;
  }

  const accountBtn = document.getElementById('account-btn');

  /* ---------------------------------------------------------
     Language switching
  --------------------------------------------------------- */
  const langToggleBtn = document.getElementById('lang-toggle');
  const langToggleText = document.getElementById('lang-toggle-text');

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('siteLang', lang);

    document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Static text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = t(key);
      if (val !== undefined && val !== null && typeof val !== 'object') el.textContent = val;
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const val = t(key);
      if (val !== undefined && val !== null) el.setAttribute('placeholder', val);
    });

    if (langToggleText) langToggleText.textContent = lang === 'ar' ? 'English' : 'العربية';
    if (langToggleBtn) langToggleBtn.setAttribute('aria-label', lang === 'ar' ? 'Switch language to English' : 'Switch language to Arabic');

    // Re-render dynamic content that isn't driven by data-i18n
    renderLibrary(true);
    if (document.getElementById('result-view') && document.getElementById('result-view').classList.contains('active')) {
      renderResult();
    }
    if (placeList && !placeList.hidden) {
      renderPlaceholderResults();
    }
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
  }

  /* ---------------------------------------------------------
     View navigation
  --------------------------------------------------------- */
  function goTo(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');
    const mainEl = document.getElementById('main');
    if (mainEl) mainEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('click', (e) => {
    const navEl = e.target.closest('[data-nav]');
    if (!navEl) return;

    if (navEl.id === 'account-btn') {
      e.preventDefault();
      if (state.user) {
        goTo(state.user.role === 'doctor' ? 'doctor-account-view' : 'patient-account-view');
      } else {
        goTo('signin-view');
      }
      return;
    }

    e.preventDefault();
    goTo(navEl.dataset.nav);
  });

  /* ---------------------------------------------------------
     (triage, library, findhelp code omitted - keep as in your file)
     ... existing triage / renderLibrary / renderPlaceholderResults ...
  --------------------------------------------------------- */

  /* ---------------------------------------------------------
     Authentication: Email/password, Google, AND Email-link (magic link)
  --------------------------------------------------------- */
  const patientForm = document.getElementById('patient-form');
  const googleBtn = document.getElementById('google-signin-btn');
  const forgotPassBtn = document.getElementById('forgot-pass-btn');
  const emailLinkBtn = document.getElementById('email-link-btn');

  // Helper to update UI after sign-in
  function onUserSignedIn(user, role = 'patient') {
    state.user = { role, email: user.email || '' };
    const name = user.displayName || (user.email ? user.email.split('@')[0] : '');
    if (accountBtn) accountBtn.innerHTML = `<i class="icon-user" aria-hidden="true"></i> ${name || t('nav_signin')}`;
    goTo(role === 'doctor' ? 'doctor-account-view' : 'patient-account-view');
  }

  // Wire up Firebase auth state persistence (if window.fbAuth available)
  if (window.fbAuth) {
    const { auth, onAuthStateChanged, getIdTokenResult } = window.fbAuth;
    if (onAuthStateChanged && auth) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          let role = 'patient';
          try {
            if (getIdTokenResult) {
              const idTokenResult = await getIdTokenResult(user);
              if (idTokenResult && idTokenResult.claims && idTokenResult.claims.role) {
                role = idTokenResult.claims.role;
              }
            }
          } catch (err) {
            console.warn('getIdTokenResult failed', err);
          }
          state.user = { role, email: user.email };
          const name = user.displayName || (user.email ? user.email.split('@')[0] : '');
          if (accountBtn) accountBtn.innerHTML = `<i class="icon-user" aria-hidden="true"></i> ${name || t('nav_signin')}`;
        } else {
          state.user = null;
          if (accountBtn) accountBtn.innerHTML = `<i class="icon-user" aria-hidden="true"></i> ${t('nav_signin')}`;
        }
      });
    }
  }

  // Email/password sign in / register (unchanged)
  if (patientForm) {
    patientForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailEl = document.getElementById('p-email');
      const passEl = document.getElementById('p-pass');
      const email = emailEl ? emailEl.value.trim() : '';
      const password = passEl ? passEl.value : '';

      if (!window.fbAuth) {
        alert(currentLang === 'ar' ? 'خدمة الدخول غير متاحة حالياً' : 'Auth service not available');
        return;
      }

      const { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = window.fbAuth;
      if (!auth || !signInWithEmailAndPassword || !createUserWithEmailAndPassword) {
        alert(currentLang === 'ar' ? 'خدمة المصادقة غير متاحة' : 'Auth functions not available');
        return;
      }

      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        onUserSignedIn(cred.user, 'patient');
      } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          try {
            const created = await createUserWithEmailAndPassword(auth, email, password);
            alert(currentLang === 'ar' ? 'تم إنشاء الحساب وتسجيل الدخول بنجاح!' : 'Account created and signed in!');
            onUserSignedIn(created.user, 'patient');
          } catch (createError) {
            alert((currentLang === 'ar' ? 'خطأ: ' : 'Error: ') + createError.message);
          }
        } else {
          alert((currentLang === 'ar' ? 'خطأ في تسجيل الدخول: ' : 'Error signing in: ') + error.message);
        }
      }
    });
  }

  // Google sign-in (unchanged)
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      if (!window.fbAuth) {
        alert(currentLang === 'ar' ? 'خدمة الدخول غير متاحة حالياً' : 'Auth service not available');
        return;
      }
      const { auth, googleProvider, signInWithPopup } = window.fbAuth;
      if (!auth || !googleProvider || !signInWithPopup) {
        alert(currentLang === 'ar' ? 'خدمة جوجل غير متاحة' : 'Google sign-in not available');
        return;
      }
      try {
        const result = await signInWithPopup(auth, googleProvider);
        onUserSignedIn(result.user, 'patient');
      } catch (error) {
        alert((currentLang === 'ar' ? 'خطأ في التسجيل بجوجل: ' : 'Error with Google sign-in: ') + error.message);
      }
    });
  }

  // Forgot password (unchanged)
  if (forgotPassBtn) {
    forgotPassBtn.addEventListener('click', async () => {
      const emailEl = document.getElementById('p-email');
      const email = emailEl ? emailEl.value.trim() : '';
      if (!email) {
        alert(currentLang === 'ar' ? 'يرجى كتابة البريد الإلكتروني أولاً في الخانة المخصصة له.' : 'Please enter an email first.');
        return;
      }
      if (!window.fbAuth) {
        alert(currentLang === 'ar' ? 'خدمة إعادة الضبط غير متاحة حالياً' : 'Reset service not available');
        return;
      }
      const { auth, sendPasswordResetEmail } = window.fbAuth;
      if (!auth || !sendPasswordResetEmail) {
        alert(currentLang === 'ar' ? 'خدمة إعادة الضبط غير متاحة' : 'Reset function not available');
        return;
      }
      try {
        await sendPasswordResetEmail(auth, email);
        alert(currentLang === 'ar' ? 'تم إرسال رابط إعادة ضبط كلمة السر إلى بريدك الإلكتروني!' : 'Password reset link sent!');
      } catch (error) {
        alert((currentLang === 'ar' ? 'خطأ: ' : 'Error: ') + error.message);
      }
    });
  }

  /* ---------------------------------------------------------
     Email-link (magic link) sign-in
     - UI: #email-link-btn triggers sendSignInLinkToEmail
     - On page load: if isSignInWithEmailLink -> complete sign-in
  --------------------------------------------------------- */
  async function sendMagicLink(email) {
    if (!window.fbAuth) {
      throw new Error('Auth not configured');
    }
    const { auth, sendSignInLinkToEmail } = window.fbAuth;
    if (!auth || !sendSignInLinkToEmail) throw new Error('Auth functions missing');

    // actionCodeSettings: must be allowed origin in Firebase Authorized domains
    const actionCodeSettings = {
      url: window.location.origin + '/?emailSignIn=true',
      handleCodeInApp: true
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    localStorage.setItem('emailForSignIn', email);
  }

  if (emailLinkBtn) {
    emailLinkBtn.addEventListener('click', async () => {
      const emailEl = document.getElementById('p-email');
      const email = emailEl ? emailEl.value.trim().toLowerCase() : '';
      if (!email) {
        return alert(currentLang === 'ar' ? 'من فضلك اكتب البريد أولاً' : 'Please enter your email first.');
      }
      try {
        await sendMagicLink(email);
        alert(currentLang === 'ar' ? 'تم إرسال رابط تسجيل الدخول إلى بريدك. تحقق من الإيميل.' : 'Sign-in link sent — check your email.');
      } catch (err) {
        console.error('sendMagicLink error', err);
        alert((currentLang === 'ar' ? 'خطأ أثناء إرسال الرابط: ' : 'Error sending link: ') + (err.message || err));
      }
    });
  }

  // On page load: if URL contains sign-in link, complete sign-in
  (async function handleEmailLinkSignIn() {
    if (!window.fbAuth) return;
    const { auth, isSignInWithEmailLink, signInWithEmailLink } = window.fbAuth;
    try {
      if (isSignInWithEmailLink && isSignInWithEmailLink(auth, window.location.href)) {
        // Get saved email or prompt
        let email = localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt(currentLang === 'ar' ? 'أدخل بريدك لإتمام تسجيل الدخول:' : 'Please enter your email to complete sign-in:');
        }
        if (!email) {
          alert(currentLang === 'ar' ? 'البريد مطلوب لإتمام تسجيل الدخول.' : 'Email required to complete sign-in.');
          return;
        }
        const userCredential = await signInWithEmailLink(auth, email, window.location.href);
        localStorage.removeItem('emailForSignIn');
        onUserSignedIn(userCredential.user, 'patient');
        // Optionally clean up URL to remove params
        try {
          const newUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        } catch (e) { /* ignore */ }
      }
    } catch (err) {
      console.error('signInWithEmailLink error', err);
      alert((currentLang === 'ar' ? 'خطأ أثناء إتمام تسجيل الدخول: ' : 'Error completing sign-in: ') + (err.message || err));
    }
  })();

  /* ---------------------------------------------------------
     Sign out handlers (unchanged)
  --------------------------------------------------------- */
  const patientSignoutBtn = document.getElementById('patient-signout-btn');
  const doctorSignoutBtn = document.getElementById('doctor-signout-btn');

  const handleSignOut = async () => {
    if (!window.fbAuth) {
      alert(currentLang === 'ar' ? 'خدمة تسجيل الخروج غير متاحة حالياً' : 'Sign out service not available');
      return;
    }
    const { auth, signOut } = window.fbAuth;
    if (!auth || !signOut) {
      alert(currentLang === 'ar' ? 'خدمة تسجيل الخروج غير متاحة' : 'Sign out function not available');
      return;
    }
    try {
      await signOut(auth);
      alert(currentLang === 'ar' ? 'تم تسجيل الخروج بنجاح!' : 'Signed out successfully!');
      goTo('home-view');
    } catch (error) {
      alert((currentLang === 'ar' ? 'خطأ أثناء تسجيل الخروج: ' : 'Error signing out: ') + error.message);
    }
  };

  if (patientSignoutBtn) patientSignoutBtn.addEventListener('click', handleSignOut);
  if (doctorSignoutBtn) doctorSignoutBtn.addEventListener('click', handleSignOut);

  /* ---------------------------------------------------------
     Apply saved (or default) language on load
  --------------------------------------------------------- */
  applyLanguage(currentLang);

});
