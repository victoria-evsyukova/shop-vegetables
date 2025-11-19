import { useState } from 'react';
import Catalog from './catalog/Catalog';

import Header from './header/Header';



export default function Page() {
  const [ modalBusket, setmodalBusket ] = useState(false);

  const handleClickBusket = () => {
    setmodalBusket(true);
  } 
  const handleCloseModalBusket = () => {
    setmodalBusket(false);
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