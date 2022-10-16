import React from "react";



export default function Paginado ({pag, setCurrentPage, max}){ //le paso las props/paramentros/estados
  const arreglito = []

for(let i= 1; i <= max; i++){
    arreglito.push(i)

}
console.log(arreglito)

    const nextPage = () => {
        if (pag !== max ) return setCurrentPage(pag + 1);
    }; 

    const prevPage = ()=>{
     if(pag !== 1)  return setCurrentPage(pag - 1);
    }

 function handleClick(click){
    click.preventDefault();
    setCurrentPage(Number(click.target.value))
 }
    return(

            <div >
                <button  onClick={prevPage}>&#8249;</button>
                <button onClick={nextPage}>&#8250;</button>
            </div>
    )
}
