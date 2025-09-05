import { useEffect, useState } from 'react';
import { MantineProvider, AppShell } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';
import { useCart } from './hooks/useCart';
import { fetchProducts } from './services/api';
import { Product } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to load products. Please try again.',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    notifications.show({
      title: 'Added to cart',
      message: `${product.title} (${quantity}) added to your cart`,
      color: 'green',
    });
  };

  return (
    <MantineProvider
      theme={{
        primaryColor: 'green',
        colors: {
          green: [
            '#f0f9f4',
            '#e6f5ea',
            '#c7e9d1',
            '#a8ddb7',
            '#8bd19e',
            '#6fc584',
            '#54b46a',
            '#4a9960',
            '#407e56',
            '#35634c'
          ]
        }
      }}
    >
      <Notifications />
      <AppShell>
        <Header
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onClearCart={clearCart}
        />
        
        <AppShell.Main>
          <ProductList
            products={products}
            loading={loading}
            onAddToCart={handleAddToCart}
          />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;