// import React, { useState } from "react";


// export default function Paginado({ recipesPage, showedRecipes, paged, setPage, page }) {

//     const[input,setInput] = useState(1);

//     const back = () => {
//         setInput(parseInt(input) - 1);
//         setPage(parseInt(input) - 1 )
//     }
//     const next = () => {
//         setInput(parseInt(input) + 1);
//         setPage(parseInt(input) + 1 )
//     }

//     let pag = (p) => {
//         setInput(parseInt(p))
//         paged(p);
//     }

//     const pages = [];

//     for (let i = 1; i <= Math.ceil(showedRecipes / recipesPage); i++) {
//         pages.push(i)
//     };

//     return (
//         <div className={style.general}>
//             <button className={style.bn} onClick={back} disabled={page <= 1}> ← </button>
//             {
//                 <nav>
//                     <ul className={style.ul}>
//                         {pages?.map((p) => (
//                             <li className={style.list} key={p}>
//                                 <button className={style.btn} onClick={() => pag(p)}>{p}</button>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>
//             }
//             <button className={style.bn} onClick={next} disabled={page === pages.length}> → </button>
//         </div>
//     )
// }
// <div className={style.final}>

//                 {
//                     props.showedRecipes.length > 9 ?
//                         <div >
//                             <Nav recipesPage={recipesPage} showedRecipes={props.showedRecipes.length} paged={paged} setPage={setPage} page={page}></Nav>
//                             <span > {page} of {Math.ceil(props.showedRecipes.length / recipesPage)} </span>
//                         </div> :
//                         <div><span > {page} of {Math.ceil(props.showedRecipes.length / recipesPage)} </span></div>
//                 }


//             </div>