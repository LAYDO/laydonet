interface MtgCard {
  id: string;
  name: string;
  type?: string;
  text?: string;
  imageUrl?: string;
  setName?: string;
  set?: string;
  rarity?: string;
  manaCost?: string;
  colors?: string[];
  power?: string;
  toughness?: string;
}

interface MtgResponse {
  cards: MtgCard[];
}

const DEFAULT_QUERY = "dragon";
const API_BASE = "https://api.magicthegathering.io/v1/cards";

function normalizeQuery(query: string) {
  return query.trim();
}

function renderEmpty(resultsHost: HTMLElement, message: string) {
  resultsHost.innerHTML = `<div class="empty-state">${message}</div>`;
}

function renderCard(card: MtgCard) {
  const image = card.imageUrl
    ? `<img src="${card.imageUrl}" alt="${card.name}" loading="lazy" />`
    : `<div class="empty-state">No image available</div>`;

  return `
    <article class="app-card accent-paper">
      <div class="card-topline">
        <span>${card.set ?? "unknown set"}</span>
        <span>${card.rarity ?? "unknown rarity"}</span>
      </div>
      <h3>${card.name}</h3>
      <div class="photo-card">${image}</div>
      <p>${card.type ?? "Card type unavailable"}</p>
      ${card.manaCost ? `<p><strong>Mana:</strong> ${card.manaCost}</p>` : ""}
      ${card.text ? `<p>${card.text}</p>` : ""}
    </article>
  `;
}

async function searchCards(query: string) {
  const url = new URL(API_BASE);
  url.searchParams.set("pageSize", "24");
  if (query) {
    url.searchParams.set("name", query);
  }

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`MTG request failed with ${response.status}`);
  }

  const data = (await response.json()) as MtgResponse;
  const uniqueCards = Array.from(new Map((data.cards ?? []).map((card) => [card.id, card])).values());
  return { cards: uniqueCards };
}

export function initMtg(root: HTMLElement | null) {
  if (!root) {
    return;
  }

  const form = root.querySelector<HTMLFormElement>("[data-mtg-form]");
  const input = root.querySelector<HTMLInputElement>("[data-mtg-query]");
  const results = root.querySelector<HTMLElement>("[data-mtg-results]");
  const status = root.querySelector<HTMLElement>("[data-mtg-status]");
  const chips = root.querySelectorAll<HTMLButtonElement>("[data-mtg-chip]");

  if (!form || !input || !results || !status) {
    return;
  }

  const submitSearch = async (query: string) => {
    const normalized = normalizeQuery(query) || DEFAULT_QUERY;
    status.textContent = `Searching cards for "${normalized}"...`;
    renderEmpty(results, "Loading cards...");

    try {
      const data = await searchCards(normalized);
      const cards = data.cards ?? [];

      if (!cards.length) {
        renderEmpty(results, `No cards found for "${normalized}".`);
        status.textContent = "Search complete.";
        return;
      }

      results.innerHTML = cards.map(renderCard).join("");
      status.textContent = `Showing ${cards.length} results for "${normalized}".`;
      input.value = normalized;
      const url = new URL(window.location.href);
      url.searchParams.set("q", normalized);
      window.history.replaceState({}, "", url);
    } catch (error) {
      renderEmpty(results, "The card search service could not be reached.");
      status.textContent = error instanceof Error ? error.message : "MTG search failed.";
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    void submitSearch(input.value);
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      input.value = chip.dataset.mtgChip ?? "";
      void submitSearch(input.value);
    });
  });

  const initialQuery = new URL(window.location.href).searchParams.get("q") ?? DEFAULT_QUERY;
  input.value = initialQuery;
  void submitSearch(initialQuery);
}
