import axios from "axios"
import { useEffect, useState } from "react"
import Coin from "./Components/Coins"
import './App.css'
import { Route, Routes } from 'react-router-dom'
import CoinPages from './Pages/CoinPages'
import 'ldrs/lineSpinner'


export default function App() {

  const [coins, setCoins] = useState([])
  const [loader, setLoader] = useState(false)

  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false&locale=en"

  useEffect(() => {
    setLoader(true)
    axios.get(url).then((response) => {
      setCoins(response.data)
      setLoader(false)
    }).catch((error) => {
      console.log(error)
      setLoader(false)
    })
  }, [])
  return (
    <>
      {
        loader &&
        <div className="loader position-absolute top-50 start-50">
          <l-line-spinner
            size="40"
            stroke="3"
            speed="1"
            color="rgb(252, 168, 12)"
          ></l-line-spinner>
        </div>
      }
      
      
      <div className='header m-5'>
        <div className="logo"> <img src="/coinlogo.png" alt="logo" />
        Crypto <span>Search</span>
        </div>
        <h4>Top 25 crypto</h4>
      </div>
      

      <Routes>
        <Route path="/" element={<Coin coins={coins} />} />
        <Route path="/CoinPages" element={<CoinPages coins={coins}/>}>
          <Route path=":coinId" element={<CoinPages />} />
        </Route>
      </Routes>
    </>
  )
}












