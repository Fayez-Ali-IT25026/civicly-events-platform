import { Leaf } from "lucide-react";

const Loading = () => {
  return (
    <main
      className="flex min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-gray-950"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-5">
        {/* Spinner with logo */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full border-4 border-green-100 dark:border-green-950" />
          <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-green-600" />
          <Leaf size={26} className="text-green-600" />
        </div>

        <div className="text-center">
          <p className="text-lg font-bold text-[#062b20] dark:text-white">
            Civicly
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Loading, please wait...
          </p>
        </div>
      </div>
    </main>
  );
};

export default Loading;