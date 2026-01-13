import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Home() {
  const [navigation, setNavigation] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [navRes, productsRes] = await Promise.all([
        fetch(`${API_URL}/scraping/navigation`),
        fetch(`${API_URL}/products?limit=8`)
      ]);
      
      const navData = await navRes.json();
      const productsData = await productsRes.json();
      
      setNavigation(navData.data || []);
      setProducts(productsData.products || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl mr-2">📚</span>
              <span className="font-bold text-xl">World of Books Explorer</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Product Data Explorer
        </h1>

        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading data from World of Books...</p>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {navigation.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="text-2xl mb-2">📚</div>
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl">📖</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">
                          £{product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">API Documentation</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <code className="bg-gray-100 px-2 py-1 rounded">GET /scraping/navigation</code>
              <p className="text-gray-600 text-sm mt-1">Get navigation categories from World of Books</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <code className="bg-gray-100 px-2 py-1 rounded">GET /products?category=URL</code>
              <p className="text-gray-600 text-sm mt-1">Get products with pagination</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2024 Product Data Explorer • Full-Stack Assignment</p>
        </div>
      </footer>
    </div>
  );
}
