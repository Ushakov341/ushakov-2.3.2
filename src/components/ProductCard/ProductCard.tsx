import { useState } from 'react';
import {
  Card,
  Text,
  Group,
  ActionIcon,
  Button,
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

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
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
      {/* Картинка */}
      <Card.Section>
        <div className={styles.imageContainer}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.productImage}
          />
        </div>
      </Card.Section>

      {/* Название, вес и счетчик в одной строке */}
      <Group justify="space-between" mt="md" mb="xs">
        <Group gap="xs">
          <Text fw={600} size="lg">
            {product.title}
          </Text>
          <Text size="sm" c="dimmed">
            {product.weight ?? '1 kg'}
          </Text>
        </Group>

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

          <Text fw={500} size="sm" style={{ minWidth: 20, textAlign: 'center' }}>
            {quantity}
          </Text>

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

      {/* Цена + кнопка */}
      <Group justify="space-between">
        <Text fw={700} size="xl" c="#212529">
          $ {product.price}
        </Text>

        <Button
          leftSection={<IconShoppingCart size={16} color="#3B944E" />}
          onClick={handleAddToCart}
          variant="filled"
          styles={{
            root: {
              backgroundColor: '#E7FAEB',
              color: '#3B944E',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#D6F2DA',
              },
            },
          }}
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};
