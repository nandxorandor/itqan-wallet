// Two features from earlier proposals, shown here to give the whole picture:
// the «نبض إتقان» strip (/d/983) and the «اسأل إتقان» window (/d/947).
// Both are mock-ups: nothing here talks to a server.
(function () {
  if (document.body.dataset.page === "before") return; // the "before" page shows today's site
  const LOGO = "https://community.itqan.dev/assets/logo-hppso2lt.png";
  const NABD = "https://community.itqan.dev/d/983";
  const ASK = "https://community.itqan.dev/d/947";

  document.head.insertAdjacentHTML("beforeend", `<style>
  .nb { background:linear-gradient(135deg,#17705c,#0e4f41); color:#fff; }
  .nb.hidden { display:none; }
  .nb-in { max-width:1180px; margin:0 auto; display:flex; align-items:stretch; height:42px; }
  .nb-lbl { flex:none; display:flex; align-items:center; gap:8px; padding:0 14px 0 16px; background:rgba(0,0,0,.18); font-weight:700; font-size:13.5px; white-space:nowrap; }
  .nb-lbl img { height:24px; width:24px; object-fit:contain; background:#fff; border-radius:6px; padding:2px; }
  .nb-live { width:8px; height:8px; border-radius:50%; background:#5ee0b5; animation:nbpulse 1.8s infinite; }
  @keyframes nbpulse { 0%{box-shadow:0 0 0 0 rgba(94,224,181,.7)} 70%{box-shadow:0 0 0 8px rgba(94,224,181,0)} 100%{box-shadow:0 0 0 0 rgba(94,224,181,0)} }
  .nb-vp { flex:1; min-width:0; overflow:hidden; direction:ltr;
    -webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent); mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent); }
  .nb-track { display:flex; width:max-content; height:100%; align-items:center; animation:nbscroll 80s linear infinite; }
  .nb.hovering .nb-track, .nb.paused .nb-track { animation-play-state:paused; }
  @keyframes nbscroll { from { transform:translateX(-50%); } to { transform:translateX(0); } }
  .nb-item { direction:rtl; display:flex; align-items:center; gap:8px; padding:0 20px; white-space:nowrap; font-size:13.5px; color:#fff; text-decoration:none; }
  .nb-item:hover .nb-t { text-decoration:underline; }
  .nb-k { font-size:11.5px; font-weight:700; padding:1px 8px; border-radius:20px; background:#fff; color:#0e4f41; }
  .nb-k.partner { background:#c9f2e3; } .nb-k.fund { background:#ffd9c7; color:#6b2a0d; }
  .nb-k.job { background:#e6dcff; color:#3b2479; } .nb-k.vol { background:#fff1b8; color:#5b4300; }
  .nb-k.done { background:#d7f5d0; color:#1f5a14; } .nb-k.ev { background:#ffe7a8; color:#5b4300; }
  .nb-k.waqf { background:#e3ecff; color:#1d3f8f; }
  .nb-sep { opacity:.5; }
  .nb-from { flex:none; align-self:center; margin:0 6px; font-size:11px; color:#c9f2e3; border:1px solid rgba(255,255,255,.35); border-radius:20px; padding:1px 9px; text-decoration:none; white-space:nowrap; }
  .nb-from:hover { background:rgba(255,255,255,.12); }
  .nb-btn { flex:none; background:none; border:0; color:#fff; opacity:.85; cursor:pointer; padding:0 10px; font-size:15px; }
  .nb-btn:hover { opacity:1; }
  .nb-show { display:none; position:fixed; top:80px; right:16px; z-index:15; border:0; border-radius:20px; padding:4px 12px; background:linear-gradient(135deg,#17705c,#0e4f41); color:#fff; font:700 12.5px "Segoe UI",Tahoma,sans-serif; cursor:pointer; box-shadow:0 4px 12px rgba(10,50,40,.25); }
  .nb-show.on { display:block; }

  .ask-btn { position:fixed; left:20px; bottom:20px; z-index:40; display:flex; align-items:center; gap:9px; padding:8px 16px 8px 10px; border:0; border-radius:30px; background:linear-gradient(135deg,#17705c,#0e4f41); color:#fff; font:700 14px "Segoe UI",Tahoma,sans-serif; cursor:pointer; box-shadow:0 10px 26px rgba(10,50,40,.3); }
  .ask-btn::before, .ask-btn::after { content:""; position:absolute; inset:0; border-radius:30px; border:2px solid #22b58f; z-index:-1; animation:askring 2.4s ease-out infinite; }
  .ask-btn::after { animation-delay:1.2s; }
  @keyframes askring { 0% { transform:scale(1); opacity:.8; } 100% { transform:scale(1.6,2.1); opacity:0; } }
  .ask-btn img { height:28px; width:28px; object-fit:contain; background:#fff; border-radius:50%; padding:3px; }
  .ask { position:fixed; left:20px; bottom:20px; z-index:41; width:min(390px,calc(100vw - 32px)); border-radius:20px; overflow:hidden; background:#f4f6f5; color:#22262b; box-shadow:0 18px 50px rgba(10,50,40,.3); border:1px solid #d9e2df; font-size:14px; line-height:1.7; display:none; }
  .ask.open { display:block; }
  .ask-top { display:flex; align-items:center; gap:10px; padding:10px 14px; background:#fff; border-bottom:1px solid #e3e8e6; }
  .ask-top img { height:30px; }
  .ask-who { flex:1; line-height:1.35; }
  .ask-who b { display:block; font-size:15px; }
  .ask-who span { font-size:12px; color:#17705c; }
  .ask-who a { font-size:11px; color:#6b7470; text-decoration:underline; }
  .ask-x { background:none; border:0; font-size:16px; cursor:pointer; color:#6b7470; }
  .ask-log { padding:14px 12px; display:flex; flex-direction:column; gap:9px; max-height:min(340px, calc(100vh - 190px)); overflow-y:auto; }
  .ask-q, .ask-a { max-width:88%; padding:9px 13px; }
  .ask-q { align-self:flex-start; background:linear-gradient(135deg,#17705c,#0e4f41); color:#fff; border-radius:15px 15px 15px 4px; }
  .ask-a { align-self:flex-end; background:#fff; border-radius:15px 15px 4px 15px; box-shadow:0 1px 4px rgba(0,0,0,.08); }
  .ask-src { display:block; margin-top:6px; padding:6px 10px; background:#eaf4f1; border-radius:9px; font-size:13px; line-height:1.5; color:#0f6652; text-decoration:none; }
  .ask-src small { display:block; color:#626973; }
  .ask-in { display:flex; gap:8px; padding:9px 10px; background:#fff; border-top:1px solid #e3e8e6; }
  .ask-in input { flex:1; min-width:0; border:0; outline:0; padding:8px 14px; border-radius:20px; background:#f0f2f1; font:inherit; font-size:13.5px; }
  .ask-in button { flex:none; width:38px; height:38px; border:0; border-radius:50%; background:#17705c; color:#fff; cursor:pointer; font-size:15px; }
  @media (max-width:820px) { .nb-lbl .nb-txt, .nb-from { display:none; } }
  </style>`);

  // ---- نبض إتقان ----
  // Mostly partnership news (opportunities, funding, completed partnerships),
  // mixed with general community items, as the strip would show them.
  const ITEMS = [
    ["partner", "🤝 شراكة", "تطبيق أندرويد لتعليم القرآن جاهز بنسبة 90%، ويبحث عن شريك للنشر والتسويق", "opportunity.html?o=android"],
    ["fund", "💰 تمويل", "منصة الزكاة والمواريث (3 آلاف مستخدم شهريًا) تبحث عن ممول بصيغة المضاربة", "opportunity.html?o=zakat"],
    ["done", "✅ اكتملت", "أداة البحث الصرفي وجدت شريكها في معالجة اللغة، وانتقلت إلى «مشاريع نشطة»", "opportunity.html?o=sarf"],
    ["ev", "فعالية", "ورشة مع ترتيل: كيف تقيّم نماذج التلاوة؟", "https://community.itqan.dev/d/945"],
    ["job", "💼 وظيفة", "جمعية النور تطلب مطور Flutter بدوام جزئي لتطبيق حلقات التحفيظ", "opportunity.html?o=flutter"],
    ["vol", "🌱 تطوع", "مطلوب أهل التجويد لمراجعة توسيم 500 مقطع تلاوة، ساعتان أسبوعيًا", "opportunity.html?o=tajweed"],
    ["", "🙋 خبرة", "مصممة واجهات UI/UX متاحة لشراكة بنسبة، وموصى بها من شريكين سابقين", "profile.html?p=maryam"],
    ["waqf", "🤲 وقف", "4 فرص هذا الشهر تعهد أصحابها بنسبة من أرباحها للخير", "index.html"],
    ["", "📊 الشهر", "12 فرصة جديدة · 31 طلب تواصل · 3 شراكات اكتملت", "index.html"],
    ["", "🙋 خبرة", "خبير تسويق رقمي للتطبيقات الإسلامية متاح 3 ساعات أسبوعيًا", "profile.html?p=khaled"],
    ["", "📄 نماذج", "نموذج المضاربة ونموذج المشاركة جاهزان، بعد مراجعة مختص", "templates.html"],
    ["ev", "لقاء", "لقاء شهري بين أصحاب المشاريع والمموّلين، الخميس 9 مساءً", "index.html"],
    ["", "إصدار", "quran-search-engine v0.4.0 ثمرة حملة «كود يخدم القرآن»", "https://community.itqan.dev/d/944"],
  ];
  const one = ITEMS.map(([c, k, t, h]) =>
    `<a class="nb-item" href="${h}"><span class="nb-k ${c}">${k}</span><span class="nb-t">${t}</span></a><span class="nb-sep">◆</span>`).join("");
  const strip = `
  <div class="nb" id="nb" role="region" aria-label="نبض إتقان">
    <div class="nb-in">
      <div class="nb-lbl"><img src="${LOGO}" alt=""><span class="nb-live" aria-hidden="true"></span><span class="nb-txt">نبض إتقان</span></div>
      <div class="nb-vp"><div class="nb-track">${one + one}</div></div>
      <a class="nb-from" href="${NABD}" target="_blank" rel="noopener" title="مقترح «نبض إتقان» في المجتمع">من مقترح سابق ↗</a>
      <button class="nb-btn" id="nbPause" title="إيقاف مؤقت" aria-label="إيقاف مؤقت">⏸</button>
      <button class="nb-btn" id="nbClose" title="إخفاء الشريط" aria-label="إخفاء الشريط">✕</button>
    </div>
  </div>
  <button class="nb-show" id="nbShow" title="إظهار الشريط">▾ نبض إتقان</button>`;
  const header = document.querySelector("body > header");
  if (header) header.insertAdjacentHTML("afterend", strip);
  else document.body.insertAdjacentHTML("afterbegin", strip);

  const nb = document.getElementById("nb"), pauseBtn = document.getElementById("nbPause"), show = document.getElementById("nbShow");
  pauseBtn.addEventListener("click", () => {
    const p = nb.classList.toggle("paused");
    pauseBtn.textContent = p ? "▶" : "⏸"; pauseBtn.title = p ? "تشغيل" : "إيقاف مؤقت";
  });
  const vp = nb.querySelector(".nb-vp");
  vp.addEventListener("pointerenter", () => nb.classList.add("hovering"));
  vp.addEventListener("pointerleave", () => nb.classList.remove("hovering"));
  document.getElementById("nbClose").addEventListener("click", () => { nb.classList.add("hidden"); nb.classList.remove("hovering"); show.classList.add("on"); });
  show.addEventListener("click", () => { nb.classList.remove("hidden"); show.classList.remove("on"); });

  // ---- اسأل إتقان ----
  const src = (h, t, d) => `<a class="ask-src" href="${h}">${t}<small>${d}</small></a>`;
  // A few canned answers picked by keyword (the real one would search the forum).
  const ANSWERS = [
    [/مصمم|تصميم|واجهات|UI/i, `وجدت في «الأشخاص» من يعرض هذه الخبرة:${src("profile.html?p=maryam", "مريم عادل: مصممة واجهات UI/UX", "متاحة لشراكة بنسبة · 10 ساعات أسبوعيًا")}${src("people.html", "دليل الأشخاص", "صفِّ بالمهارة ونوع المساعدة")}`],
    [/تمويل|ممول|مموّل|مضاربة|استثمار/, `فرص التمويل المفتوحة الآن:${src("opportunity.html?o=zakat", "منصة الزكاة والمواريث تبحث عن ممول", "مضاربة · منذ 6 أيام")}وللاتفاق:${src("templates.html", "نموذج المضاربة", "مراجَع من مختص")}`],
    [/تسويق|نشر|Google/i, `${src("profile.html?p=khaled", "خالد منصور: تسويق رقمي للتطبيقات", "متاح 3 ساعات أسبوعيًا")}${src("opportunity.html?o=android", "تطبيق أندرويد يبحث عن شريك للنشر والتسويق", "مفتوحة · منذ يومين")}`],
    [/تطوع|متطوع|تجويد/, `${src("opportunity.html?o=tajweed", "مراجعة توسيم 500 مقطع تلاوة", "تطوع · ساعتان أسبوعيًا")}`],
    [/حكم|يجوز|جائز|حلال|حرام/, `لا أصدر أحكامًا شرعية. نماذج الاتفاقيات في القسم راجعها مختص، وما سوى ذلك يُرجع فيه إلى أهل العلم.${src("templates.html", "نماذج الاتفاقيات", "المشاركة · المضاربة · العمل بأجر · السرية")}`],
    [/شريك|شراكة|فكرت|أنشر|انشر/, `من «انشر فرصة»: اكتب ما تحتاجه لا ما تبنيه، وضع تفاصيل الفكرة في حقل «التفاصيل المخفية»، فلا يراها إلا من تقبل طلبه.${src("new.html", "انشر فرصة", "نموذج من 4 خطوات")}${src("templates.html", "اتفاقية السرية المبسطة", "يوافق عليها الطرف الآخر بضغطة")}`],
  ];
  const ask = `
  <button class="ask-btn" id="askBtn"><img src="${LOGO}" alt="">اسأل إتقان</button>
  <div class="ask" id="ask" role="dialog" aria-label="اسأل إتقان">
    <div class="ask-top">
      <img src="${LOGO}" alt="شعار إتقان">
      <div class="ask-who"><b>اسأل إتقان</b><span>يجيب من نقاشات المجتمع</span> · <a href="${ASK}" target="_blank" rel="noopener">من مقترح سابق ↗</a></div>
      <button class="ask-x" id="askX" aria-label="إغلاق">✕</button>
    </div>
    <div class="ask-log" id="askLog">
      <div class="ask-q">عندي فكرة تطبيق، كيف أطلب شريكًا دون أن أكشفها؟</div>
      <div class="ask-a">${ANSWERS[5][1]}</div>
      <div class="ask-q">هل يوجد من يموّل مشروعًا قائمًا؟</div>
      <div class="ask-a">${ANSWERS[1][1]}</div>
    </div>
    <form class="ask-in" id="askForm">
      <input id="askQ" placeholder="جرّب: أبحث عن مصمم واجهات" autocomplete="off">
      <button aria-label="إرسال">➤</button>
    </form>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", ask);
  const box = document.getElementById("ask"), btn = document.getElementById("askBtn"), log = document.getElementById("askLog");
  btn.addEventListener("click", () => { box.classList.add("open"); btn.style.display = "none"; log.scrollTop = log.scrollHeight; });
  document.getElementById("askX").addEventListener("click", () => { box.classList.remove("open"); btn.style.display = ""; });
  document.getElementById("askForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const inp = document.getElementById("askQ"), text = inp.value.trim();
    if (!text) return;
    const q = document.createElement("div"); q.className = "ask-q"; q.textContent = text; log.appendChild(q);
    const hit = ANSWERS.find(([re]) => re.test(text));
    const a = document.createElement("div"); a.className = "ask-a";
    a.innerHTML = hit ? hit[1] : "هذا تصور توضيحي بإجابات محدودة. جرّب أن تسأل عن: شريك، تمويل، مصمم، تسويق، تطوع.";
    log.appendChild(a); inp.value = ""; log.scrollTop = log.scrollHeight;
  });
})();
