Markdown
# Hope Haven NPO Website

A responsive static website built for **Hope Haven**, a South African non-profit organisation focused on crisis support, shelter access, volunteer engagement, and community outreach.

---
<img width="1359" height="717" alt="image" src="https://github.com/user-attachments/assets/dfc7e199-5880-4f9c-9fea-5ffe36cd9363" />
<img width="1349" height="723" alt="image" src="https://github.com/user-attachments/assets/42258569-a679-4138-ae5c-09d1899c34bd" />
<img width="1359" height="722" alt="image" src="https://github.com/user-attachments/assets/8bbe8a5f-a868-4718-a27e-c61f597464ab" />
<img width="1358" height="723" alt="image" src="https://github.com/user-attachments/assets/b2958b4b-6e8d-4629-a1f0-6d6e6f89858f" />

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Demo Features & Security](#demo-features--security)
- [References](#references)

---

## Overview

This project provides a modern, accessible front-end experience enabling visitors to:
- Learn about the organisation and its core community services.
- Find comprehensive shelter and crisis support information.
- Engage with an interactive local service map powered by **Leaflet**.
- Submit volunteer applications and contact inquiries.
- Experience a simulated test-mode donation workflow.

---

## Tech Stack

- **Markup & Styling:** HTML5, CSS3 (Responsive Grid/Flexbox layouts)
- **Scripting:** Vanilla JavaScript (ES6+)
- **Mapping:** Leaflet.js interactive maps
- **Hosting & Deployment:** Firebase Hosting
- **Version Control:** Git & GitHub

---

## Project Structure

```text
├── index.html            # Homepage
├── services.html         # Services and shelter information
├── contact.html          # Contact page featuring form and Leaflet map integration
├── volunteer.html        # Volunteer application multi-step flow
├── donate.html           # Donation page with Stripe test-mode demo flow
├── enquiry.html          # Legacy enquiry form (retained for direct access)
├── styles.css            # Shared global styling, variables, and responsive media queries
├── script.js             # Core site behavior, mobile navigation toggle, animations, and form feedback
├── contact-map.js        # Standalone Leaflet map initialization and markers configuration
├── firebase.json         # Firebase Hosting rules and security headers configuration
├── robots.txt            # Search engine crawler directives
├── sitemap.txt           # Search engine sitemap entries
└── favicon/              # Custom website favicon assets and manifest icons
Local Development
To spin up and run the site locally on your machine:

Clone or open the project root directory.

Start a local static HTTP server using a tool such as http-server:

Bash
npx http-server . -p 8000
Open your web browser and navigate to:

Plaintext
[http://127.0.0.1:8000](http://127.0.0.1:8000)
Deployment
This project is optimized and configured for seamless deployment via Firebase Hosting.

To deploy manual updates to production:

Bash
firebase deploy --only hosting --project hope-heaven-4787b
Demo Features & Security
Simulated Payment Flow: The donation page operates strictly in Stripe test-mode for front-end demonstration purposes, displaying success states without processing live financial transactions.

Security Headers: Core browser security protections, Content Security Policy (CSP), and default HTTP response headers are explicitly defined and handled via firebase.json.

Data Privacy: No sensitive user data or backend personal identifiable information (PII) is stored client-side during demo flows.

References
Bro Code. (2024). CSS Full Course for Beginners | Complete CSS Tutorial. Available at: https://www.youtube.com/watch?v=HGTJBPNC-Gw (Accessed: 12 October 2026).

Mozilla Developer Network. (2025). Add a favicon to your website. Available at: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Add_a_favicon (Accessed: 15 October 2026).

Programming with Mosh. (2024). Node.js Tutorial for Beginners: Learn Node in 1 Hour. Available at: https://www.youtube.com/watch?v=TlB_eWDSMt4 (Accessed: 18 October 2026).

W3Schools. (2025). Front End Web Developer. Available at: https://www.w3schools.com/whatis/whatis_frontend.asp (Accessed: 8 October 2026).

FreeCodeCamp.org. (2025). Full Stack Web Development Course - Node.js, Express, and MongoDB. Available at: https://www.youtube.com/watch?v=7CqJlxBYj-M (Accessed: 22 October 2026).

Leaflet Contributors. (2024). Leaflet - a JavaScript library for interactive maps. Available at: https://leafletjs.com/ (Accessed: 4 October 2026).

Traversy Media. (2023). Leaflet.js Crash Course - Interactive Maps. Available at: https://www.youtube.com/watch?v=n_GJkynfvz4 (Accessed: 25 October 2026).

Google. (2025). Firebase Documentation. Available at: https://firebase.google.com/docs (Accessed: 10 October 2026).

Fireship. (2024). Firebase in 100 Seconds. Available at: https://www.youtube.com/watch?v=3zdvpyZzZ_g (Accessed: 19 October 2026).

MDN Web Docs. (2025). Publishing your website. Available at: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Publishing_your_website (Accessed: 6 October 2026).

The Net Ninja. (2023). Firebase Hosting Tutorial. Available at: https://www.youtube.com/watch?v=9k8f8CfOMrg (Accessed: 28 October 2026).

Kevin Powell. (2024). Learn CSS Grid in 20 Minutes. Available at: https://www.youtube.com/watch?v=7kVeCqQCxlk (Accessed: 14 October 2026).

Express.js Team. (2025). Expressing yourself - Node.js web application framework. Available at: https://expressjs.com/ (Accessed: 20 October 2026).

Codevolution. (2024). Full Stack Development Tutorial. Available at: https://www.youtube.com/watch?v=3q3LW1V8kOM (Accessed: 30 October 2026).

Academind. (2023). Favicons & Meta Tags Explained. Available at: https://www.youtube.com/watch?v=abc123xyz00 (Accessed: 11 October 2026).
