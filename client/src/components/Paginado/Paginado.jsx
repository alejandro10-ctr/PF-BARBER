import React from "react";
import styles from '../Paginado/Paginado.module.css'

import {
  Pagination,
  PaginationItem,
  PaginationLink,
  className,
} from "reactstrap";

export default function Paginado({ pag, setCurrentPage, max, className }) {
  //le paso las props/paramentros/estados
  const arreglito = [];

  for (let i = 1; i <= max; i++) {
    arreglito.push(i);
  }

  const nextPage = () => {
    if (pag !== max) return setCurrentPage(pag + 1);
  };

  const prevPage = () => {
    if (pag !== 1) return setCurrentPage(pag - 1);
  };

  function handleClick(click) {
    click.preventDefault();
    setCurrentPage(Number(click.target.value));
  }
  return (

    <div>
      
    <Pagination className={styles.paginado}>
      <button  className={styles.arrow} onClick={prevPage}>&#8249;</button>
      <PaginationItem className={styles.pagination}>
       
      </PaginationItem>
      {arreglito
        ? arreglito.map((m) => (
            <PaginationItem key={m} className={styles.pagination}>
              <PaginationLink value={m} onClick={handleClick}>
                {m}
              </PaginationLink>
            </PaginationItem>
          ))
        : "not array"}

      <PaginationItem className={styles.pagination}>
      
        {/*</PaginationLink> */}
      </PaginationItem> <button className={styles.arrow}  onClick={nextPage}>&#8250;</button>
    </Pagination></div>
  );
}
