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

    return data.map((item: any) => ({
      ...item,
      title: item.name, 
      images: [item.image], 
      thumbnail: item.image, 
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
