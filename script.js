// ===== OSINT Search Engine Loader (Rebuilt) =====

const SOURCES = {
  "Search Engines": [
    ["Google", "https://www.google.com/search?q="],
    ["DuckDuckGo", "https://duckduckgo.com/?q="],
    ["Bing", "https://www.bing.com/search?q="],
    ["Startpage", "https://www.startpage.com/do/search?q="],
    ["Brave Search", "https://search.brave.com/search?q="]
  ],
  "Social Media": [
    ["Facebook", "https://www.facebook.com/search/top/?q="],
    ["Instagram", "https://www.instagram.com/explore/search/keyword/?q="],
    ["X / Twitter", "https://twitter.com/search?q="],
    ["LinkedIn", "https://www.linkedin.com/search/results/all/?keywords="],
    ["Reddit", "https://www.reddit.com/search/?q="],
    ["TikTok", "https://www.tiktok.com/search?q="]
  ],
  "Buy & Sell": [
    ["FB Marketplace", "https://www.facebook.com/marketplace/search/?query="],
    ["Kijiji", "https://www.kijiji.ca/b-search.html?query="],
    ["Craigslist", "https://www.craigslist.org/search/sss?query="],
    ["eBay", "https://www.ebay.com/sch/i.html?_nkw="],
    ["OfferUp", "https://offerup.com/search/?q="],
    ["Gumtree", "https://www.gumtree.com/search?search_category=all&q="]
  ],
  "People / Public Records": [
    ["That'sThem", "https://thatsthem.com/name/"],
    ["FastPeopleSearch", "https://www.fastpeoplesearch.com/name/"],
    ["Spokeo", "https://www.spokeo.com/"]
  ],
  "Images / Media": [
    ["Google Images", "https://www.google.com/search?tbm=isch&q="],
    ["Yandex Images", "https://yandex.com/images/search?text="],
    ["TinEye", "https://tineye.com/search?url="]
  ],
  "Documents": [
    ["Google PDFs", "https://www.google.com/search?q=filetype:pdf+"],
    ["Google Docs", "https://www.google.com/search?q=filetype:doc+"],
    ["Google XLS", "https://www.google.com/search?q=filetype:xls+"]
  ],
  "Maps / Places": [
    ["Google Maps", "https://www.google.com/maps/search/"]
  ],
  "Archives": [
    ["Wayback Machine (Search)", "https://web.archive.org/search/?query="]
  ]
};

const sourcesDiv = document.getElementById("sources");

Object.entries(SOURCES).forEach(([category, items]) => {
  const box = document.createElement("div");
  box.className = "border rounded p-3";

  const header = document.createElement("div");
  header.className = "flex justify-between items-center mb-2";

  header.innerHTML = `
    <span class="font-semibold">${category}</span>
    <span class="text-xs text-gray-500">
      <button onclick="toggleCategory(this, true)">Select All</button> |
      <button onclick="toggleCategory(this, false)">Clear</button>
    </span>
  `;

  box.appendChild(header);

  items.forEach(([name, url]) => {
    const label = document.createElement("label");
    label.className = "flex items-center gap-2 text-sm";

    label.innerHTML = `
      <input type="checkbox" data-url="${url}">
      ${name}
    `;

    box.appendChild(label);
  });

  sourcesDiv.appendChild(box);
});

function toggleCategory(el, state) {
  const box = el.closest("div").parentElement;
  box.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = state);
}

function selectAll() {
  document.querySelectorAll("#sources input[type=checkbox]").forEach(cb => cb.checked = true);
}

function clearAll() {
  document.querySelectorAll("#sources input[type=checkbox]").forEach(cb => cb.checked = false);
}

function runSearch() {
  const names = document.getElementById("names").value.trim();
  if (!names) {
    alert("Please enter at least one name.");
    return;
  }

  const queries = names.split(/,|\n/).map(n => n.trim()).filter(Boolean);
  const city = document.getElementById("city").value.trim();
  const province = document.getElementById("province").value.trim();
  const country = document.getElementById("country").value.trim();
  const excludeObits = document.getElementById("excludeObits").checked;

  document.querySelectorAll("#sources input[type=checkbox]:checked").forEach(cb => {
    queries.forEach(q => {
      let query = q;
      if (city) query += " " + city;
      if (province) query += " " + province;
      if (country) query += " " + country;
      if (excludeObits) query += " -obituary -memorial";

      window.open(cb.dataset.url + encodeURIComponent(query), "_blank");
    });
  });
}


// ===== Night Mode Toggle =====
const modeBtn = document.getElementById("modeBtn");

if (modeBtn) {
  modeBtn.addEventListener("click", () => {
    const body = document.body;
    const isDark = body.classList.toggle("bg-gray-900");

    body.classList.toggle("text-gray-100");
    body.classList.toggle("bg-gray-100");

    document.querySelectorAll("input, textarea").forEach(el => {
      el.classList.toggle("dark-input");
    });

    document.querySelectorAll(".border").forEach(el => {
      el.classList.toggle("dark-card");
    });

    modeBtn.textContent = isDark ? "Day Mode" : "Night Mode";
  });
}
