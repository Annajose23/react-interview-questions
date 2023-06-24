import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();

    if(data && data.products){
      console.log(data);
      setProducts(data.products);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function selectPageHandler(selectedPage) {
    if(selectedPage !== page && selectedPage >= 1 && selectedPage <= products.length/10){
      console.log({selectedPage})
      setPage(selectedPage);
    }
  }

  return (
    <div className="App">
      {products.length > 0 && (<div className='products'>
        {products.slice(page * 10 - 10, page * 10).map(product => (
          <span className='product__single' key={product.id}>
            <img src={product.thumbnail} alt={product.title}/>
            <span>{product.title}</span>
          </span>
        ))}
      </div>)}
      {
        products.length > 0 && <div className='pagination'>
          <span className={page === 1? 'pagination__hide': ''} onClick={() => selectPageHandler(page-1)}>⬅️</span>
          {
            [...Array(products.length/10)].map((_,i) => {
              return <span className={page=== i+1? "pagination__seleted":""} onClick={() => selectPageHandler(i+1)} key={i}>{i+1}</span>
            })
          }
          <span className={page === products.length/10 ? 'pagination__hide': ''} onClick={() => selectPageHandler(page+1)}>➡️</span>
        </div>
      }
    </div>
  );
}

export default App;
