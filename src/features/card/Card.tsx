// components/card/Card.tsx
import { useState } from 'react';
import { 
  Card as MantineCard, 
  Image, 
  Text, 
  Button, 
  ActionIcon, 
  Flex,
} from '@mantine/core';
import { IconPlus, IconMinus, IconShoppingCart } from '@tabler/icons-react';
import style from './Card.module.css'
import { useCart } from '../../context/CartContext'


type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity?: number
};

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const [ nameProduct, weightPart ] = product.name.split(' - ')

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));
 

  const handleAddToCart = () => {
    addToCart(product.id, quantity, product);
    setQuantity(1);
  };

  return (
    <MantineCard p={16}>
        <Image
            src={product.image}
            alt={product.name}
            width={276}
            height={276}
        />


      <Flex justify="space-between" direction='row' mt={16}>
        <Flex justify='center' align='center'> 
          <Text size={'18px'} fw={600} pr={10}>
              {nameProduct}
          </Text>
          <Text size={'13px'} fw={600} c={'#868E96'} ff={'Open Sans'}>
              {weightPart?.replace(/\bKg\b/g, 'kg')}
          </Text>
        </Flex>


        <Flex direction='row' justify='center' align='center'>
          <ActionIcon bdrs={8} bg={'#DEE2E6'} c={'black'}
              onClick={handleDecrement}
              disabled={quantity <= 1} 
              className={style['counter-button']}
            >
              <IconMinus size={16} />
            
            </ActionIcon>

            <Text fw={300} style={{ minWidth: '30px', textAlign: 'center' }}>
              {quantity}
            </Text>

            <ActionIcon bg={"#DEE2E6"} c={'black'} bdrs={8}
              onClick={handleIncrement}
            >
              <IconPlus size={16} />
            
          </ActionIcon>
        </Flex>
      </Flex>

      <Flex justify="space-between" align='center' mt={16}>
        <Text size={'20px'} fw={600}>
          $ {product.price * quantity}
        </Text>

        <Button w={204} h={44} bdrs={8} bg={'#E7FAEB'} 
          classNames={{root: style['button-add-to-cart']}}
          rightSection={<IconShoppingCart size={18} />}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </Flex>
    </MantineCard>
  );
}