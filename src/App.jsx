import PageHeader from './layout/PageHeader'
import PageTitle from './layout/PageTitle'
import './styles.scss'
import Summary from './Summary'
import TableRow from './TableRow'
import {useEffect, useState} from 'react'
import { api } from './provider'

function randomNumber(min, max) {
  return Math.floor(Math.random() * ( max-min) + min)
}



function App() {
  const [cart, setCart] = useState([1])
  const fetchData = () =>{
    api.get('/cart').then((response) => setCart(response.data))

  }

  
const  productObject = {
  name: 'produto',
  category: 'categoria',
  price: randomNumber(90, 1200),
  quantity: 1,
};

  useEffect(() =>{
    fetchData()
  },[])

  const  handleAddItem = () =>{
    //inserção
    api.post('/cart', productObject).then(response => {
      console.log(response)
      fetchData()
    })


  }

  const  handleRemoveItem = (item) =>{
    //remocao

    console.log('Remove o item:',{item})

    api.delete(`/cart/${item._id}`).then(response => {
      console.log(response)
      fetchData();
    })

  }

  const  handleUpdateItem = (item, action) =>{

    console.log({item})

    let newQuantity = item.quantity;

    if(action === 'decrease'){
      if(newQuantity === 1){
        return
      }
      newQuantity -= 1

    }

    if(action === 'increase'){
      newQuantity += 1
    }
    const newData ={...item, quantity: newQuantity}

    delete newData._id

    api.put(`/cart/${item._id}`, newData).then((response) =>{
      console.log(response)
      fetchData()
    })



  }

  const getTotal =() =>{
    let sum = 0

    for (let item of cart){
     sum += item.price * item.quantity 
    }

    return sum
  }

  const cartTotal = getTotal()

  return (
    <>
    <PageHeader />
    <main>
      <PageTitle data={'Seu Carrinho'}/>
      <div className="content">
        <section>
          <button onClick={handleAddItem} style={{padding: '5px 10px', marginBottom: '15px'}}>
            add to cart
          </button>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => <TableRow key={item._id} data={item} handleRemoveItem={handleRemoveItem} handleUpdateItem={handleUpdateItem}/>)}
              {cart.length === 0 && (
                <tr>
                  <td colSpan='5' style={{textAlign: 'center'}}>
                      Carrinhos de compras está vazio
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
        <aside>
          <Summary  total={cartTotal}/>
        </aside>
      </div>
    </main>
    
    </>
  )
}

export default App
