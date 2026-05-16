(function () {
  "use strict";

  // State
  let state = {
    filter: "all",
    category: "all",
    searchQuery: "",
    bookmarks: JSON.parse(localStorage.getItem("cetBookmarks") || "[]"),
    showingBookmarks: false,
    expandedRoot: null,
    flashcardMode: false,
    flashcardIndex: 0,
    flashcardFlipped: false,
    studyQueue: [],
  };

  // DOM refs
  const $ = (id) => document.getElementById(id);
  const el = {
    grid: $("rootsGrid"),
    search: $("searchInput"),
    stats: $("statsBar"),
    filterBtns: document.querySelectorAll(".filter-btn"),
    categoryTags: document.querySelectorAll(".category-tag"),
    modal: $("flashcardModal"),
    modalClose: $("modalClose"),
    flashcard: $("flashcard"),
    cardWord: $("cardWord"),
    cardHint: $("cardHint"),
    cardMeaning: $("cardMeaning"),
    cardRoot: $("cardRoot"),
    cardLevel: $("cardLevel"),
    prevBtn: $("prevBtn"),
    nextBtn: $("nextBtn"),
    shuffleBtn: $("shuffleBtn"),
    flipBtn: $("flipBtn"),
    flashcardProgress: $("flashcardProgress"),
    modalTitle: $("modalTitle"),
    studyAllBtn: $("studyAllBtn"),
    studyRootBtn: $("studyRootBtn"),
    wordModal: $("wordModal"),
    wordModalClose: $("wordModalClose"),
    wdWord: $("wdWord"),
    wdMeaning: $("wdMeaning"),
    wdLevel: $("wdLevel"),
    wdSentenceEn: $("wdSentenceEn"),
    wdSentenceZh: $("wdSentenceZh"),
    wdRoot: $("wdRoot"),
    bookmarkNavBtn: $("bookmarkNavBtn"),
  };

  // Init
  function init() {
    renderStats();
    renderRoots();
    bindEvents();
    updateBookmarkUI();
  }

  // Get filtered roots
  function getFiltered() {
    let roots = wordRoots;

    if (state.category !== "all") {
      roots = roots.filter((r) => r.category === state.category);
    }

    if (state.filter !== "all") {
      roots = roots.filter((r) =>
        r.words.some((w) => w.level.toLowerCase().includes(state.filter)),
      );
    }

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      roots = roots.filter((r) => {
        if (r.root.toLowerCase().includes(q)) return true;
        if (r.meaning.includes(q)) return true;
        return r.words.some(
          (w) => w.word.toLowerCase().includes(q) || w.meaning.includes(q),
        );
      });
    }

    if (state.showingBookmarks) {
      if (state.bookmarks.length === 0) {
        roots = [];
      } else {
        roots = roots.filter((r) =>
          r.words.some(
            (w) =>
              state.bookmarks.includes(w.word) &&
              (state.filter === "all" ||
                w.level.toLowerCase().includes(state.filter)),
          ),
        );
      }
    }

    return roots;
  }

  // Get words for a root considering level filter
  function getFilteredWords(root) {
    let words = root.words;
    if (state.filter !== "all") {
      words = words.filter((w) => w.level.toLowerCase().includes(state.filter));
    }
    if (state.showingBookmarks) {
      words = words.filter((w) => state.bookmarks.includes(w.word));
    }
    return words;
  }

  // Render stats
  function renderStats() {
    el.stats.innerHTML = `
      <div class="stat-card"><div class="stat-num">${rootStats.totalRoots}</div><div class="stat-label">词根/词缀</div></div>
      <div class="stat-card"><div class="stat-num">${rootStats.totalWords}</div><div class="stat-label">单词总数</div></div>
      <div class="stat-card"><div class="stat-num" style="color:var(--cet4)">${rootStats.cet4Words}</div><div class="stat-label">CET-4 词汇</div></div>
      <div class="stat-card"><div class="stat-num" style="color:var(--cet6)">${rootStats.cet6Words}</div><div class="stat-label">CET-6 词汇</div></div>
    `;
  }

  // Render roots
  function renderRoots() {
    const roots = getFiltered();
    const isExpanded = (id) => state.expandedRoot === id;

    if (roots.length === 0) {
      el.grid.innerHTML = state.showingBookmarks
        ? `<div class="empty-state"><div class="empty-icon">📑</div><h3>还没有收藏的单词</h3><p>点击单词旁的 ☆ 收藏单词</p></div>`
        : `<div class="empty-state"><div class="empty-icon">🔍</div><h3>未找到匹配结果</h3><p>尝试其他搜索条件</p></div>`;
      return;
    }

    el.grid.innerHTML = roots
      .map((root, idx) => {
        const expanded = isExpanded(idx);
        const displayWords = getFilteredWords(root);
        const wordCount = displayWords.length;

        return `
        <div class="root-card" data-root-idx="${idx}">
          <div class="root-card-header">
            <div>
              <div class="root-name">${root.root}</div>
              <div class="root-meaning">${root.meaning}</div>
            </div>
            <div class="root-badges">
              <span class="badge-category">${root.category}</span>
              <span class="badge-count">${wordCount}词</span>
            </div>
          </div>
          <div class="word-list ${expanded ? "open" : ""}">
            ${displayWords
              .map((w) => {
                const isBookmarked = state.bookmarks.includes(w.word);
                return `
                <div class="word-item">
                  <div>
                    <div class="word-name">${w.word}</div>
                    <div class="word-meaning">${w.meaning}</div>
                  </div>
                  <div class="word-right">
                    ${w.level
                      .split(",")
                      .map(
                        (lev) =>
                          `<span class="level-tag ${lev.trim() === "CET-4" ? "cet4" : "cet6"}">${lev.trim()}</span>`,
                      )
                      .join("")}
                    <button class="bookmark-btn ${isBookmarked ? "bookmarked" : ""}" data-word="${w.word}" title="收藏单词">${isBookmarked ? "★" : "☆"}</button>
                  </div>
                </div>
              `;
              })
              .join("")}
            <div class="study-btn-wrap">
              <button class="study-btn primary" data-study-root="${idx}">📖 背这个词根</button>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  // Events
  function bindEvents() {
    // Search
    el.search.addEventListener("input", function () {
      state.searchQuery = this.value;
      state.expandedRoot = null;
      renderRoots();
    });

    // Filter buttons
    el.filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        el.filterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        state.filter = this.dataset.filter || "all";
        state.expandedRoot = null;
        renderRoots();
      });
    });

    // Category tags
    el.categoryTags.forEach((tag) => {
      tag.addEventListener("click", function () {
        el.categoryTags.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
        state.category = this.dataset.category || "all";
        state.expandedRoot = null;
        renderRoots();
      });
    });

    // Root card click (delegated)
    el.grid.addEventListener("click", function (e) {
      // Bookmark
      const bmBtn = e.target.closest(".bookmark-btn");
      if (bmBtn) {
        e.stopPropagation();
        toggleBookmark(bmBtn.dataset.word);
        return;
      }

      // Word detail
      const wordEl = e.target.closest(".word-name");
      if (wordEl) {
        e.stopPropagation();
        showWordDetail(wordEl.textContent);
        return;
      }

      // Study root
      const studyBtn = e.target.closest("[data-study-root]");
      if (studyBtn) {
        e.stopPropagation();
        const idx = parseInt(studyBtn.dataset.studyRoot);
        startStudyForRoot(idx);
        return;
      }

      // Expand/collapse
      const card = e.target.closest(".root-card");
      if (card) {
        const idx = parseInt(card.dataset.rootIdx);
        state.expandedRoot = state.expandedRoot === idx ? null : idx;
        renderRoots();
        // Scroll into view
        if (state.expandedRoot !== null) {
          setTimeout(
            () => card.scrollIntoView({ behavior: "smooth", block: "nearest" }),
            50,
          );
        }
      }
    });

    // Study all
    if (el.studyAllBtn) {
      el.studyAllBtn.addEventListener("click", function () {
        const roots = getFiltered();
        const allWords = roots.flatMap((r) => r.words);
        startStudy(allWords, "全部单词");
      });
    }

    // Bookmark nav
    if (el.bookmarkNavBtn) {
      el.bookmarkNavBtn.addEventListener("click", function () {
        state.showingBookmarks = !state.showingBookmarks;
        this.classList.toggle("active");
        state.expandedRoot = null;
        renderRoots();
      });
    }

    // Flashcard controls
    if (el.flipBtn) el.flipBtn.addEventListener("click", flipCard);
    if (el.flashcard) el.flashcard.addEventListener("click", flipCard);
    if (el.prevBtn) el.prevBtn.addEventListener("click", prevCard);
    if (el.nextBtn) el.nextBtn.addEventListener("click", nextCard);
    if (el.shuffleBtn) el.shuffleBtn.addEventListener("click", shuffleDeck);
    if (el.modalClose) el.modalClose.addEventListener("click", closeModal);
    el.modal.addEventListener("click", function (e) {
      if (e.target === this) closeModal();
    });

    // Word modal
    if (el.wordModalClose) {
      el.wordModalClose.addEventListener("click", closeWordModal);
    }
    el.wordModal.addEventListener("click", function (e) {
      if (e.target === this) closeWordModal();
    });

    // Keyboard
    document.addEventListener("keydown", function (e) {
      if (state.flashcardMode) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") prevCard();
        if (e.key === "ArrowRight") nextCard();
        if (e.key === " ") {
          e.preventDefault();
          flipCard();
        }
      }
      if (e.key === "Escape" && el.wordModal.classList.contains("open")) {
        closeWordModal();
      }
    });
  }

  // Bookmark
  function toggleBookmark(word) {
    const idx = state.bookmarks.indexOf(word);
    if (idx > -1) {
      state.bookmarks.splice(idx, 1);
    } else {
      state.bookmarks.push(word);
    }
    localStorage.setItem("cetBookmarks", JSON.stringify(state.bookmarks));
    renderRoots();
  }

  function updateBookmarkUI() {
    // no-op: re-render handles it
  }

  // Word detail
  function getSentence(word) {
    return window.__st && window.__st[word];
  }

  function showWordDetail(word) {
    var wordData = null;
    var rootName = "";
    for (var ri = 0; ri < wordRoots.length; ri++) {
      var root = wordRoots[ri];
      for (var wi = 0; wi < root.words.length; wi++) {
        if (root.words[wi].word === word) {
          wordData = root.words[wi];
          rootName = root.root;
          break;
        }
      }
      if (wordData) break;
    }
    if (!wordData) return;

    el.wdWord.textContent = wordData.word;
    el.wdMeaning.textContent = wordData.meaning;
    el.wdLevel.textContent = wordData.level.replace(",", " | ");
    el.wdRoot.textContent = "词根: " + rootName;

    var st = getSentence(word);
    if (st) {
      el.wdSentenceEn.textContent = st.s;
      el.wdSentenceZh.textContent = st.t;
    } else {
      el.wdSentenceEn.textContent = "暂无例句";
      el.wdSentenceZh.textContent = "";
    }

    el.wordModal.classList.add("open");
  }

  function closeWordModal() {
    el.wordModal.classList.remove("open");
  }

  // Flashcard
  function startStudy(words, title) {
    state.studyQueue = [...words];
    state.flashcardIndex = 0;
    state.flashcardFlipped = false;
    state.flashcardMode = true;
    if (title) el.modalTitle.textContent = title;
    el.modal.classList.add("open");
    showCard();
  }

  function startStudyForRoot(rootIdx) {
    const root = wordRoots[rootIdx];
    if (!root) return;
    startStudy(root.words, root.root);
  }

  function showCard() {
    const queue = state.studyQueue;
    if (queue.length === 0) {
      el.cardWord.textContent = "没有单词";
      el.cardHint.textContent = "";
      el.cardMeaning.textContent = "";
      el.cardRoot.textContent = "";
      el.cardLevel.textContent = "";
      el.flashcardProgress.textContent = "0 / 0";
      return;
    }

    const idx = state.flashcardIndex;
    const card = queue[idx % queue.length];
    state.flashcardFlipped = false;
    el.flashcard.classList.remove("flipped");

    el.cardWord.textContent = card.word;
    el.cardHint.textContent = "点击翻转查看释义";

    // Find which root this word belongs to
    for (const root of wordRoots) {
      if (root.words.some((w) => w.word === card.word)) {
        el.cardRoot.textContent = "词根: " + root.root;
        break;
      }
    }

    el.cardMeaning.textContent = card.meaning;
    el.cardLevel.textContent = card.level.replace(",", " | ");
    el.flashcardProgress.textContent = `${idx + 1} / ${queue.length}`;
  }

  function flipCard() {
    if (state.studyQueue.length === 0) return;
    state.flashcardFlipped = !state.flashcardFlipped;
    el.flashcard.classList.toggle("flipped");
  }

  function prevCard() {
    if (state.studyQueue.length === 0) return;
    state.flashcardIndex =
      (state.flashcardIndex - 1 + state.studyQueue.length) %
      state.studyQueue.length;
    showCard();
  }

  function nextCard() {
    if (state.studyQueue.length === 0) return;
    state.flashcardIndex = (state.flashcardIndex + 1) % state.studyQueue.length;
    showCard();
  }

  function shuffleDeck() {
    const arr = state.studyQueue;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    state.flashcardIndex = 0;
    showCard();
  }

  function closeModal() {
    state.flashcardMode = false;
    el.modal.classList.remove("open");
  }

  // Init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
