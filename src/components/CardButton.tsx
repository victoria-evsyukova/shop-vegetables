import { Button, Badge } from "@mantine/core";
import { IconShoppingCart } from '@tabler/icons-react';

type ButtonType = {
  totalCount?: number
  onClick: () => void
}


export default function CardButton({ onClick, totalCount, }: ButtonType) {
  return (
    <Button bg='#54B46A' bdrs='8px' w={144} h={44} fz={'16px'}
          rightSection={<IconShoppingCart size={18}/>}
          onClick={() => onClick()}
        > 
        {totalCount && totalCount > 0 ? ( 
          <Badge mr={'5px'} bg={'white'} c={'black'} p={'3px'} size={''} fw={400}>
            {totalCount}
          </Badge> 
          ) : null
        }
        Cart
    </Button>
  )
}