import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Civicly",
};

const sections = [
  {
    title: "Using Civicly",
    text: "Civicly is a platform for creating, joining and tracking social service events. By creating an account or using the site, you agree to these terms.",
  },
  {
    title: "Your Account",
    text: "You are responsible for keeping your login details safe and for everything that happens under your account. Please provide accurate information when you register.",
  },
  {
    title: "Creating Events",
    text: "Events must be real community or social service activities with a future date. You are responsible for the accuracy of the title, description, location and image you submit.",
  },
  {
    title: "Acceptable Behavior",
    text: "Do not post misleading, harmful, offensive or illegal content. Do not use Civicly to harass others or to promote anything other than genuine community service.",
  },
  {
    title: "Joining Events",
    text: "Joining an event shows your interest to participate. Event organizers run their own events, and Civicly is not responsible for what happens at an event.",
  },
  {
    title: "Content Removal",
    text: "We may remove events or accounts that break these terms. You can delete your own events at any time from the Manage Events page.",
  },
  {
    title: "Changes to These Terms",
    text: "We may update these terms as the platform grows. Continuing to use Civicly after a change means you accept the updated terms.",
  },
];

const TermsPage = () => {
  return (
    <LegalPage
      label="Legal"
      title="Terms of Service"
      intro="Simple rules that help keep Civicly a safe and useful place for everyone."
      updated="November 2026"
      sections={sections}
    />
  );
};

export default TermsPage;