import { Product } from '../types';

const API_URL = 'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    console.log('Fetched data:', data);

    // API возвращает массив продуктов напрямую
    const products = Array.isArray(data) ? data : [];
    
    return products
      .map((item: any) => ({
        id: item.id,
        sku: item.sku || `sku-${item.id}`,
        title: item.title || item.name,
        description: item.description,
        availabilityStatus: item.availabilityStatus || 'In Stock',
        category: item.category || 'vegetables',
        price: item.price || 0,
        discountPercentage: item.discountPercentage || 0,
        rating: item.rating || 0,
        stock: item.stock || 0,
        tags: item.tags || [],
        brand: item.brand || '',
        weight: item.weight || 1,
        dimensions: item.dimensions || { width: 10, height: 10, depth: 10 },
        warrantyInformation: item.warrantyInformation || '',
        shippingInformation: item.shippingInformation || '',
        returnPolicy: item.returnPolicy || '',
        minimumOrderQuantity: item.minimumOrderQuantity || 1,
        meta: item.meta || {
          createdAt: '',
          updatedAt: '',
          barcode: '',
          qrCode: ''
        },
        images: item.images || [],
        thumbnail: item.image ? `https://res.cloudinary.com/sivadass/image/fetch/w_300,h_300,c_fill,f_auto,q_auto/${encodeURIComponent(item.image)}` : 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400'
      }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
