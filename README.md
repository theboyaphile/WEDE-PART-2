# Hope Haven NPO Website

A responsive static website for Hope Haven, a South African non-profit organisation focused on crisis support, shelter access, volunteer engagement, and community outreach.

## Overview

This project provides a modern front-end experience for visitors to:

- learn about the organisation and its services,
- find shelter and support information,
- make a donation in demo/test mode,
- contact the organisation,
- volunteer for the team, and
- view the local service map via Leaflet.

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Leaflet for map integration
- Firebase Hosting for deployment
- GitHub for version control

## Project Structure

- `index.html` – homepage
- `services.html` – services and shelter information
- `contact.html` – contact page with form and map
- `volunteer.html` – volunteer application flow
- `donate.html` – donation page with Stripe test-mode demo flow
- `enquiry.html` – legacy enquiry form retained for direct access but not included in the main navigation
- `styles.css` – shared styling and responsive design
- `script.js` – shared site behaviour, animations, nav toggle, and form feedback
- `contact-map.js` – standalone Leaflet map configuration
- `firebase.json` – Firebase Hosting configuration
- `robots.txt` – crawler policy
- `sitemap.txt` – sitemap entries
- `favicon/` – website favicon assets

## Local Development

To run the site locally:

1. Open the project folder.
2. Start a local static server using a tool such as:

```bash
npx http-server . -p 8000
```

3. Visit:

```text
http://127.0.0.1:8000
```

## Deployment

This project is configured for Firebase Hosting.

To deploy manually:

```bash
firebase deploy --only hosting --project hope-heaven-4787b
```

## Demo Payment Flow

The donation page is configured for a Stripe test-mode experience only. It shows a success response and opens a Stripe test checkout link without processing real money. This is intended for front-end testing and demonstration purposes.

## Security Notes

- default security headers are configured in `firebase.json`
- CSP and related browser protections are applied in the HTML headers
- no sensitive data is stored or processed on the front end for the demo donation flow

## Notes

- The site is designed to be mobile responsive.
- The primary public contact route is the Contact page.
- Form submissions provide immediate visual feedback to users after action.
