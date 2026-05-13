# Security policy

## Reporting a vulnerability

Please report security issues privately via GitHub Security Advisories:
https://github.com/shubham8550/microscope-js/security/advisories/new

Do **not** open a public issue for vulnerabilities. We will acknowledge within 72 hours and aim to ship a patch within 14 days for confirmed high-severity issues.

## Threat model

microscope-js renders **untrusted file content** in the user's browser. Our threats are:

| Threat                                       | Mitigation                                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Office document with embedded HTML / scripts | All renderer output passes through DOMPurify with a hardened profile                       |
| Zip-slip in DOCX/XLSX/PPTX                   | Archive entries with `..` segments or absolute paths are rejected before extraction        |
| Resource exhaustion (huge PDFs, zip bombs)   | Renderers expose `maxBytes` / `maxPages` options; defaults cap at 256 MB / 5 000 pages     |
| XSS via SVG                                  | SVGs are rendered inside `<img>` (no script execution), or sanitized when injected inline  |
| `eval` / dynamic code                        | Forbidden by lint rule and CI grep                                                         |

## Supported versions

We patch the latest minor of the current major. Older majors receive security fixes for 6 months after a new major ships.
