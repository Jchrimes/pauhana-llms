export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);

    if (pathname === "/llms.txt" || pathname === "/llms.txt/") {
      const body = await fetch(
        "https://raw.githubusercontent.com/Jchrimes/pauhana-llms/main/llms.txt"
      ).then(r => r.text());

      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
          "X-Served-By": "llms-worker"
        },
      });
    }

    // Pass everything else through to Shopify unchanged
    const url = new URL(request.url);
    url.hostname = "pauhanasurfco.com";
    return fetch(url.toString(), request);
  },
};
