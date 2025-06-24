# Security Audit Report for Frontend Dependencies

**Project:** Track Records
**Author:** Kateryna Rieznik
**Date:** 2025-06-15

---

## 1. Audit of All Project Dependencies

A full security audit was conducted using `npm audit` and manual inspection of dependency risks.

### 🔍 Summary of Audit

```sh
npm audit
```

- **Total vulnerabilities found:** 2
- **Severity:** 1 low, 1 moderate
- **Fixes available:** Yes

### Vulnerabilities Details

| Package            | Severity | Issue                                                                                          | Fixed?              |
|--------------------|----------|------------------------------------------------------------------------------------------------|---------------------|
| `brace-expansion`  | Low      | Regular Expression Denial of Service (ReDoS) ([GHSA-v6h2-p8h4-qcjw](https://github.com/advisories/GHSA-v6h2-p8h4-qcjw)) | ✅ via `npm audit fix` |
| `vite@6.3.x`       | Moderate | Directory traversal bug in `server.fs.deny` ([GHSA-859w-5945-r5v3](https://github.com/advisories/GHSA-859w-5945-r5v3)) | ✅ via `npm audit fix` |

> **Action Taken:**
> All known vulnerabilities were patched using `npm audit fix`.

---

## 2. Statement of Security Compliance

All project dependencies have been verified to comply with modern frontend security standards.

### 🔎 Dependency Audit Tools Used

- `npm audit`
- GitHub Advisories
- Manual checks on:
  - [Snyk Advisor](https://snyk.io/advisor)
  - [Socket.dev](https://socket.dev)

All key dependencies (e.g., `vite`, `react`, `tailwindcss`, `clsx`, etc.) were checked manually. Each package was confirmed to have:
- No known vulnerabilities
- Active maintenance
- No risky or malicious behaviors (e.g. network access, install scripts, obfuscated code)

### 🧯 Zero-Day Risk Minimization

While true zero-day vulnerabilities are inherently unknown, risk exposure was reduced by:

- **Minimizing the number of dependencies**
- **Using only actively maintained libraries**
- **Avoiding deprecated or low-trust packages**
- **Applying runtime hardening techniques**, such as:

```ts
Object.freeze(Object.prototype); // Prevent prototype pollution
```

### 🔔 Automated Security Alerts via Dependabot

The GitHub repository has **Dependabot enabled**, which:
- Scans all project dependencies regularly
- Creates automatic pull requests for vulnerable packages
- Ensures near real-time patching of known issues

---

## ✅ Final Notes

- All project dependencies are secure and updated.
- No known vulnerabilities or zero-day indicators remain.
- Proactive runtime hardening (`Object.freeze(Object.prototype)`) is applied.
- GitHub **Dependabot is enabled** for ongoing automated monitoring and alerts.

---
