(function () {
  "use strict";

  var W = window.WEDDING;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var date = new Date(W.date);

  /* ---------- 언어 ---------- */
  var I18N = {
    ko: {
      week: ["일", "월", "화", "수", "목", "금", "토"],
      switchTo: "EN",
      switchLabel: "Switch to English",
      title: function (g, b) { return g + " ♥ " + b + " 결혼합니다"; },
      coverAlt: "웨딩 대표 사진",
      contact: "✆ 연락하기",
      contactTitle: "연락하기",
      side: { groom: "신랑", bride: "신부" },
      father: " 아버지",
      mother: " 어머니",
      // 칸: 부모님 | 의 | 관계 | 이름  (부모님 왼쪽 정렬, 관계 오른쪽 정렬)
      parentRow: function (f, m, rel, name) {
        return "<span>" + f + " · " + m + '</span><span class="parents__rel">의</span><span class="parents__rel parents__rel--end">' + rel + "</span>" + name;
      },
      dday: function (n, names) {
        return n > 0 ? names + "의 결혼식이 <em>" + n + "일</em> 남았습니다"
          : n === 0 ? "오늘은 " + names + "의 <em>결혼식</em>입니다"
          : names + "의 결혼식이 <em>" + -n + "일</em> 지났습니다";
      },
      galleryTitle: "우리의 순간",
      galleryMore: "사진 더보기 +",
      togetherLead: "서로의 연인이 된 지..",
      photoLabel: function (i) { return "사진 " + i + " 크게 보기"; },
      locationTitle: "오시는 길",
      naver: "네이버 지도", kakao: "카카오맵", tmap: "티맵",
      copyAddr: "주소 복사", callVenue: "예식장 전화",
      addrCopied: "주소가 복사되었습니다",
      accountTitle: "마음 전하실 곳",
      accountMsg: "참석이 어려우신 분들을 위해<br>계좌번호를 기재하였습니다.<br>너그러운 마음으로 양해 부탁드립니다.",
      accountHead: { groom: "신랑측 계좌번호", bride: "신부측 계좌번호" },
      holder: "예금주 ",
      copy: "복사",
      acctCopied: "계좌번호가 복사되었습니다",
      copied: "복사되었습니다",
      copyFail: "복사에 실패했습니다",
      footer: "Thank you for celebrating with us",
    },
    en: {
      week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      switchTo: "한국어",
      switchLabel: "한국어로 보기",
      title: function (g, b) { return g + " ♥ " + b + " are getting married"; },
      coverAlt: "Wedding photo",
      contact: "✆ Contact",
      contactTitle: "Contact",
      side: { groom: "Groom", bride: "Bride" },
      father: "'s father",
      mother: "'s mother",
      parentRow: function (f, m, rel, name) {
        return name + '<span class="parents__rel">' + rel + " of</span><span>" + f + " & " + m + "</span>";
      },
      dday: function (n, names) {
        return n > 0 ? "<em>" + n + (n === 1 ? " day" : " days") + "</em> until " + names + "'s wedding"
          : n === 0 ? "Today is " + names + "'s <em>wedding day</em>"
          : names + " have been married for <em>" + -n + (n === -1 ? " day" : " days") + "</em>";
      },
      galleryTitle: "Our Moments",
      galleryMore: "More photos +",
      togetherLead: "We have been together for",
      photoLabel: function (i) { return "View photo " + i; },
      locationTitle: "Location",
      naver: "Naver Map", kakao: "Kakao Map", tmap: "TMAP",
      copyAddr: "Copy address", callVenue: "Call venue",
      addrCopied: "Address copied",
      accountTitle: "Sending Your Love",
      accountMsg: "For those who are unable to attend,<br>we have shared our account details below.<br>Thank you for your kind understanding.",
      accountHead: { groom: "Groom's side", bride: "Bride's side" },
      holder: "Holder: ",
      copy: "Copy",
      acctCopied: "Account number copied",
      copied: "Copied",
      copyFail: "Copy failed",
      footer: "Thank you for celebrating with us",
    },
  };

  function pickLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "ko" || q === "en") return q;
    try {
      var saved = localStorage.getItem("lang");
      if (saved === "ko" || saved === "en") return saved;
    } catch (e) {}
    return /^ko\b/i.test(navigator.language || "ko") ? "ko" : "en";
  }
  var lang = pickLang();
  var L = I18N[lang];

  // { ko, en } 값이면 현재 언어로, 문자열이면 그대로
  function t(v) {
    if (v && typeof v === "object") return v[lang] != null && v[lang] !== "" ? v[lang] : v.ko;
    return v;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function nl2br(s) { return esc(s).replace(/\n/g, "<br>"); }
  function pad(n) { return String(n).padStart(2, "0"); }
  function tel(n) { return String(n).replace(/[^0-9+]/g, ""); }

  // 한국 시간 기준 날짜 구성요소
  function kst(d) {
    var k = new Date(d.getTime() + 9 * 3600 * 1000);
    return { y: k.getUTCFullYear(), m: k.getUTCMonth() + 1, d: k.getUTCDate(), w: k.getUTCDay(), h: k.getUTCHours(), min: k.getUTCMinutes() };
  }
  var D = kst(date);
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  function timeText() {
    var h = D.h % 12 || 12;
    if (lang === "en") return h + ":" + pad(D.min) + (D.h < 12 ? " AM" : " PM");
    return (D.h < 12 ? "오전" : "오후") + " " + h + "시" + (D.min ? " " + D.min + "분" : "");
  }
  function dateText() {
    if (lang === "en") return WEEKDAYS[D.w] + ", " + MONTHS[D.m - 1] + " " + D.d + ", " + D.y;
    return D.y + "년 " + D.m + "월 " + D.d + "일 " + L.week[D.w] + "요일";
  }
  function venueText() { return t(W.venue.name) + (t(W.venue.hall) ? " " + t(W.venue.hall) : ""); }

  /* ---------- 토스트 / 복사 ---------- */
  var toastTimer;
  function toast(msg) {
    var el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 1800);
  }
  function copy(text, msg) {
    var done = function () { toast(msg || L.copied); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { toast(L.copyFail); }
      document.body.removeChild(ta);
    }
  }

  /* ---------- 커버 ---------- */
  function renderCover() {
    $("#cover").innerHTML =
      '<div class="cover__date">' + D.y + "<strong>" + pad(D.m) + " / " + pad(D.d) + "</strong>" +
      WEEKDAYS[D.w].toUpperCase() + "</div>" +
      '<div class="cover__frame"><img class="cover__photo" src="' + esc(W.coverImage) + '" alt="' + L.coverAlt + '" /></div>' +
      '<p class="cover__names">' + esc(t(W.groom.name)) + "<span>♥</span>" + esc(t(W.bride.name)) + "</p>" +
      '<p class="cover__info">' + dateText() + " " + timeText() + "<br>" + esc(venueText()) + "</p>" +
      '<button class="scroll-hint" data-scroll="#greeting">SCROLL ↓</button>';
  }

  /* ---------- 인사말 ---------- */
  function parentName(p) {
    return '<span class="parents__name' + (p.deceased ? " deceased" : "") + '">' + esc(t(p.name)) + "</span>";
  }
  function parentRow(side) {
    var s = W[side];
    return '<div class="parents__row parents__row--' + lang + '">' +
      L.parentRow(parentName(s.father), parentName(s.mother), esc(t(s.relation)), "<b class=\"parents__name\">" + esc(t(s.firstName)) + "</b>") +
      "</div>";
  }
  function contactList(side) {
    var s = W[side], label = L.side[side];
    return [
      { role: label, name: t(s.name), phone: s.phone },
      { role: label + L.father, name: t(s.father.name), phone: s.father.phone, hide: s.father.deceased },
      { role: label + L.mother, name: t(s.mother.name), phone: s.mother.phone, hide: s.mother.deceased },
    ].filter(function (p) { return p.phone && !p.hide; });
  }
  function renderGreeting() {
    var groom = contactList("groom"), bride = contactList("bride");
    $("#greeting").innerHTML =
      '<div class="reveal"><p class="eyebrow">Invitation</p><h2 class="title">' + esc(t(W.greeting.title)) + "</h2>" +
      '<p class="greeting__msg">' + nl2br(t(W.greeting.message)) + "</p></div>" +
      '<div class="divider"></div>' +
      '<div class="parents reveal"><div class="parents__grid">' + parentRow("groom") + parentRow("bride") + "</div></div>" +
      (groom.length || bride.length ? '<button class="btn reveal" data-open-contact>' + L.contact + "</button>" : "");

    var rows = function (side, list) {
      if (!list.length) return "";
      return '<div class="contact-group"><h4>' + L.side[side] + "</h4>" + list.map(function (p) {
        return '<div class="contact-row"><span><small>' + esc(p.role) + "</small>" + esc(p.name) + "</span>" +
          '<span class="icons"><a href="tel:' + tel(p.phone) + '" aria-label="' + esc(p.name) + ' call"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>' +
          '<a href="sms:' + tel(p.phone) + '" aria-label="' + esc(p.name) + ' SMS"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></a></span></div>';
      }).join("") + "</div>";
    };
    $("#contact-title").textContent = L.contactTitle;
    $("#contact-body").innerHTML = rows("groom", groom) + rows("bride", bride);
  }

  /* ---------- 달력 / D-day ---------- */
  function renderCalendar() {
    var first = new Date(Date.UTC(D.y, D.m - 1, 1)).getUTCDay();
    var last = new Date(Date.UTC(D.y, D.m, 0)).getUTCDate();
    var cells = L.week.map(function (w, i) {
      return '<div class="cal__head ' + (i === 0 ? "sun" : i === 6 ? "sat" : "") + '">' + w + "</div>";
    });
    for (var i = 0; i < first; i++) cells.push("<div></div>");
    for (var d = 1; d <= last; d++) {
      var wd = (first + d - 1) % 7;
      var cls = d === D.d ? "day" : wd === 0 ? "sun" : wd === 6 ? "sat" : "";
      cells.push('<div class="cal__cell ' + cls + '">' + d + "</div>");
    }

    $("#calendar").innerHTML =
      '<div class="reveal"><p class="eyebrow">Wedding Day</p>' +
      '<p class="cal__date">' + dateText() + " " + timeText() + "</p>" +
      '<div class="cal">' + cells.join("") + "</div>" +
      '<div class="countdown">' +
      ["DAYS", "HOUR", "MIN", "SEC"].map(function (l) {
        return '<div class="countdown__item"><span class="countdown__num" data-cd="' + l + '">0</span><span class="countdown__label">' + l + "</span></div>";
      }).join("") +
      '</div><p class="dday"></p></div>';
    tick();
  }
  function tick() {
    var nums = document.querySelectorAll("[data-cd]");
    var diff = Math.max(0, date - Date.now());
    var s = Math.floor(diff / 1000);
    var v = [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
    nums.forEach(function (n, i) { n.textContent = i ? pad(v[i]) : v[i]; });

    // 날짜 기준 D-day (한국 시간)
    var today = kst(new Date());
    var days = Math.round((Date.UTC(D.y, D.m - 1, D.d) - Date.UTC(today.y, today.m - 1, today.d)) / 86400000);
    $(".dday").innerHTML = L.dday(days, esc(t(W.groom.firstName)) + " ♥ " + esc(t(W.bride.firstName)));
  }

  /* ---------- 갤러리 ---------- */
  var imgs = W.gallery || [];
  var galleryExpanded = false;
  function renderGallery() {
    var preview = galleryExpanded ? imgs.length : W.galleryPreviewCount || imgs.length;
    $("#gallery").innerHTML =
      '<p class="eyebrow reveal">Gallery</p><h2 class="title reveal">' + L.galleryTitle + "</h2>" +
      '<div class="gallery reveal">' + imgs.map(function (src, i) {
        return '<button data-i="' + i + '"' + (i >= preview ? " hidden" : "") + ' aria-label="' + L.photoLabel(i + 1) + '">' +
          '<img src="' + esc(src) + '" alt="" loading="lazy" /></button>';
      }).join("") + "</div>" +
      (imgs.length > preview ? '<button class="btn gallery-more">' + L.galleryMore + "</button>" : "") +
      renderTogether();
  }

  /* ---------- 인연이 시작된 지 (DAYS) ---------- */
  function together() {
    var p = W.metDate.split("-").map(Number); // [y, m, d]
    var n = kst(new Date());
    var years = n.y - p[0] - (n.m < p[1] || (n.m === p[1] && n.d < p[2]) ? 1 : 0);
    var days = Math.round((Date.UTC(n.y, n.m - 1, n.d) - Date.UTC(p[0] + years, p[1] - 1, p[2])) / 86400000);
    return { years: years, days: days, since: p[0] + ". " + pad(p[1]) + ". " + pad(p[2]) };
  }
  var togetherDone = false;
  function renderTogether() {
    if (!W.metDate) return "";
    var tg = together();
    var num = function (v, unit) {
      return '<span class="together__item"><b class="together__num" data-to="' + v + '">' + (togetherDone ? v : 0) + "</b>" +
        '<span class="together__unit">' + unit + "</span></span>";
    };
    return '<div class="together reveal"><div class="divider"></div><p class="eyebrow">Days</p>' +
      '<p class="together__lead">' + L.togetherLead + "</p>" +
      '<p class="together__nums">' + num(tg.years, "Years") + num(tg.days, "Days") + "</p>" +
      '<p class="together__since">since ' + tg.since + "</p></div>";
  }
  // 화면에 들어오면 0부터 숫자가 올라감
  function setupTogetherCount() {
    var box = $(".together");
    if (!box || togetherDone) return;
    var run = function () {
      togetherDone = true;
      var els = box.querySelectorAll("[data-to]");
      if (reduceMotion) { els.forEach(function (el) { el.textContent = el.dataset.to; }); return; }
      var t0 = null;
      (function step(ts) {
        if (t0 === null) t0 = ts;
        var k = Math.min(1, (ts - t0) / 1800), e = 1 - Math.pow(1 - k, 3);
        els.forEach(function (el) { el.textContent = Math.round(el.dataset.to * e); });
        if (k < 1) requestAnimationFrame(step);
      })(performance.now());
      // 프레임이 멈춰 있어도(백그라운드 탭 등) 최종 숫자는 표시
      setTimeout(function () { els.forEach(function (el) { el.textContent = el.dataset.to; }); }, 2000);
    };
    if (!("IntersectionObserver" in window)) return run();
    var o = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { o.disconnect(); setTimeout(run, 300); }
    }, { threshold: 0.5 });
    o.observe(box);
  }

  /* ---------- 오시는 길 ---------- */
  function renderLocation() {
    var v = W.venue;
    var nameKo = v.name.ko || v.name; // 한국 지도 앱에는 한글 이름으로 전달
    var naver = "https://map.naver.com/p/search/" + encodeURIComponent(v.searchAddress);
    var kakao = "https://map.kakao.com/link/to/" + encodeURIComponent(nameKo) + "," + v.lat + "," + v.lng;
    var tmap = "tmap://route?goalname=" + encodeURIComponent(nameKo) + "&goalx=" + v.lng + "&goaly=" + v.lat;

    $("#location").innerHTML =
      '<div class="reveal"><p class="eyebrow">Location</p><h2 class="title">' + L.locationTitle + "</h2>" +
      '<p class="venue__name">' + esc(venueText()) + "</p>" +
      '<p class="venue__addr">' + esc(t(v.address)) + (v.tel ? "<br>Tel. " + esc(v.tel) : "") + "</p></div>" +
      '<iframe class="map" loading="lazy" title="' + L.locationTitle + '" referrerpolicy="no-referrer-when-downgrade" ' +
      'src="https://maps.google.com/maps?q=' + v.lat + "," + v.lng + "&z=16&hl=" + lang + '&output=embed"></iframe>' +
      '<div class="map-links">' +
      '<a class="btn" href="' + naver + '" target="_blank" rel="noopener">' + L.naver + "</a>" +
      '<a class="btn" href="' + kakao + '" target="_blank" rel="noopener">' + L.kakao + "</a>" +
      '<a class="btn" href="' + tmap + '">' + L.tmap + "</a></div>" +
      '<div class="venue__actions"><button class="btn" data-copy="' + esc(v.searchAddress) + '" data-msg="addrCopied">' + L.copyAddr + "</button>" +
      (v.tel ? '<a class="btn" href="tel:' + tel(v.tel) + '">' + L.callVenue + "</a>" : "") + "</div>" +
      '<div class="transport">' + (v.transport || []).map(function (tr) {
        return '<div class="transport__item reveal"><h4>' + esc(t(tr.title)) + "</h4>" +
          tr.lines.map(function (l) { return "<p>" + esc(t(l)) + "</p>"; }).join("") + "</div>";
      }).join("") + "</div>";
  }

  /* ---------- 마음 전하실 곳 ---------- */
  function renderAccount() {
    var group = function (side) {
      return '<div class="acc reveal"><button class="acc__head" aria-expanded="false">' + L.accountHead[side] + "</button>" +
        '<div class="acc__body"><div class="acc__inner">' + W.accounts[side].map(function (a) {
          var full = a.bank + " " + a.number;
          return '<div class="acct"><div class="acct__info"><small>' + esc(t(a.role)) + "</small>" +
            esc(a.bank) + " " + esc(a.number) + "<br>" + L.holder + esc(a.name) + "</div>" +
            '<div class="acct__btns">' +
            (a.kakaopay ? '<a class="btn btn--kakaopay" href="' + esc(a.kakaopay) + '" target="_blank" rel="noopener">pay</a>' : "") +
            '<button class="btn" data-copy="' + esc(full) + '" data-msg="acctCopied">' + L.copy + "</button></div></div>";
        }).join("") + "</div></div></div>";
    };

    $("#account").innerHTML =
      '<p class="eyebrow reveal">Account</p><h2 class="title reveal">' + L.accountTitle + "</h2>" +
      '<p class="account__msg reveal">' + L.accountMsg + "</p>" +
      group("groom") + group("bride");
  }

  /* ---------- 이벤트 (한 번만 연결, 다시 그려도 유지) ---------- */
  var lenis = null;
  function lockScroll(on) {
    document.body.style.overflow = on ? "hidden" : "";
    if (lenis) on ? lenis.stop() : lenis.start();
  }
  function scrollToEl(el) {
    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  function bindEvents() {
    document.addEventListener("click", function (e) {
      var el;
      if ((el = e.target.closest("[data-copy]"))) copy(el.dataset.copy, L[el.dataset.msg]);
      else if ((el = e.target.closest("[data-scroll]"))) scrollToEl($(el.dataset.scroll));
      else if (e.target.closest("[data-open-contact]")) { $("#contact-modal").hidden = false; lockScroll(true); }
      else if (e.target.closest(".gallery-more")) {
        galleryExpanded = true;
        document.querySelectorAll(".gallery [hidden]").forEach(function (b) { b.hidden = false; });
        e.target.closest(".gallery-more").remove();
      }
      else if ((el = e.target.closest(".gallery button"))) openLightbox(+el.dataset.i);
      else if ((el = e.target.closest(".acc__head"))) {
        var acc = el.parentElement;
        el.setAttribute("aria-expanded", acc.classList.toggle("open"));
      }
      else if (e.target.closest("#lang-toggle")) setLang(lang === "ko" ? "en" : "ko");
    });

    var modal = $("#contact-modal");
    modal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) { modal.hidden = true; lockScroll(false); }
    });

    // 라이트박스
    var lb = $("#lightbox");
    $(".lightbox__close", lb).addEventListener("click", closeLightbox);
    $(".lightbox__nav--prev", lb).addEventListener("click", function () { showPhoto(cur - 1); });
    $(".lightbox__nav--next", lb).addEventListener("click", function () { showPhoto(cur + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (!modal.hidden && e.key === "Escape") { modal.hidden = true; lockScroll(false); }
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPhoto(cur - 1);
      if (e.key === "ArrowRight") showPhoto(cur + 1);
    });
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) showPhoto(cur + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  var cur = 0;
  function showPhoto(i) {
    var lb = $("#lightbox");
    cur = (i + imgs.length) % imgs.length;
    $(".lightbox__img", lb).src = imgs[cur];
    $(".lightbox__count", lb).textContent = cur + 1 + " / " + imgs.length;
  }
  function openLightbox(i) { showPhoto(i); $("#lightbox").hidden = false; lockScroll(true); }
  function closeLightbox() { $("#lightbox").hidden = true; lockScroll(false); }

  /* ---------- BGM ---------- */
  function setupBgm() {
    if (!W.bgm) return;
    var btn = $("#bgm-toggle");
    var audio = new Audio(W.bgm);
    audio.loop = true;
    btn.hidden = false;
    btn.addEventListener("click", function () {
      if (audio.paused) audio.play().then(function () { btn.classList.add("playing"); }, function () {});
      else { audio.pause(); btn.classList.remove("playing"); }
    });
  }

  /* ---------- 꽃잎 효과 ---------- */
  var reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function setupPetals() {
    if (!W.petals || reduceMotion) return;
    var box = $("#petals");
    for (var i = 0; i < 14; i++) {
      var p = document.createElement("span");
      p.className = "petal";
      var size = 6 + Math.random() * 8;
      p.style.cssText = "left:" + Math.random() * 100 + "%;width:" + size + "px;height:" + size + "px;" +
        "animation-duration:" + (9 + Math.random() * 8) + "s;animation-delay:" + -Math.random() * 15 + "s;" +
        "--drift:" + (Math.random() * 120 - 60) + "px";
      box.appendChild(p);
    }
  }

  /* ---------- 부드러운 스크롤 (Lenis, PC 마우스 휠) ---------- */
  function setupSmoothScroll() {
    if (!window.Lenis || reduceMotion) return;
    lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })(0);
  }

  /* ---------- 스크롤 등장 애니메이션 / 커버 패럴랙스 ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }) : null;

  function setupReveal(seen) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      // 언어 전환으로 다시 그릴 때, 이미 지나간 영역은 바로 표시
      if (!io || (seen && el.getBoundingClientRect().top < innerHeight)) el.classList.add("in");
      else io.observe(el);
    });
  }

  function setupParallax() {
    if (reduceMotion) return;
    var ticking = false;
    addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var img = $(".cover__photo");
        var y = Math.min(scrollY, innerHeight);
        if (img) img.style.transform = "translateY(" + y * 0.15 + "px) scale(1.08)";
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- 렌더 / 언어 전환 ---------- */
  function render(seen) {
    document.documentElement.lang = lang;
    document.title = L.title(t(W.groom.name), t(W.bride.name));
    var btn = $("#lang-toggle");
    btn.textContent = L.switchTo;
    btn.setAttribute("aria-label", L.switchLabel);
    $(".footer").textContent = L.footer;

    renderCover();
    renderGreeting();
    renderCalendar();
    renderGallery();
    renderLocation();
    renderAccount();
    setupReveal(seen);
    setupTogetherCount();
  }

  function setLang(next) {
    lang = next;
    L = I18N[lang];
    try { localStorage.setItem("lang", lang); } catch (e) {}
    var u = new URL(location.href);
    u.searchParams.set("lang", lang);
    history.replaceState(null, "", u);
    var y = scrollY;
    render(true);
    scrollTo(0, y);
  }

  render(false);
  bindEvents();
  setInterval(tick, 1000);
  setupBgm();
  setupPetals();
  setupSmoothScroll();
  setupParallax();
})();
