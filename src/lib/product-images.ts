/**
 * All product gallery photos, resolved at build time.
 *
 * Each product lives in its own folder (`src/assets/products/<slug>/01.webp`,
 * `02.webp`, …). Vite turns the glob into static asset URLs, so nothing depends
 * on a runtime path and the images get hashed/cached like any other asset.
 */
const modules = import.meta.glob("/src/assets/products/**/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const byKey: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const key = path.split("/products/")[1];
  if (key) byKey[key.replace(/\.webp$/, "")] = url;
}

const sortedKeys = Object.keys(byKey).sort();

/** Every photo of a product, in gallery order. */
export function productImages(slug: string): string[] {
  return sortedKeys.filter((k) => k.startsWith(`${slug}/`)).map((k) => byKey[k]!);
}

/** First (cover) photo of a product. */
export function productCover(slug: string): string {
  return productImages(slug)[0] ?? "";
}
