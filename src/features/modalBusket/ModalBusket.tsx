import { Stack, Text, Image, Flex, ActionIcon, Modal } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import busketEmpty from '../../assets/img/cart_empty.png'
import style from './ModalBusket.module.css'
import { useCart } from '../../context/CartContext'

type ModalType = {
    opened: boolean
    onClose: () => void
} 

export default function ModalBusket({ opened, onClose }: ModalType) {
    const { cartItems, handleDecrementInBusket, handleIncrementInBusket } = useCart();


    const isCartEmpty = cartItems.length === 0; 

    
    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }

    const getModalSize = () => {
        if (cartItems.length === 0) return 'xs';
    };


    return (
        <Modal
            role="dialog"
            data-testid="modal"
            size={getModalSize()}
            opened={opened}
            onClose={onClose}
            closeOnClickOutside={true}
            closeOnEscape={true}
            centered={false}
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
                {isCartEmpty ? (
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
                        {cartItems.map((item, index) => (
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
                                <Stack w={'100%'} style={{ borderBottom: index !== cartItems.length - 1 ? '1px solid #e9ecef': 'none'}} pb={10}>
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
                                                onClick={() => handleDecrementInBusket(item.id, item.quantity)}
                                            >
                                                <IconMinus size={16} />
                                            </ActionIcon>
                                
                                            <Text style={{ minWidth: '30px', textAlign: 'center' }}>
                                                {item.quantity}
                                            </Text>
                                            
                                            <ActionIcon bg={"#DEE2E6"} c={'black'} bdrs={8}
                                                size="md"
                                                onClick={() => handleIncrementInBusket(item.id, item.quantity)}
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