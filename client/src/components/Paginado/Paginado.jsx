import React from "react";
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
    <Pagination className={className}>
      <PaginationItem>
       
      </PaginationItem>
      {arreglito
        ? arreglito.map((m) => (
            <PaginationItem key={m}>
              <PaginationLink value={m} onClick={handleClick}>
                {m}
              </PaginationLink>
            </PaginationItem>
          ))
        : "not array"}

      <PaginationItem>
      
        {/*</PaginationLink> */}
      </PaginationItem>
    </Pagination>
  );
}
