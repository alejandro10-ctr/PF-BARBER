// import React from 'react'
import '../Table/Table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const List = () => {
  
    const  rows= [{
        id: 1,
        name: "Beard Balm",
        price: 200,
        quality: "premium",
        stock: 5,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_959303-MLA51602582272_092022-F.webp",
        status: 'pending'
      }, {
        id: 2,
        name: "Mühle Razor Gillette® Fusion Vivo Series Plumtree",
        price: 5400,
        quality: "basic",
        stock: 52,
        image: "https://www.giftsandcare.com/12277-home_default_carousel/muehle-razor-gillette-fusion-vivo-series-plumtree.jpg",
        status: 'pending'
    },
      { id: 3,
        name: "Edwin Jagger Marfil",
        price: 200,
        quality: "premium",
        stock: 5,
        image: "https://www.giftsandcare.com/9786-large_default/maquinilla-de-afeitar-clasica-plaza-edwin-jagger-marfil.jpg",
        status: 'approved'
      },
      { id: 4,
        name: "Brosh Super Hard Gel 200gr",
        price: 200,
        quality: "basic",
        stock: 5,
        image: "https://www.giftsandcare.com/14216-large_default/brosh-super-hard-gel-200gr.jpg",
        status: 'approved'
      },
      { id: 5,
        name: "Mühle Double Edge Safety Razor R89 Rose Gold Close Comb",
        price: 200,
        quality: "premium",
        stock: 5,
        image: "https://www.giftsandcare.com/1621-large_default/muehle-double-edge-safety-razor-r89-rose-gold-close-comb-.jpg",
        status: 'pending'
    },
      { id: 6,
        name: "Fatip Chrome Slant Double Edge Safety Razor",
        price: 200,
        quality: "premium",
        stock: 5,
        image: "https://www.giftsandcare.com/17239-large_default/fatip-chrome-slant-double-edge-safety-razor.jpg",
        status: 'pending'
    },
      { id: 6,
        name: "Omega Garnet Shaving Bowl",
        price: 200,
        quality: "basic",
        stock: 5,
        image: "https://www.giftsandcare.com/6329-large_default/brocha-de-afeitar-pelo-sintetico-roja-omega-s10018.jpg",
        status: 'approved' 
    },
      { id: 7,
        name: "Fatip Piccolo Gold Slant Close Open Double Edge Safety Razor",
        price: 200,
        quality: "basic",
        stock: 5,
        image: "https://www.giftsandcare.com/16511-large_default/fatip-piccolo-gold-slant-close-open-double-edge-safety-razor.jpg",
        status: 'pending'
      },
      { id: 8,
        name: "Baxter of California Shave Tonic",
        price: 200,
        quality: "premium",
        stock: 5,
        image: "https://www.giftsandcare.com/9869-large_default/dear-barber-shave-oil-30ml.jpg",
        status: 'approved'
      },
      { id: 9,
        name: "Captain Fawcett Barberism Pre-Shave Oil 50ml",
        price: 300,
        quality: "basic",
        stock: 5,
        image: "https://www.giftsandcare.com/9427-large_default/aceite-pre-afeitado-barberism-captain-fawcett-50ml.jpg",
        status: 'pending'
    },
      { id: 10,
        name: "Hey Joe Pre Shave Oil 50ml",
        price: 200,
        quality: "premium",
        stock: 5,
        image: "https://www.giftsandcare.com/7783-large_default/hey-joe-pre-shave-oil-50ml.jpg",
        status: 'pending'
      },
      { id: 11,
        name: "After Shave BeardLovers",
        price: 200,
        quality: "basic",
        stock: 5,
        image: "https://www.giftsandcare.com/3022-large_default/piedra-de-alumbre-natural-osma-75-gr.jpg",
        status: 'approved'
      },
      { id: 12,
        name: "Cella Milano Bio Aloe Vera After Shave Balm 100ml",
        price: 200,
        quality: "premium",
        stock: 5,
        image: "https://www.giftsandcare.com/13418-large_default/cella-milano-bio-aloe-vera-after-shave-balm-100ml.jpg",
        status: 'pending'
    }
      ]
      
  return (
    
    <TableContainer component={Paper} className='table'>
                  <div className="datatableTitle">
                    List products
        <Link to="/dash/products/add" className="link">
        Add New Product
   
        </Link>
      </div>
      
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='tableCell'>Traking ID</TableCell>
            <TableCell className='tableCell'>Product</TableCell>
            <TableCell className='tableCell'>Price</TableCell>
            <TableCell className='tableCell'>Quality</TableCell>
            <TableCell className='tableCell'>Stock</TableCell>
            <TableCell className='tableCell'>Status</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell >{row.id}</TableCell>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                    <img src={row.image} alt="" className='image' />
                    {row.name}
                </div>
              </TableCell>
              
           
             
              <TableCell className='tableCell'>{row.price}</TableCell>
              <TableCell className='tableCell'>{row.quality}</TableCell>
              <TableCell className='tableCell'>{row.stock}</TableCell>
              <TableCell className='tableCell'>
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
          
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default List;