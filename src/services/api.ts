import { Product } from '../types';

const API_URL =
  'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    console.log('Fetched data:', data); // проверяем, что приходит

    return data.map((item: any) => {
      const imageUrl = item.image?.url || item.image || ''; // безопасно берём URL

      return {
        ...item,
        title: item.name || item.title || 'No title',
        images: imageUrl ? [imageUrl] : [],
        thumbnail: imageUrl,
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
