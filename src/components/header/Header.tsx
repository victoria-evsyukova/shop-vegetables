import { Group, Text, Button } from '@mantine/core';
import style from './Header.module.css'
import { useCart } from '../CartContext'
import CardButton from '../CardButton';

type HeaderType = {
    onClick: () => void
}

export default function Header({ onClick }: HeaderType) {
  const { totalCount } = useCart();


  return (
      <header className={style['header']} data-testid="banner">

        <Group justify='space-between' align='center' bg='#F7F7F7' bdrs='31px' className={style['header-wrapper']}> 
          <Text size={'22px'} fw={600} pl={'12px'}>
            Vegetable
          </Text>
            
          <Button bg='#54B46A' bdrs='21px' fz={'22px'} fw={500}>
            SHOP
          </Button>
        </Group>

        <CardButton
          totalCount={totalCount}
          onClick={onClick}
        />
        

      </header>
  
    ) 
  }
