import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { BLOG_POSTS } from "../data/blogPosts";
import { jsonLdFor, metaForPath, routes } from "../routeMeta";

const appSrc = readFileSync(resolve(process.cwd(), "src/App.jsx"), "utf-8");

describe("routeMeta", () => {
  it("has unique paths, titles and descriptions", () => {
    for (const key of ["path", "title", "description"]) {
      const values = routes.map((r) => r[key]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("only lists public routes the router serves, never sign-in pages", () => {
    const publicPaths = new Set(
      [...appSrc.matchAll(/<Route\s+path="(\/[^"]*)"\s+element=\{(?!\s*<Protected)/g)].map((m) => m[1])
    );
    for (const r of routes) {
      if (!r.path.startsWith("/blog/")) expect(publicPaths.has(r.path), r.path).toBe(true);
    }
    for (const p of ["/login", "/register", "/dashboard"]) expect(metaForPath(p)).toBeUndefined();
  });

  it("dates every post and emits complete FAQs", () => {
    for (const p of BLOG_POSTS) {
      const graph = jsonLdFor(metaForPath(`/blog/${p.slug}`))["@graph"];
      expect(graph[0].datePublished).toBe(p.published);
      for (const q of graph.find((n) => n["@type"] === "FAQPage")?.mainEntity ?? []) {
        expect(q.name && q.acceptedAnswer.text).toBeTruthy();
      }
    }
  });
});
