'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface NavigationItem {
  id: string;
  title: string;
  slug: string;
  url: string;
}

export default function Navigation() {
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNavigation();
  }, []);

  const fetchNavigation = async () => {
    try {
      const response = await fetch('http://localhost:3001/scraping/navigation');
      const data = await response.json();
      setNavigation(data.data || []);
    } catch (error) {
      console.error('Failed to fetch navigation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse h-20 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {navigation.map((item) => (
        <Link
          key={item.id}
          href={`/categories/${item.slug}?url=${encodeURIComponent(item.url)}`}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-center"
        >
          <div className="text-2xl mb-2">📚</div>
          <h3 className="font-semibold text-gray-800">{item.title}</h3>
        </Link>
      ))}
    </div>
  );
}
