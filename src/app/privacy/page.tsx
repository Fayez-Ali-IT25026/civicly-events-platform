import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Civicly",
};

const sections = [
  {
    title: "Information We Collect",
    text: "When you register, we collect your name, email address and optional profile photo link. When you create or join an event, we store the event details together with your account information.",
  },
  {
    title: "How We Use Your Information",
    text: "We use your information to run your account, show who created an event, record which events you have joined, and keep the platform secure. We do not sell your personal data.",
  },
  {
    title: "Information Other Users Can See",
    text: "Your name and profile photo appear in the navigation when you are logged in. The email address of an event creator is shown on the event details page so people know who is hosting.",
  },
  {
    title: "Authentication and Security",
    text: "Passwords are handled by our authentication system and are never shown to other users. Protected actions such as creating, updating and deleting events require a valid login token.",
  },
  {
    title: "Third-Party Services",
    text: "If you choose to sign in with Google, Google shares your name, email and profile picture with us. Your use of Google is covered by Google's own privacy policy.",
  },
  {
    title: "Your Choices",
    text: "You can update or delete the events you created from the Manage Events page. To ask for your account data to be removed, contact us using the details on our Contact page.",
  },
];

const PrivacyPage = () => {
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      intro="We keep things simple: we only collect what we need to help you create and join community events."
      updated="November 2026"
      sections={sections}
    />
  );
};

export default PrivacyPage;