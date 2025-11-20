import { Button, Badge } from "@mantine/core";
import { IconShoppingCart } from '@tabler/icons-react';
import { useCart } from '../context/CartContext'

type ButtonType = {
  onClick: () => void
}

export default function CardButton({ onClick }: ButtonType) {
    const { totalCount } = useCart();

  return (
    <Button bg='#54B46A' bdrs='8px' w={144} h={44} fz={'16px'}
          rightSection={<IconShoppingCart size={18}/>}
          onClick={() => onClick()}
        > 
        {totalCount > 0 ? ( 
          <Badge mr={'5px'} bg={'white'} c={'black'} pt={2} size='md' circle fw={600} style={{fontSize: '14px'}}>
            {totalCount}
          </Badge>  
          ) : null
        }
        Cart
    </Button>
  )
}