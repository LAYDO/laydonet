type NasaImageItem = {
  href?: string;
  data?: Array<{
    title?: string;
    description?: string;
    date_created?: string;
    keywords?: string[];
    center?: string;
  }>;
  links?: Array<{
    href?: string;
    title?: string;
    rel?: string;
  }>;
};

type NasaImageResponse = {
  collection?: {
    items?: NasaImageItem[];
  };
};

const suggestions = ["JWST", "galaxy", "nebula", "deep space", "telescope"];

const fetchJson = async <T,>(url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`NASA Images request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

const clear = (element: HTMLElement | null) => {
  element?.replaceChildren();
};

const renderFeatured = (item: NasaImageItem | undefined) => {
  const featured = document.getElementById("jwst-featured");
  if (!featured) return;

  clear(featured);

  if (!item?.data?.[0]) {
    featured.innerHTML = `<div class="empty-state">No featured result available.</div>`;
    return;
  }

  const meta = item.data[0];
  const image = item.links?.[0]?.href;
  featured.innerHTML = `
    <div class="eyebrow">Featured result</div>
    ${image ? `<img src="${image}" alt="${meta.title ?? "NASA image"}" />` : ""}
    <h3>${meta.title ?? "Untitled"}</h3>
    <p>${meta.description ?? "No description available."}</p>
    <div class="pill-row">
      ${meta.center ? `<span class="pill">${meta.center}</span>` : ""}
      ${meta.date_created ? `<span class="pill">${new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(meta.date_created))}</span>` : ""}
    </div>
  `;
};

const renderGallery = (items: NasaImageItem[]) => {
  const gallery = document.getElementById("jwst-gallery");
  if (!gallery) return;

  clear(gallery);

  if (!items.length) {
    gallery.innerHTML = `<div class="empty-state">No images found.</div>`;
    return;
  }

  for (const item of items.slice(0, 18)) {
    const data = item.data?.[0];
    const image = item.links?.[0]?.href;
    const article = document.createElement("article");
    article.className = "photo-card";
    article.innerHTML = `
      ${image ? `<img src="${image}" alt="${data?.title ?? "NASA image"}" />` : "<div class='empty-state'>No image preview.</div>"}
      <h3>${data?.title ?? "Untitled"}</h3>
      <p>${data?.description?.slice(0, 180) ?? "No description available."}</p>
    `;
    article.addEventListener("click", () => renderFeatured(item));
    gallery.appendChild(article);
  }
};

const renderSuggestions = (runSearch: (query: string) => void) => {
  const container = document.getElementById("jwst-suggestions");
  if (!container) return;

  clear(container);
  for (const suggestion of suggestions) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pill";
    button.textContent = suggestion;
    button.addEventListener("click", () => runSearch(suggestion));
    container.appendChild(button);
  }
};

const searchImages = async (query: string) => {
  const status = document.getElementById("jwst-status");
  const title = document.getElementById("jwst-title");
  if (status) status.textContent = `Searching NASA Images for ${query}...`;

  const response = await fetchJson<NasaImageResponse>(
    `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`
  );

  const items = response.collection?.items ?? [];
  if (title) {
    title.textContent = `${items.length} images for "${query}"`;
  }
  renderGallery(items);
  renderFeatured(items[0]);
  if (status) {
    status.textContent = items.length
      ? `Loaded ${Math.min(items.length, 18)} visible results from NASA Images.`
      : `No images returned for "${query}".`;
  }
};

export const initJwstPage = () => {
  const form = document.getElementById("jwst-form") as HTMLFormElement | null;
  const input = document.getElementById("jwst-query") as HTMLInputElement | null;
  const runSearch = (query: string) => {
    if (input) input.value = query;
    void searchImages(query).catch((error) => {
      const status = document.getElementById("jwst-status");
      if (status) {
        status.textContent = error instanceof Error ? error.message : "NASA search failed";
      }
    });
  };

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch(input?.value.trim() || "JWST");
  });

  renderSuggestions(runSearch);
  runSearch(input?.value.trim() || "JWST");
};
