import { SimpleGrid, Container, Title, Skeleton, Card } from '@mantine/core';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductList = ({ products, loading, onAddToCart }: ProductListProps) => {
  const renderSkeletons = () => {
    return Array.from({ length: 8 }, (_, index) => (
      <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Skeleton height={200} />
        </Card.Section>
        <Skeleton height={24} mt="md" width="70%" />
        <Skeleton height={20} mt="xs" width="40%" />
        <Skeleton height={32} mt="md" width="50%" />
        <Skeleton height={36} mt="md" />
      </Card>
    ));
  };

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" c="dark">
        Catalog
      </Title>
      
      <SimpleGrid
        cols={{ base: 1, xs: 2, sm: 3, md: 4 }}
        spacing="lg"
        verticalSpacing="lg"
      >
        {loading ? renderSkeletons() : products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};