type Section = {
  title: string;
  text: string;
};

type LegalPageProps = {
  label: string;
  title: string;
  intro: string;
  updated: string;
  sections: Section[];
};

const LegalPage = ({ label, title, intro, updated, sections }: LegalPageProps) => {
  return (
    <main>
      {/* Header */}
      <section className="bg-[#04241b] px-6 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8be37a]">
          {label}
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 md:text-base">
          {intro}
        </p>
      </section>

      {/* Content */}
      <section className="bg-[#f7f5ee] px-6 py-16 dark:bg-[#0a1d17]">
        <div className="mx-auto max-w-3xl space-y-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {updated}
          </p>

          {sections.map((section, index) => (
            <div
              key={section.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <h2 className="text-lg font-bold text-[#062b20] dark:text-white">
                {index + 1}. {section.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default LegalPage;