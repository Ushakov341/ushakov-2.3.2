export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    producer: item.producer,
    description: item.description,
    image: item.image,
    price: typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0,
    quantity: item.quantity,
    availableCount: item.availableCount,
    imageUrl: item.image
  }));
};