import PageHeader from './layout/PageHeader'
import PageTitle from './layout/PageTitle'
import './styles.scss'
import Summary from './Summary'
import TableRow from './TableRow'

function App() {
  return (
    <>
    <PageHeader />
    <main>
      <PageTitle data={'Seu Carrinho'}/>
      <div className="content">
        <section>
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
              <TableRow />
            </tbody>
          </table>
        </section>
        <aside>
          <Summary />
        </aside>
      </div>
    </main>
    
    </>
  )
}

export default App
