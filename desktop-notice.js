(function () {
  "use strict";

  const STORAGE_KEY = "typedesk_desktop_notice_dismissed";
  const MOBILE_BREAKPOINT = 900;

  // Desktop-sized viewport par popup nahi dikhega.
  if (window.innerWidth > MOBILE_BREAKPOINT) return;

  // User pehle hi popup dismiss kar chuka hai.
  try {
    if (localStorage.getItem(STORAGE_KEY) === "yes") return;
  } catch (error) {
    // Storage unavailable ho toh popup phir bhi dikhega.
  }

  function showDesktopNotice() {
    if (document.getElementById("typedesk-desktop-notice")) return;

    const style = document.createElement("style");

    style.textContent = `
      #typedesk-desktop-notice {
        position: fixed;
        inset: 0;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: rgba(15, 35, 65, 0.30);
        backdrop-filter: blur(7px);
        -webkit-backdrop-filter: blur(7px);
      }

      .td-notice-card {
        width: 100%;
        max-width: 360px;
        padding: 27px 23px;
        border: 1px solid rgba(255,255,255,.85);
        border-radius: 24px;
        background: rgba(255,255,255,.94);
        box-shadow: 0 20px 65px rgba(30, 80, 150, .20);
        text-align: center;
        color: #17345d;
        font-family: Inter, Arial, sans-serif;
        animation: tdNoticeIn .25s ease-out;
      }

      @keyframes tdNoticeIn {
        from {
          opacity: 0;
          transform: translateY(12px) scale(.97);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .td-notice-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 17px;
        display: grid;
        place-items: center;
        border-radius: 20px;
        background: linear-gradient(135deg, #e8f2ff, #d5e8ff);
        color: #3478f6;
        font-size: 31px;
      }

      .td-notice-card h2 {
        margin: 0 0 10px;
        font-size: 21px;
        font-weight: 750;
      }

      .td-notice-card p {
        margin: 0 0 22px;
        color: #64748b;
        font-size: 14px;
        line-height: 1.65;
      }

      .td-notice-button {
        width: 100%;
        padding: 13px 18px;
        border: 0;
        border-radius: 13px;
        background: linear-gradient(135deg, #3478f6, #5798ff);
        color: white;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
      }

      .td-notice-button:focus-visible {
        outline: 3px solid #9cc3ff;
        outline-offset: 3px;
      }

      .td-notice-skip {
        display: inline-block;
        margin-top: 15px;
        padding: 5px 10px;
        border: 0;
        background: transparent;
        color: #718096;
        font-size: 13px;
        cursor: pointer;
      }

      @media (prefers-reduced-motion: reduce) {
        .td-notice-card {
          animation: none;
        }
      }
    `;

    const overlay = document.createElement("div");
    overlay.id = "typedesk-desktop-notice";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "td-notice-title");

    overlay.innerHTML = `
      <div class="td-notice-card">
        <div class="td-notice-icon" aria-hidden="true">▣</div>

        <h2 id="td-notice-title">
          Better Experience on Desktop!
        </h2>

        <p>
          TypeDesk works best on a desktop.
          Switch to desktop mode for a better
          typing experience.
          You can also continue using the mobile version.
        </p>

        <button class="td-notice-button" type="button">
          Got it
        </button>

        <button class="td-notice-skip" type="button">
          Ignore and continue
        </button>
      </div>
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    function dismissNotice() {
      try {
        localStorage.setItem(STORAGE_KEY, "yes");
      } catch (error) {
        // Popup still closes if storage is unavailable.
      }

      overlay.remove();
      style.remove();
    }

    overlay.querySelector(".td-notice-button")
      .addEventListener("click", dismissNotice);

    overlay.querySelector(".td-notice-skip")
      .addEventListener("click", dismissNotice);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showDesktopNotice);
  } else {
    showDesktopNotice();
  }
})();
