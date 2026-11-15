// Shared parts of the mock-up: header, note bar, section banner, sidebar,
// tabs, and the "request contact" window. Nothing here talks to a server.
(function () {
  const page = document.body.dataset.page || "";
  const LOGO = "https://community.itqan.dev/assets/logo-hppso2lt.png";

  const header = `
  <div class="mockbar"><div>
    <b>تصوّر توضيحي</b> لترقية قسم «الفرص والوظائف»، وليس الموقع الحقيقي. الأسماء والبيانات أمثلة متخيلة.
    <span>الصفحات:</span>
    <a href="before.html">قبل الترقية</a>
    <a href="index.html">الفرص</a>
    <a href="opportunity.html">فرصة</a>
    <a href="people.html">الأشخاص</a>
    <a href="profile.html">ملف شخص</a>
    <a href="new.html">انشر فرصة</a>
    <a href="requests.html">طلباتي</a>
    <a href="templates.html">نماذج الاتفاقيات</a>
  </div></div>
  <header><div class="hbar">
    <a class="brand" href="index.html"><img src="${LOGO}" alt="إتقان"></a>
    <nav class="hlinks"><a href="#">موقع إتقان</a><a href="#">نشرة إتقان</a></nav>
    <div class="search">🔍 بحث في المجتمع</div>
    <div class="me"><span>أنت</span><span class="dot">أ</span></div>
  </div></header>`;

  const hero = `
  <section class="hero">
    <h1>🤝 شراكات واستثمار</h1>
    <div class="slogan" id="slogan" aria-live="polite">فكرتك في الدرج؟ أخرجها بشريك.</div>
    <p>مساحة لفرص العمل والتطوع، وللبحث عن شركاء ومساهمين وممولين للمشاريع القرآنية والإسلامية بصيغ منضبطة، وعرض المهارات والخبرات لمن يرغب في الانضمام إلى مشاريع جديدة.</p>
    <span class="new">مُحدَّث: الفرص المنظَّمة · دليل الأشخاص · التواصل بموافقة الطرفين</span>
  </section>`;

  const subs = [
    ["index.html", "الفرص", "index"],
    ["people.html", "الأشخاص", "people"],
    ["requests.html", "طلباتي", "requests"],
    ["templates.html", "نماذج الاتفاقيات", "templates"],
  ];
  const aside = `
  <a class="start" href="new.html">بدء موضوع</a>
  <ul>
    <li><span class="i"></span>جميع المواضيع</li>
    <li><span class="i"></span>الأقسام</li>
    <li style="height:8px"></li>
    <li><span class="i"></span>الإعلانات والفعاليات (45)</li>
    <li><span class="i"></span>المشاريع والتعاون (214)</li>
    <li><span class="i"></span>مشاريع نشطة (24)</li>
    <li><span class="i"></span>الأدوات والموارد (82)</li>
    <li><span class="i"></span>نقاشات المطورين (194)</li>
    <li><span class="i"></span>فضاء الأفكار (56)</li>
    <li><span class="i"></span>تطبيقات ملهمة (118)</li>
    <li class="on newsec"><span class="i"></span>شراكات واستثمار (17)<span class="newbadge">جديد</span></li>
  </ul>
  <div class="pointer" aria-hidden="true">➜</div>
  <ul class="sub">
    ${subs.map(([h, t, p]) => `<li class="${(page === p || (p === "index" && page === "opportunity") || (p === "people" && page === "profile")) ? "on" : ""}"><a href="${h}">${t}</a></li>`).join("")}
  </ul>`;

  const tabs = `
  <nav class="tabs">
    <a href="index.html" class="${page === "index" || page === "opportunity" ? "on" : ""}">الفرص</a>
    <a href="people.html" class="${page === "people" || page === "profile" ? "on" : ""}">الأشخاص</a>
    <a href="requests.html" class="${page === "requests" ? "on" : ""}">طلباتي <span class="n">2</span></a>
    <a href="templates.html" class="${page === "templates" ? "on" : ""}">نماذج الاتفاقيات</a>
    <span class="grow"></span>
    <a class="btn" href="new.html" style="margin-bottom:6px">＋ انشر فرصة</a>
  </nav>`;

  const modal = `
  <div class="modal" id="contactModal" role="dialog" aria-label="طلب تواصل">
    <div class="mbox form">
      <h2>طلب تواصل</h2>
      <div class="meta">مع: <b id="mWho">صاحب الفرصة</b></div>
      <div class="why" style="margin-top:10px"><b>لا تُكشف وسائل التواصل الآن.</b> يصل طلبك إلى الطرف الآخر، وإن قبله ظهرت وسائل التواصل التي اختارها كلٌّ منكما للآخر فقط.</div>
      <label>بماذا تستطيع أن تساعد؟ <span class="hint">(سطران أو ثلاثة)</span></label>
      <textarea>عندي خبرة 4 سنوات في نشر تطبيقات أندرويد على Google Play وتحسين ظهورها، وأبحث عن شراكة بنسبة.</textarea>
      <label>ما الذي تشاركه إن قُبل الطلب؟</label>
      <div class="seg" data-multi>
        <button type="button" class="on">💬 واتساب</button>
        <button type="button" class="on">✈️ تيليجرام</button>
        <button type="button">✉️ البريد</button>
        <button type="button">📞 مكالمة</button>
      </div>
      <label>الأوقات المناسبة</label>
      <div class="seg" data-multi>
        <button type="button">صباحًا</button>
        <button type="button" class="on">مساءً</button>
        <button type="button">نهاية الأسبوع</button>
      </div>
      <div class="switch"><input type="checkbox" checked id="nda"><label for="nda" style="margin:0;font-weight:400">أتعهد بالمحافظة على سرية ما يُشارك معي من تفاصيل الفكرة، ولا أستخدمها دون إذن صاحبها. <a href="templates.html" style="color:#17594a;text-decoration:underline">اتفاقية السرية المبسطة</a></label></div>
      <div class="mfoot">
        <button class="btn gray" type="button" data-close>إلغاء</button>
        <button class="btn" type="button" id="mSend">أرسل الطلب</button>
      </div>
    </div>
  </div>
  <div class="toast" id="toast"></div>`;

  const put = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  document.body.insertAdjacentHTML("afterbegin", header);
  put("hero", hero);
  put("aside", aside);
  put("tabs", tabs);
  document.body.insertAdjacentHTML("beforeend", modal);

  // Rotating slogans in the banner
  const SLOGANS = [
    "فكرتك في الدرج؟ أخرجها بشريك.",
    "اطلب شريكًا… وفكرتك في أمان.",
    "لا أرقام في العلن، التواصل بموافقة الطرفين.",
    "اعرض مهارتك، ودع المشاريع تجدك.",
    "ربحٌ مبارك… وأجرٌ لا ينقطع.",
    "يدٌ تبني، ويدٌ تموّل، والبركة في الاجتماع.",
  ];
  window.rotateSlogans = (el, list) => {
    if (!el) return;
    let i = 0;
    setInterval(() => {
      el.classList.add("out");
      setTimeout(() => { i = (i + 1) % list.length; el.textContent = list[i]; el.classList.remove("out"); }, 450);
    }, 3200);
  };
  rotateSlogans(document.getElementById("slogan"), SLOGANS);
  window.SLOGANS = SLOGANS;

  // Toast
  window.toast = (msg) => {
    const t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 3800);
  };

  // Contact window
  const m = document.getElementById("contactModal");
  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-contact]");
    if (open) {
      e.preventDefault();
      document.getElementById("mWho").textContent = open.dataset.contact || "صاحب الفرصة";
      m.classList.add("open");
    }
    if (e.target.closest("[data-close]") || e.target === m) m.classList.remove("open");
    const seg = e.target.closest(".seg button");
    if (seg) {
      const group = seg.parentElement;
      if (!group.hasAttribute("data-multi")) group.querySelectorAll("button").forEach(b => b.classList.remove("on"));
      seg.classList.toggle("on", group.hasAttribute("data-multi") ? !seg.classList.contains("on") : true);
      group.dispatchEvent(new Event("segchange", { bubbles: true }));
    }
  });
  document.getElementById("mSend").addEventListener("click", () => {
    m.classList.remove("open");
    toast("أُرسل الطلب ✓ تظهر وسائل التواصل حين يقبله الطرف الآخر. تابعه في «طلباتي».");
  });
})();
