# Security Policy 🛡️

## Reporting a Vulnerability

We take security seriously at **AI Humanizer**. If you discover any potential security vulnerability, please report it immediately to the Project Admin:

- **Saptarshi Mukherjee**: [sappymukherjee214@gmail.com](mailto:sappymukherjee214@gmail.com)

Please do **NOT** report security issues via public GitHub issues. Instead, email us with a detailed description of the vulnerability, including steps to reproduce it.

---

## Response Time

We aim to:
- Respond to your initial report within **48 hours**.
- Acknowledge and investigate the issue quickly.
- Provide a timeline for resolution once the vulnerability is confirmed.
- Once fixed, we will publicly acknowledge your contribution in our security advisories (unless you prefer to remain anonymous).

---

## Scopes

Currently, we're particularly interested in:
- Authentication and authorization bypasses (JWT, login flow).
- Insecure direct object references (IDOR).
- Potential SQL Injection via Prisma query manipulations.
- Cross-Site Scripting (XSS) in text processing or rendering.
- API rate-limiting and potential denial-of-service (DoS) endpoints.

---

## Responsible Disclosure

We ask that you:
- Do not exploit the vulnerability to view, modify, or delete user data.
- Give us a reasonable amount of time to fix the issue before sharing any information about it publicly.
- Avoid using automated vulnerability scanners that may cause performance issues or disrupt services for our users.

Thank you for helping us keep **AI Humanizer** secure! 🤝
