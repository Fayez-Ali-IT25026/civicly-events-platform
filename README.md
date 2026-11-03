# Civicly

**Small Acts. Big Impact.**

Civicly is a community-driven platform where people can create, join and track social service events in their local area, such as winter clothes distribution, blanket drives, tree plantation and cleanup campaigns.

**Live Site:** https://civicly-events-platform.vercel.app/
**Server Repository:** https://github.com/Fayez-Ali-IT25026/civicly-events-platform--server

## Features

- **Secure authentication**: register and log in with email and password (uppercase, lowercase and 6+ character validation) or with Google, powered by Better Auth.
- **Create and manage events**: any logged-in user can create an event with a title, description, type, thumbnail, location and a future date, then update or delete their own events from the Manage Events page.
- **Browse upcoming events**: a public page lists only upcoming events, and the home page shows the six nearest ones. Past events never appear.
- **Join events with one click**: logged-in users can join an event from its details page. Duplicate joins are blocked, and joined events are listed by date on the Joined Events page.
- **Protected APIs with JWT**: the Express server verifies a Better Auth JWT on every protected route, and only the creator of an event can edit or delete it.
- **Light and dark theme**: switch themes with the toggle in the navbar.
- **Responsive design**: works on mobile, tablet and desktop, with loading skeletons, toast messages and a custom 404 page.

## Pages

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Banner, features, upcoming events, gallery and newsletter |
| `/events` | Public | All upcoming events |
| `/events/[id]` | Public | Event details and Join Event button |
| `/login`, `/register` | Public | Authentication |
| `/create-event` | Private | Create a new event |
| `/manage-events` | Private | Update or delete your events |
| `/joined-events` | Private | Events you have joined |
| `/about`, `/gallery`, `/contact`, `/privacy`, `/terms` | Public | Information pages |

## Tech Stack

**Client:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Better Auth with the MongoDB adapter, Sonner, next-themes, Lucide icons

**Server:** Express.js, MongoDB, jose (JWT verification), CORS

## Getting Started

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/Fayez-Ali-IT25026/civicly-events-platform.git
   cd civicly-events-platform
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open http://localhost:3000.

The client needs the Civicly server running. See the server repository for its setup.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |