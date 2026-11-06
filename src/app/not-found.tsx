import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-brand-light">
      <h2 className="text-2xl font-bold text-brand-navy mb-2">404 - Page Not Found</h2>
      <p className="text-sm text-slate-600 mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/en/"
        className="px-4 py-2 rounded-xl bg-brand-navy text-white text-sm font-semibold hover:bg-brand-navy-900 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}

