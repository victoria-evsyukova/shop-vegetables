import { useState } from 'react';
import Catalog from '../widgets/catalog/Catalog';

import Header from '../widgets/header/Header';



export default function Page() {
  const [ modalBusket, setModalBusket ] = useState(false);

  const handleClickBusket = () => {
    setModalBusket(true);
  } 
  const handleCloseModalBusket = () => {
    setModalBusket(false);
  } 



  return (
    <>
      <Header
        onClick={handleClickBusket} />

      <Catalog 
        modalBusket={modalBusket}
        onCloseModal={handleCloseModalBusket} />
    </>
  );
}