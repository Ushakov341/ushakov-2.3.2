import { useState } from 'react';
import {
  Card,
  Text,
  Group,
  ActionIcon,
  Button,
  NumberInput,
} from '@mantine/core';
import { IconMinus, IconPlus, IconShoppingCart } from '@tabler/icons-react';
import { Product } from '../../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: string | number) => {
    const newQuantity = typeof value === 'string' ? parseInt(value) : value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.productCard}
    >
      <Card.Section>
        <div className={styles.imageContainer}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.productImage}
          />
        </div>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={600} size="lg">
          {product.title}
        </Text>
        <Text size="sm" c="dimmed">
          1 kg
        </Text>
      </Group>

      <Text fw={700} size="xl" c="#212529" mb="md">
        $ {product.price}
      </Text>

      <Group justify="space-between" mb="md">
        <Group gap="xs">
          <ActionIcon
            variant="light"
            color="gray"
            size="sm"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <IconMinus size={14} />
          </ActionIcon>

          <NumberInput
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={product.stock}
            size="sm"
            w={60}
            hideControls
            styles={{
              input: {
                textAlign: 'center',
                padding: '4px 8px',
              },
            }}
          />

          <ActionIcon
            variant="light"
            color="gray"
            size="sm"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= product.stock}
          >
            <IconPlus size={14} />
          </ActionIcon>
        </Group>
      </Group>

      <Button
        fullWidth
        rightSection={<IconShoppingCart size={16} color="#3B944E" />}
        onClick={handleAddToCart}
        color="#E7FAEB"
        variant="filled"
        className={styles.addToCartBtn}
      >
        Add to cart
      </Button>
    </Card>
  );
};
