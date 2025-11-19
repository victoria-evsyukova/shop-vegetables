import { Stack, Text, Image, Flex, ActionIcon, Modal } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import busketEmpty from '../../img/cart_empty.png'
import style from './ModalBusket.module.css'
import { useCart } from '../CartContext'

type ModalType = {
    opened: boolean
    onClose: () => void
} 

export default function ModalBusket({ opened, onClose }: ModalType) {
    const { cartItems, updateCart, removeFromCart } = useCart();

    const cartItemsKeys = Object.keys(cartItems);
    const cartItemsValues = Object.values(cartItems);


    const handleIncrement = (id: number, quantity: number) => {
        updateCart(id, quantity + 1)
    }

    const handleDecrement = (id: number, quantity: number) => {
        if (quantity > 1) {
            updateCart(id, quantity - 1)
        } else {
            removeFromCart(id)
        }
    }
    
    const calculateTotal = () => {
        return cartItemsValues.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }

    const getModalSize = () => {
        if (cartItemsKeys.length === 0) return 'xs';
    };


    return (
        <Modal
            // role="dialog"
            // data-testid="modal"
            size={getModalSize()}
            opened={opened}
            onClose={onClose}
            closeOnClickOutside={true}
            closeOnEscape={true}
            withCloseButton={false}
            lockScroll={false}
            
            overlayProps={{
                backgroundOpacity: 0,
            }}
            classNames={{
                inner: style['modal-busket-inner'],
                content: style['modal-busket-content'],
                body: style['modal-busket-body']
            }}

        >   
            <Stack p={10}> 
                {cartItemsKeys.length === 0 ? (
                    <>
                        <Stack w={117} h={107}  m={'0 auto'} mt={'10px'}>
                            <Image
                                src={busketEmpty}
                            />
                        </Stack>
                                                        
                        <Text size={'16px'} ta={'center'} m={'0 auto'} mt={'10px'} c={'#868E96'} fw={400}>
                            Your cart is empty!
                        </Text>
                    </>
                ) : ( 
                    <>
                        {cartItemsValues.map((item, index) => (
                            <Flex key={item.id} gap={'md'}>
                                <Stack w={64} h={64}>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={64}
                                        height={64}
                                        radius="md"
                                    /> 
                                </Stack>
                                <Stack w={'100%'} style={{ borderBottom: index !== cartItemsKeys.length - 1 ? '1px solid #e9ecef': 'none'}} pb={10}>
                                    <Flex align={'center'} columnGap={8}>
                                        <Text size={'18px'} fw={600}>{item.name.split(' ')[0]}</Text>
                                        <Text size={'12px'} fw={600} c={'#868E96'} ff={'Open Sans'}>{item.name.split(' ').slice(2, 4).join(' ')}</Text>
                                    </Flex>

                                    <Flex justify={'space-between'}>
                                        <Text fw={600} size='xl'>
                                            $ {item.price * item.quantity}
                                        </Text>

                                        <Flex justify={'end'}>
                                            <ActionIcon bg={"#DEE2E6"} c={'black'} bdrs={8}
                                                size="md"
                                                onClick={() => handleDecrement(item.id, item.quantity)}
                                            >
                                                <IconMinus size={16} />
                                            </ActionIcon>
                                
                                            <Text style={{ minWidth: '30px', textAlign: 'center' }}>
                                                {item.quantity}
                                            </Text>
                                            
                                            <ActionIcon bg={"#DEE2E6"} c={'black'} bdrs={8}
                                                size="md"
                                                onClick={() => handleIncrement(item.id, item.quantity)}
                                            >
                                                <IconPlus size={16} />
                                            </ActionIcon>
                                         </Flex>
                                    </Flex>
                            </Stack>
                                
                        </Flex>
                        ))}

                        <Flex justify="space-between" align="center" pt="md" mt={7} style={{ borderTop: '1px solid #e9ecef' }}>
                            <Text size="sm" fw={600}>
                                Total
                            </Text>
                            <Text size="sm" fw={600}>
                                $ {calculateTotal()}
                            </Text>
                        </Flex> 
                    </>
                )}
        </Stack>
    </Modal>
  );
}