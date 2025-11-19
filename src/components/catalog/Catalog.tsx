import ky from "ky";
import { useEffect, useState } from "react";
import { Container, Title, Grid, Flex, Loader } from '@mantine/core';
import Card from "../card/Card";
import ModalBusket from "../modalBusket/ModalBusket";


export type CatalogType = {
    id: number
    name: string
    price: number
    image: string
    category: string
}

type ModalBusketType = {
  modalBusket: boolean
  onCloseModal: () => void
}

export default function Catalog ({ modalBusket, onCloseModal }: ModalBusketType) {
  const [ products, setProducts ] = useState<CatalogType[]>([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const api: CatalogType[] = await ky
            .get('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
            .json();
        setProducts(api)
        
      } catch (error: any) {
          console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    getData();

  }, [])


  if (loading) {
    return (
    <Container size="1440px" bg='#F3F5FA' p={80} style={{ height: '100vh'}}>
      <Flex justify="center" align="center" h={'100%'} w={'100wh'}>
          <Loader size="lg" />
      </Flex>
    </Container>
    )
  }


  return (
    <Container size={'1440px'} bg='#F3F5FA' p={80}>

      <Title c='#000000' size={32} fw={600} mt={50} mb={45}>
        Catalog
      </Title>
    
      <Grid gutter={'xl'}>
          {products.map((product) => (
            <Grid.Col key={product.id} span={3}>
              <Card product={product} />
            </Grid.Col>
          ))}
      </Grid>

              
      {modalBusket && 
        <ModalBusket
          opened={modalBusket}
          onClose={onCloseModal}
        ></ModalBusket>}
        
      </Container>

  );
    
}