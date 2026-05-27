# TofuPass API

A tiny Express server that generates passwords and passphrases using Node's cryptographically secure random (`crypto.randomInt`). This is the backend that powers the `/api/*` endpoints on [tofupass.com](https://tofupass.com).

Companion to the [TofuPass frontend](https://github.com/Tofu-Water-Drinker/tofupass).

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/password?lang=CODE` | Returns a single password like `!DancingKoala73` as `text/plain`. |
| `GET` | `/api/passphrase?count=N&lang=CODE` | Returns a hyphen-joined passphrase of `N` unique words. `N` must be between 4 and 30 (default `4`). |
| `GET` | `/api/stats` | Returns in-memory counters as JSON. Resets on every restart. No PII. |

All successful responses are `text/plain` for the two generation endpoints and `application/json` for stats. Errors on `/api/passphrase` return HTTP 400 with a plain-text message.

`lang` is optional and defaults to English. Supported language codes are `en`, `es`, `pt`, `fr`, `de`, `ja`, `zh-cn`, `ar`, `id`, `hi`, and `ru`.

### Examples

```bash
curl https://tofupass.com/api/password
# -> %BrightKoala42

curl "https://tofupass.com/api/password?lang=es"
# -> !Alegrejardin73

curl "https://tofupass.com/api/passphrase?count=6"
# -> koala-breeze-juniper-quartz-lantern-harbor

curl "https://tofupass.com/api/passphrase?count=4&lang=es"
# -> abrazo-bosque-camino-luna

curl https://tofupass.com/api/stats
# -> {"generated_passwords":1234,"generated_passphrases":567,"total_api_calls":1801}
```

## Running locally

Requires Node.js 18 or newer.

```bash
npm install
npm start
# TofuPass API listening on http://localhost:3000
```

Override the port with `PORT`:

```bash
PORT=8787 npm start
```

## Project layout

```
.
├── server.js       # Express app: endpoints, helpers, startup
├── wordlists.js    # Adjective/noun/passphrase arrays (public, GPL v3)
├── package.json
└── LICENSE
```

## Hosting

This runs anywhere Node.js runs: a small VPS, a PaaS, a home server behind a tunnel, etc. Because responses are plain text / JSON and there's no database, it's suited to aggressive caching layers (Cloudflare, etc.) — but note that if you cache `/api/password` you'll serve identical passwords to multiple users, which is almost certainly not what you want. The production site leaves generation responses uncached.

No environment variables are required. `PORT` is the only one consulted.

### Reverse-proxying with a static site

If you previously served a static site alongside this API via `app.use(express.static(...))`, that line has been removed from the public version because a public fork shouldn't have to know about the author's local directory layout. Put static files behind a real reverse proxy (nginx, Caddy, Cloudflare) or mount your own `express.static` middleware locally.

## Security and randomness

All randomness uses Node's `crypto.randomInt`, which is a CSPRNG backed by the OS entropy pool (the same primitive you'd use to generate auth tokens or nonces). There is no call to `Math.random` anywhere in the password-generating code path.

The API does not log generated passwords, does not persist anything to disk, and does not transmit them anywhere other than the immediate HTTP response to the requester.

## A note on rate limiting

The generation endpoints include a small privacy-preserving in-memory rate limiter. It allows a sustained 1 generated password/passphrase per second with a small burst cushion, plus 1,000 generated passwords/passphrases per hour.

The limiter does not store raw IP addresses. It stores short-lived HMAC keys derived from the client address and the current hour using a secret generated at process startup. Those keys reset when the process restarts and rotate naturally by hour. Generated passwords and passphrases are still never logged or persisted.

You can tune the limits with:

```bash
RATE_LIMIT_REFILL_PER_SECOND=1 RATE_LIMIT_BURST=10 RATE_LIMIT_HOURLY=1000 npm start
```

The production site may still use Cloudflare to absorb larger attacks at the edge.

## Contributing

Issues and PRs welcome. Please don't open PRs that add analytics, authentication-requiring-signups, or anything that logs generated secrets.

## License

**Code:** [GNU GPL v3](LICENSE). Forks must remain open-source under GPL v3.

**Brand:** The "TofuPass" name and associated mascot artwork are **all rights reserved** and not covered by the GPL. Public forks and public hosted instances must use their own branding.

Built by [Matthew Johnson / TofuWater](https://tofuwater.com/).
