import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Book Categories
          </h1>
          <p className="text-gray-600">
            Browse books by category from World of Books
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">📚 All Categories</h2>
          <Navigation />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">How it works</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <span className="mr-3">🔍</span>
              <span>Categories are scraped in real-time from World of Books</span>
            </li>
            <li className="flex items-center">
              <span className="mr-3">⚡</span>
              <span>Click any category to view available books</span>
            </li>
            <li className="flex items-center">
              <span className="mr-3">📱</span>
              <span>Responsive design works on all devices</span>
            </li>
            <li className="flex items-center">
              <span className="mr-3">🔄</span>
              <span>Data is automatically refreshed</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
