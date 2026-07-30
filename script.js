/* =========================================================
   Bite & Sting First Aid — site interactivity (updated)
   - safer DOM updates, improved i18n helper, auth guards
   ========================================================= */

const translations = {
  en: {
    logo: 'First Aid Guide',
    nav_library: 'Care library',
    nav_findhelp: 'Find help',
    nav_signin: 'Sign in',
    emergency_text: 'In danger right now? Call 911',

    home_eyebrow: 'Bitten. Scratched. Stung.',
    home_h1: 'Know what to do in the next 60 seconds.',
    home_sub: "Answer three quick questions and we'll tell you exactly what your bite or scratch needs — right now.",
    home_cta: 'Start triage →',
    card_library_title: 'Care library',
    card_library_desc: 'Browse care guides by animal — dog, cat, snake, insect, and more.',
    card_findhelp_title: 'Find help nearby',
    card_findhelp_desc: 'Locate the closest ER, urgent care, or vet clinic.',
    card_account_title: 'Account',
    card_account_desc: 'Save pet profiles and allergies, and message a doctor for follow-up.',

    step1: 'Step 1 of 3', step2: 'Step 2 of 3', step3: 'Step 3 of 3',
    q1: 'What happened?',
    animal_dog: 'Dog bite', animal_cat: 'Cat bite or scratch', animal_snake: 'Snake bite', animal_insect: 'Insect sting',
    q2: 'Is the bleeding heavy or not stopping?',
    bleed_yes: 'Yes, heavy bleeding', bleed_no: 'No, minor or none',
    q3: 'Any swelling of the face or lips, or trouble breathing?',
    swell_yes: 'Yes', swell_no_broken: 'No, but the skin is broken', swell_no_scare: 'No, just a scare',

    back_home: 'Back to home',
    followup_title: 'Want a second opinion?',
    followup_desc: 'Sign in to message a healthcare professional about this and get personalized follow-up.',
    followup_btn: 'Sign in',

    animal_phrase: { dog: 'dog bite', cat: 'cat bite or scratch', snake: 'snake bite', insect: 'insect sting' },

    results: {
      bleed: {
        title: 'Heavy bleeding — act now',
        summary: 'This needs emergency care right away.',
        steps: [
          'Call 911 or have someone else call while you help.',
          'Apply firm, direct pressure to the wound with a clean cloth or bandage.',
          "Don't remove the cloth if it soaks through — add more layers on top.",
          'Keep the injured area raised above heart level if possible.',
          'Stay with the person until help arrives.'
        ]
      },
      allergy: {
        title: 'Possible severe allergic reaction',
        summary: 'Facial or lip swelling and trouble breathing can signal anaphylaxis.',
        steps: [
          'Call 911 now, even if symptoms seem mild so far.',
          'If an epinephrine auto-injector is available, use it right away.',
          'Have the person lie flat with legs raised, unless breathing is difficult — then let them sit up.',
          'Loosen tight clothing and keep them calm and still.',
          'Stay with them until emergency responders arrive.'
        ]
      },
      snake: {
        title: 'Snake bite — get to an ER',
        summary: "Even if it doesn't look severe yet, snake bites need medical evaluation.",
        steps: [
          'Keep the bitten limb still and positioned below heart level.',
          'Remove rings, watches, or tight clothing near the bite before swelling starts.',
          "Don't cut the wound, apply ice, or try to suck out the venom.",
          "Don't apply a tight tourniquet — a loose, wide bandage above the bite is safer if you're trained to do so.",
          "Get to the nearest emergency room as soon as possible. Try to remember the snake's color and shape, but don't risk another bite to catch it."
        ]
      },
      insect: {
        title: 'Broken skin — clean and monitor',
        summary: 'Most insect stings can be treated at home, but keep an eye on it.',
        steps: [
          "If the stinger is still in the skin, scrape it out sideways with a card edge — don't pinch or squeeze it.",
          'Wash the area gently with soap and water.',
          'Apply a cold compress for 10–15 minutes to reduce pain and swelling.',
          'An antihistamine or hydrocortisone cream can help with itching.',
          'Watch for signs of a growing allergic reaction over the next hour — swelling spreading beyond the sting site, hives, or trouble breathing.'
        ]
      },
      bite: {
        title: 'Broken skin — clean and monitor',
        summaryTemplate: 'A {animal} with broken skin still needs proper cleaning and follow-up.',
        steps: [
          'Wash the wound with soap and water for a full 5 minutes.',
          'Apply gentle pressure with a clean cloth to stop any minor bleeding.',
          'Apply an antibiotic ointment and cover with a clean bandage.',
          'See a doctor within 24 hours — bite wounds often need antibiotics, and rabies risk should be assessed.',
          'Watch for redness, warmth, swelling, or fever over the next few days.'
        ]
      },
      scare: {
        title: 'Just a scare — no emergency care needed',
        summary: "Good news — this doesn't sound like it needs urgent treatment.",
        steps: [
          'Wash the area with soap and water as a precaution.',
          'Check for any small marks, redness, or swelling you might have missed.',
          'Keep an eye on it over the next few hours — new swelling, pain, or a rash are reasons to seek care.',
          'No emergency action is needed right now.'
        ]
      }
    },

    library_h1: 'Care library',
    library_desc_pre: "General guidance by animal. This isn't a substitute for the triage tool if something just happened — ",
    library_desc_link: 'start triage instead',
    library: {
      dog: { title: 'Dog bites', text: "Wash thoroughly, watch for infection, and check the dog's vaccination status. Most bites need a same-day medical check." },
      cat: { title: 'Cat bites & scratches', text: 'Cat bites puncture deep and infect easily. Clean right away and see a doctor if redness spreads within a day.' },
      snake: { title: 'Snake bites', text: "Treat every snake bite as potentially venomous. Keep the area still, stay calm, and get to an ER — don't try home remedies." },
      insect: { title: 'Insect stings', text: 'Remove the stinger, ice the area, and watch for allergic reaction signs like spreading swelling or trouble breathing.' },
      tick: { title: 'Tick bites', text: 'Remove the tick with fine tweezers, pulling straight out. Save it if you can, and watch for a rash or fever over the next few weeks.' },
      wildlife: { title: 'Wildlife bites', text: 'Bites from wild or unknown animals carry a rabies risk. Clean the wound and seek medical care promptly for evaluation.' }
    },

    findhelp_h1: 'Find help nearby',
    findhelp_desc: 'Locate the closest emergency room, urgent care, or vet clinic.',
    locate_btn: 'Use my location',
    locate_btn_locating: 'Locating…',
    locate_btn_refresh: 'Refresh results',
    locate_note_default: "We only use your location to find nearby care — it's never stored.",
    locate_note_success: 'Showing the closest options based on your current location.',
    locate_note_denied: 'We couldn\'t access your location. You can search "ER near me" in your maps app instead.',
    locate_note_unsupported: "Your browser doesn't support location — try searching \"ER near me\" instead.",
    place_er: 'Emergency Room',
    place_urgent: 'Urgent Care Clinic',
    place_vet: 'Animal / Vet Emergency Clinic',
    miles_away: 'about {d} mi away',

    signin_h2: 'Sign in',
    signin_choose: "Choose how you're using the site.",
    role_patient: 'Patient',
    role_doctor: 'Healthcare professional',
    label_email: 'Email',
    label_password: 'Password',
    placeholder_password: 'Enter your password',
    placeholder_email: 'you@example.com',
    btn_signin: 'Sign in',
    notice_pro: 'Professional accounts require license verification before you can respond to cases.',
    label_work_email: 'Work email',
    label_license: 'License or NPI number',
    placeholder_license: 'State license or NPI number',
    signin_no_account_note: "You don't need an account to get emergency guidance.",
    google_signin: 'Sign in with Google',
    forgot_password: 'Forgot password?',
    btn_signout: 'Sign out',

    patient_h1: 'Your account',
    patient_desc: 'Saved info and messages from your care team.',
    saved_profile_title: 'Saved profile',
    no_pets: 'No pets saved yet.',
    add_pet_btn: 'Add a pet profile',
    followup_msgs_title: 'Follow-up messages',
    followup_msgs_desc: 'Requests you send will show up here once a professional replies.',

    doctor_h1: 'Doctor portal',
    doctor_desc: 'Review incoming cases and reply to patients.',
    queue_title: 'Request queue',
    no_cases: 'No open cases right now.',
    messages_title: 'Messages',
    messages_desc: 'Conversations with patients will appear here.',

    footer_text: 'This site gives general first aid guidance and does not replace professional medical care. If you are experiencing a medical emergency, call your local emergency number immediately.'
  },

  ar: {
    logo: 'دليل الإسعافات الأولية',
    nav_library: 'مكتبة الرعاية',
    nav_findhelp: 'ابحث عن مساعدة',
    nav_signin: 'تسجيل الدخول',
    emergency_text: 'في خطر الآن؟ اتصل بـ 911',

    home_eyebrow: 'عضة. خدش. لسعة.',
    home_h1: 'اعرف ماذا تفعل خلال الستين ثانية القادمة.',
    home_sub: 'أجب عن ثلاثة أسئلة سريعة وسنخبرك بالضبط بما تحتاجه العضة أو الخدش الآن.',
    home_cta: '← ابدأ الفرز',
    card_library_title: 'مكتبة الرعاية',
    card_library_desc: 'تصفح أدلة الرعاية حسب نوع الحيوان — كلب، قطة، ثعبان، حشرة، والمزيد.',
    card_findhelp_title: 'ابحث عن مساعدة قريبة',
    card_findhelp_desc: 'حدد أقرب غرفة طوارئ أو عيادة رعاية عاجلة أو عيادة بيطرية.',
    card_account_title: 'الحساب',
    card_account_desc: 'احفظ ملفات الحيوانات الأليفة والحساسيات، وراسل طبيبًا للمتابعة.',

    step1: 'الخطوة 1 من 3', step2: 'الخطوة 2 من 3', step3: 'الخطوة 3 من 3',
    q1: 'ماذا حدث؟',
    animal_dog: 'عضة كلب', animal_cat: 'عضة أو خدش قطة', animal_snake: 'عضة ثعبان', animal_insect: 'لسعة حشرة',
    q2: 'هل النزيف غزير أو لا يتوقف؟',
    bleed_yes: 'نعم، نزيف غزير', bleed_no: 'لا، بسيط أو لا يوجد',
    q3: 'هل هناك تورم في الوجه أو الشفتين، أو صعوبة في التنفس؟',
    swell_yes: 'نعم', swell_no_broken: 'لا، لكن الجلد مجروح', swell_no_scare: 'لا، مجرد خوف',

    back_home: 'العودة إلى الرئيسية',
    followup_title: 'تريد رأيًا ثانيًا؟',
    followup_desc: 'سجّل الدخول لمراسلة أحد المختصين في الرعاية الصحية بخصوص هذا الأمر والحصول على متابعة شخصية.',
    followup_btn: 'تسجيل الدخول',

    animal_phrase: { dog: 'عضة كلب', cat: 'عضة أو خدش قطة', snake: 'عضة ثعبان', insect: 'لسعة حشرة' },

    results: {
      bleed: {
        title: 'نزيف غزير — تصرف الآن',
        summary: 'هذا يتطلب رعاية طارئة فورية.',
        steps: [
          'اتصل بـ 911 أو اطلب من شخص آخر الاتصال بينما تساعد.',
          'اضغط بثبات ومباشرة على الجرح بقطعة قماش نظيفة أو ضمادة.',
          'لا تزل القماش إذا تشبع بالدم — أضف طبقات أخرى فوقه.',
          'ارفع المنطقة المصابة فوق مستوى القلب إن أمكن.',
          'ابقَ مع المصاب حتى تصل المساعدة.'
        ]
      },
      allergy: {
        title: 'رد فعل تحسسي شديد محتمل',
        summary: 'تورم الوجه أو الشفتين وصعوبة التنفس قد يشيران إلى صدمة تحسسية.',
        steps: [
          'اتصل بـ 911 الآن، حتى لو بدت الأعراض خفيفة حتى الآن.',
          'إذا كان قلم الإبينفرين التلقائي متاحًا، استخدمه فورًا.',
          'اجعل الشخص يستلقي مسطحًا مع رفع الساقين، إلا إذا كان التنفس صعبًا — عندها دعه يجلس.',
          'حرّر الملابس الضيقة وحافظ على هدوئه وسكونه.',
          'ابقَ معه حتى يصل المستجيبون للطوارئ.'
        ]
      },
      snake: {
        title: 'عضة ثعبان — توجه إلى غرفة الطوارئ',
        summary: 'حتى لو لم تبدُ خطيرة بعد، تحتاج عضات الثعابين إلى تقييم طبي.',
        steps: [
          'حافظ على ثبات الطرف المصاب واجعله أسفل مستوى القلب.',
          'انزع الخواتم والساعات أو الملابس الضيقة القريبة من العضة قبل بدء التورم.',
          'لا تقطع الجرح، ولا تضع ثلجًا، ولا تحاول مص السم.',
          'لا تضع رباطًا ضاغطًا محكمًا — رباط واسع وفضفاض فوق العضة أكثر أمانًا إذا كنت مدربًا على ذلك.',
          'توجه إلى أقرب غرفة طوارئ في أسرع وقت ممكن. حاول تذكر لون وشكل الثعبان، لكن لا تخاطر بعضة أخرى لالتقاطه.'
        ]
      },
      insect: {
        title: 'جلد مجروح — نظّف وراقب',
        summary: 'يمكن علاج معظم لسعات الحشرات في المنزل، لكن راقبها.',
        steps: [
          'إذا كانت الإبرة لا تزال في الجلد، اكشطها جانبيًا بحافة بطاقة — لا تضغط عليها أو تعصرها.',
          'اغسل المنطقة برفق بالماء والصابون.',
          'ضع كمادة باردة لمدة 10-15 دقيقة لتقليل الألم والتورم.',
          'يمكن أن يساعد مضاد الهيستامين أو كريم الهيدروكورتيزون في تخفيف الحكة.',
          'راقب علامات تفاقم الحساسية خلال الساعة القادمة — تورم يمتد إلى ما بعد مكان اللسعة، شرى، أو صعوبة في التنفس.'
        ]
      },
      bite: {
        title: 'جلد مجروح — نظّف وراقب',
        summaryTemplate: 'تحتاج {animal} ذات الجلد المجروح إلى تنظيف ومتابعة مناسبين.',
        steps: [
          'اغسل الجرح بالماء والصابون لمدة 5 دقائق كاملة.',
          'اضغط برفق بقطعة قماش نظيفة لإيقاف أي نزيف بسيط.',
          'ضع مرهمًا مضادًا للبكتيريا وغطِّ الجرح بضمادة نظيفة.',
          'راجع طبيبًا خلال 24 ساعة — غالبًا ما تحتاج عضات الحيوانات إلى مضادات حيوية، ويجب تقييم خطر الإصابة بداء الكلب.',
          'راقب الاحمرار أو الدفء أو التورم أو الحمى خلال الأيام القليلة القادمة.'
        ]
      },
      scare: {
        title: 'مجرد خوف — لا حاجة لرعاية طارئة',
        summary: 'خبر جيد — لا يبدو أن هذا يحتاج إلى علاج عاجل.',
        steps: [
          'اغسل المنطقة بالماء والصابون كإجراء احترازي.',
          'تحقق من وجود أي علامات صغيرة أو احمرار أو تورم قد تكون فاتتك.',
          'راقب المنطقة خلال الساعات القليلة القادمة — التورم الجديد أو الألم أو الطفح الجلدي أسباب لطلب الرعاية.',
          'لا حاجة لأي إجراء طارئ الآن.'
        ]
      }
    },

    library_h1: 'مكتبة الرعاية',
    library_desc_pre: 'إرشادات عامة حسب نوع الحيوان. هذا ليس بديلاً عن أداة الفرز إذا حدث شيء للتو — ',
    library_desc_link: 'ابدأ الفرز بدلاً من ذلك',
    library: {
      dog: { title: 'عضات الكلاب', text: 'اغسل الجرح جيدًا، وراقب علامات العدوى، وتحقق من حالة تطعيم الكلب. تحتاج معظم العضات إلى فحص طبي في نفس اليوم.' },
      cat: { title: 'عضات وخدوش القطط', text: 'عضات القطط عميقة وتصاب بالعدوى بسهولة. نظّفها فورًا وراجع طبيبًا إذا انتشر الاحمرار خلال يوم واحد.' },
      snake: { title: 'عضات الثعابين', text: 'تعامل مع كل عضة ثعبان على أنها قد تكون سامة. حافظ على ثبات المنطقة، وابقَ هادئًا، وتوجه إلى غرفة الطوارئ — لا تجرب علاجات منزلية.' },
      insect: { title: 'لسعات الحشرات', text: 'أزل الإبرة، ضع الثلج على المنطقة، وراقب علامات الحساسية مثل التورم المنتشر أو صعوبة التنفس.' },
      tick: { title: 'عضات القراد', text: 'أزل القراد بملقط دقيق، بسحبه بشكل مستقيم للخارج. احتفظ به إن أمكن، وراقب ظهور طفح جلدي أو حمى خلال الأسابيع القادمة.' },
      wildlife: { title: 'عضات الحيوانات البرية', text: 'تحمل عضات الحيوانات البرية أو غير المعروفة خطر الإصابة بداء الكلب. نظّف الجرح واطلب رعاية طبية فورية للتقييم.' }
    },

    findhelp_h1: 'ابحث عن مساعدة قريبة',
    findhelp_desc: 'حدد أقرب غرفة طوارئ أو عيادة رعاية عاجلة أو عيادة بيطرية.',
    locate_btn: 'استخدم موقعي',
    locate_btn_locating: 'جارٍ تحديد الموقع…',
    locate_btn_refresh: 'تحديث النتائج',
    locate_note_default: 'نستخدم موقعك فقط للعثور على رعاية قريبة — لا يتم تخزينه أبدًا.',
    locate_note_success: 'عرض أقرب الخيارات بناءً على موقعك الحالي.',
    locate_note_denied: 'تعذر الوصول إلى موقعك. يمكنك البحث عن "غرفة طوارئ بالقرب مني" في تطبيق الخرائط بدلاً من ذلك.',
    locate_note_unsupported: 'متصفحك لا يدعم تحديد الموقع — جرّب البحث عن "غرفة طوارئ بالقرب مني" بدلاً من ذلك.',
    place_er: 'غرفة الطوارئ',
    place_urgent: 'عيادة الرعاية العاجلة',
    place_vet: 'عيادة طوارئ بيطرية',
    miles_away: 'على بعد حوالي {d} ميل',

    signin_h2: 'تسجيل الدخول',
    signin_choose: 'اختر كيفية استخدامك للموقع.',
    role_patient: 'مريض',
    role_doctor: 'مختص رعاية صحية',
    label_email: 'البريد الإلكتروني',
    label_password: 'كلمة المرور',
    placeholder_password: 'أدخل كلمة المرور',
    placeholder_email: 'you@example.com',
    btn_signin: 'تسجيل الدخول',
    notice_pro: 'تتطلب الحسابات المهنية التحقق من الترخيص قبل أن تتمكن من الرد على الحالات.',
    label_work_email: 'البريد الإلكتروني للعمل',
    label_license: 'رقم الترخيص أو NPI',
    placeholder_license: 'رقم الترخيص الرسمي أو NPI',
    signin_no_account_note: 'لست بحاجة إلى حساب للحصول على إرشادات الطوارئ.',
    google_signin: 'تسجيل الدخول عبر جوجل',
    forgot_password: 'نسيت كلمة المرور؟',
    btn_signout: 'تسجيل الخروج',

    patient_h1: 'حسابك',
    patient_desc: 'المعلومات المحفوظة والرسائل من فريق الرعاية الخاص بك.',
    saved_profile_title: 'الملف المحفوظ',
    no_pets: 'لم يتم حفظ أي حيوانات أليفة بعد.',
    add_pet_btn: 'أضف ملف حيوان أليف',
    followup_msgs_title: 'رسائل المتابعة',
    followup_msgs_desc: 'ستظهر الطلبات التي ترسلها هنا بمجرد أن يرد أحد المختصين.',

    doctor_h1: 'بوابة الطبيب',
    doctor_desc: 'راجع الحالات الواردة ورد على المرضى.',
    queue_title: 'قائمة الطلبات',
    no_cases: 'لا توجد حالات مفتوحة حاليًا.',
    messages_title: 'الرسائل',
    messages_desc: 'ستظهر المحادثات مع المرضى هنا.',

    footer_text: 'يقدم هذا الموقع إرشادات عامة للإسعافات الأولية ولا يغني عن الرعاية الطبية المتخصصة. إذا كنت تعاني من حالة طوارئ طبية، فاتصل برقم الطوارئ المحلي فورًا.'
  }
};

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

    // The toggle button always shows the OTHER language's name
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
     Any element with [data-nav="some-view-id"] switches views.
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

    // Account button routes to the right place depending on login state
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
     Triage flow
  --------------------------------------------------------- */
  const flowSteps = document.querySelectorAll('.flow-step');

  function showStep(stepNum) {
    flowSteps.forEach(step => {
      step.classList.toggle('active', Number(step.dataset.step) === stepNum);
    });
  }

  // Step 1 — animal
  document.querySelectorAll('[data-animal]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.triage.animal = btn.dataset.animal;
      showStep(2);
    });
  });

  // Step 2 — bleeding
  document.querySelectorAll('[data-step="2"] [data-answer]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.triage.bleed = btn.dataset.answer;
      // Heavy, uncontrolled bleeding is an immediate emergency —
      // skip straight to the result instead of asking about swelling.
      if (state.triage.bleed === 'bleed-yes') {
        state.triage.swell = null;
        renderResult();
        goTo('result-view');
      } else {
        showStep(3);
      }
    });
  });

  // Step 3 — swelling / breathing
  document.querySelectorAll('[data-step="3"] [data-answer]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.triage.swell = btn.dataset.answer;
      renderResult();
      goTo('result-view');
    });
  });

  // Reset the flow to step 1 whenever the user navigates into it fresh
  document.querySelectorAll('[data-nav="triage-view"]').forEach(el => {
    el.addEventListener('click', () => {
      state.triage = { animal: null, bleed: null, swell: null };
      showStep(1);
    });
  });

  /* ---------------------------------------------------------
     Triage result content (build DOM safely)
  --------------------------------------------------------- */
  function buildResult({ animal, bleed, swell }) {
    const R = translations[currentLang] && translations[currentLang].results ? translations[currentLang].results : translations.en.results;
    const animalPhrase = t('animal_phrase');

    // Priority 1: heavy / uncontrolled bleeding
    if (bleed === 'bleed-yes') {
      return { level: 'danger', title: R.bleed.title, summary: R.bleed.summary, steps: R.bleed.steps, followup: false };
    }

    // Priority 2: signs of a severe allergic reaction
    if (swell === 'swell-yes') {
      return { level: 'danger', title: R.allergy.title, summary: R.allergy.summary, steps: R.allergy.steps, followup: false };
    }

    // Priority 3: skin broken, no swelling — advice depends on animal
    if (swell === 'swell-no-broken') {
      if (animal === 'snake') {
        return { level: 'danger', title: R.snake.title, summary: R.snake.summary, steps: R.snake.steps, followup: true };
      }

      if (animal === 'insect') {
        return { level: 'warning', title: R.insect.title, summary: R.insect.summary, steps: R.insect.steps, followup: true };
      }

      // dog or cat
      const phrase = (animalPhrase && animalPhrase[animal]) || animal;
      return {
        level: 'warning',
        title: R.bite.title,
        summary: (R.bite.summaryTemplate || '').replace('{animal}', phrase),
        steps: R.bite.steps,
        followup: true
      };
    }

    // Priority 4: just a scare, skin not broken
    return { level: 'success', title: R.scare.title, summary: R.scare.summary, steps: R.scare.steps, followup: true };
  }

  function renderResult() {
    const data = buildResult(state.triage);
    const container = document.getElementById('result-content');
    if (!container) return;

    // Clear
    container.innerHTML = '';

    // Banner
    const banner = document.createElement('div');
    banner.className = `result-banner ${data.level}`;
    const h2 = document.createElement('h2');
    h2.textContent = data.title;
    const p = document.createElement('p');
    p.textContent = data.summary;
    banner.appendChild(h2);
    banner.appendChild(p);
    container.appendChild(banner);

    // Steps
    const stepsList = document.createElement('div');
    stepsList.className = 'steps-list';
    data.steps.forEach((text, i) => {
      const item = document.createElement('div');
      item.className = 'step-item';
      const num = document.createElement('span');
      num.className = 'step-num';
      num.textContent = (i + 1);
      const para = document.createElement('p');
      para.textContent = text;
      item.appendChild(num);
      item.appendChild(para);
      stepsList.appendChild(item);
    });
    container.appendChild(stepsList);

    // Followup card
    if (data.followup) {
      const card = document.createElement('div');
      card.className = 'followup-card';
      const cardH = document.createElement('h3');
      cardH.innerHTML = `<i class="icon-user" aria-hidden="true"></i> ${t('followup_title')}`;
      const cardP = document.createElement('p');
      cardP.textContent = t('followup_desc');
      const btn = document.createElement('button');
      btn.className = 'btn btn-secondary';
      btn.style.marginTop = '10px';
      btn.dataset.nav = 'signin-view';
      btn.textContent = t('followup_btn');
      card.appendChild(cardH);
      card.appendChild(cardP);
      card.appendChild(btn);
      container.appendChild(card);
    }

    // Back to home button
    const homeBtn = document.createElement('button');
    homeBtn.className = 'btn btn-secondary btn-full';
    homeBtn.dataset.nav = 'home-view';
    homeBtn.textContent = t('back_home');
    container.appendChild(homeBtn);
  }

  /* ---------------------------------------------------------
     Care library
  --------------------------------------------------------- */
  const libraryOrder = ['dog', 'cat', 'snake', 'insect', 'tick', 'wildlife'];

  function renderLibrary(force) {
    const grid = document.getElementById('library-grid');
    if (!grid) return;
    if (grid.dataset.rendered && !force) return;
    const guides = t('library') || translations.en.library;

    // Clear
    grid.innerHTML = '';
    libraryOrder.forEach(key => {
      const g = guides[key];
      if (!g) return;
      const card = document.createElement('div');
      card.className = 'library-card';
      const icon = document.createElement('i');
      icon.className = 'icon-book';
      icon.setAttribute('aria-hidden', 'true');
      const h3 = document.createElement('h3');
      h3.textContent = g.title;
      const p = document.createElement('p');
      p.textContent = g.text;
      card.appendChild(icon);
      card.appendChild(h3);
      card.appendChild(p);
      grid.appendChild(card);
    });

    grid.dataset.rendered = 'true';
  }

  renderLibrary();

  /* ---------------------------------------------------------
     Find help nearby
  --------------------------------------------------------- */
  const locateBtn = document.getElementById('locate-btn');
  const locateNote = document.getElementById('locate-note');
  const placeList = document.getElementById('place-list');

  const placeKindKeys = [
    { key: 'place_er', distanceMin: 0.6, distanceMax: 3.5 },
    { key: 'place_urgent', distanceMin: 0.3, distanceMax: 2.5 },
    { key: 'place_vet', distanceMin: 0.8, distanceMax: 4.0 }
  ];

  function renderPlaceholderResults() {
    if (!placeList) return;
    placeList.innerHTML = '';
    placeKindKeys.forEach(kind => {
      const li = document.createElement('li');
      const distance = (kind.distanceMin + Math.random() * (kind.distanceMax - kind.distanceMin)).toFixed(1);
      const distanceText = (t('miles_away') || translations.en.miles_away).replace('{d}', distance);
      const strong = document.createElement('strong');
      strong.textContent = t(kind.key);
      li.appendChild(strong);
      li.insertAdjacentHTML('beforeend', ` — ${distanceText}`);
      placeList.appendChild(li);
    });
    placeList.hidden = false;
  }

  if (locateBtn) {
    locateBtn.addEventListener('click', () => {
      locateBtn.disabled = true;
      locateBtn.textContent = t('locate_btn_locating') || translations.en.locate_btn_locating;

      if (!('geolocation' in navigator)) {
        if (locateNote) locateNote.textContent = t('locate_note_unsupported');
        locateBtn.disabled = false;
        locateBtn.textContent = t('locate_btn');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        () => {
          if (locateNote) locateNote.textContent = t('locate_note_success');
          renderPlaceholderResults();
          locateBtn.disabled = false;
          locateBtn.textContent = t('locate_btn_refresh');
        },
        () => {
          if (locateNote) locateNote.textContent = t('locate_note_denied');
          locateBtn.disabled = false;
          locateBtn.textContent = t('locate_btn');
        }
      );
    });
  }

  /* ---------------------------------------------------------
     Sign in — role toggle + form submission
  --------------------------------------------------------- */
  const rolePatientBtn = document.getElementById('role-patient');
  const roleDoctorBtn = document.getElementById('role-doctor');
  const patientForm = document.getElementById('patient-form');
  const doctorForm = document.getElementById('doctor-form');
  const googleBtn = document.getElementById('google-signin-btn');
  const forgotPassBtn = document.getElementById('forgot-pass-btn');

  function setRole(role) {
    const isDoctor = role === 'doctor';
    if (roleDoctorBtn && rolePatientBtn) {
      roleDoctorBtn.classList.toggle('active', isDoctor);
      rolePatientBtn.classList.toggle('active', !isDoctor);
    }
    if (doctorForm) doctorForm.hidden = !isDoctor;
    if (patientForm) patientForm.hidden = isDoctor;
  }

  if (rolePatientBtn && roleDoctorBtn) {
    rolePatientBtn.addEventListener('click', () => setRole('patient'));
    roleDoctorBtn.addEventListener('click', () => setRole('doctor'));
  }

  // 1️⃣ استمرار التسجيل تلقائياً (حفظ الجلسة حتى لو عمل Reload)
  if (window.fbAuth) {
    const { auth, onAuthStateChanged, getIdTokenResult } = window.fbAuth;
    if (onAuthStateChanged && auth) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // try to read role from custom claims; fallback to 'patient'
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

  // 2️⃣ التسجيل بالإيميل والباسورد
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
        await signInWithEmailAndPassword(auth, email, password);
        goTo('patient-account-view');
      } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert(currentLang === 'ar' ? 'تم إنشاء الحساب وتسجيل الدخول بنجاح!' : 'Account created and signed in!');
            goTo('patient-account-view');
          } catch (createError) {
            alert((currentLang === 'ar' ? 'خطأ: ' : 'Error: ') + createError.message);
          }
        } else {
          alert((currentLang === 'ar' ? 'خطأ في تسجيل الدخول: ' : 'Error signing in: ') + error.message);
        }
      }
    });
  }

  // 3️⃣ التسجيل بواسطة Google
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
        await signInWithPopup(auth, googleProvider);
        goTo('patient-account-view');
      } catch (error) {
        alert((currentLang === 'ar' ? 'خطأ في التسجيل بجوجل: ' : 'Error with Google sign-in: ') + error.message);
      }
    });
  }

  // 4️⃣ تغيير الباسورد (إرسال رابط الاستعادة للإيميل)
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

  // 5️⃣ تسجيل الخروج (Sign Out)
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