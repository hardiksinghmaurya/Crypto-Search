import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './CoinPages.css'
import CoinChart from "./CoinChart";
import 'ldrs/lineSpinner'
import ChangeUsd from "../changeusd";

export default function CoinPages() {
    const params = useParams()
    const [loader,setLoader]=useState(false)
    const [coins, setCoins] = useState({})
    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`
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
        <div className="loader position-absolute top-50 start-50 ">
          <l-line-spinner
            size="40"
            stroke="3"
            speed="1"
            color="rgb(252, 168, 12)"
          ></l-line-spinner>
        </div>
      }
        <Link to='/'>
        <span className="back-btn position-absolute top-0"><ion-icon  name="arrow-back-outline"></ion-icon></span>
      </Link>
            <div className="heading">
                <h1>{coins.name}</h1>
                {coins.image ? <img src={coins.image.small} alt='' /> : null}
                <h1>{coins.symbol}</h1>
            </div>
            <span className="rank-price">Rank #{coins.market_cap_rank}</span>
             <p className="crt-price"> Current Price: {coins.market_data ? <span>${coins.market_data.current_price.usd}</span> : null }</p>

            <div className="main-abt">
                <table>
                    <thead>
                        <tr>
                            <th>1h</th>
                            <th>24h</th> 
                            <th>7d</th>
                            <th>30d</th>
                            <th>1yr</th>
                        </tr>
                    </thead>
              

                
                    <tbody>
                        <tr>
                            <td>{coins.market_data?.price_change_percentage_1h_in_currency ? <span className={`${coins.market_data?.price_change_percentage_1h_in_currency.usd < 0 ? 'text-danger' : 'text-success'}`}>{coins.market_data?.price_change_percentage_1h_in_currency.usd.toFixed(2)}%</span> : null}</td>
                        
                        
                            <td>{coins.market_data?.price_change_percentage_24h_in_currency ? <span className={`${coins.market_data?.price_change_percentage_24h_in_currency.usd <0 ? 'text-danger' : 'text-success'}`}>{coins.market_data?.price_change_percentage_24h_in_currency.usd.toFixed(2)}%</span> : null}</td>
                       
                       
                            <td>{coins.market_data?.price_change_percentage_7d_in_currency ? <span className={`${coins.market_data?.price_change_percentage_7d_in_currency.usd <0 ? 'text-danger' : 'text-success'}`}>{coins.market_data?.price_change_percentage_7d_in_currency.usd.toFixed(2)}%</span> : null}</td>
                       
                       
                            <td>{coins.market_data?.price_change_percentage_30d_in_currency ? <span className={`${coins.market_data?.price_change_percentage_30d_in_currency.usd <0 ? 'text-danger' : 'text-success'}`}>{coins.market_data?.price_change_percentage_30d_in_currency.usd.toFixed(2)}%</span> : null}</td>
                       
                      
                            <td>{coins.market_data?.price_change_percentage_1y_in_currency ? <span className={`${coins.market_data?.price_change_percentage_1y_in_currency.usd <0 ? 'text-danger' : 'text-success'}`}>{coins.market_data?.price_change_percentage_1y_in_currency.usd.toFixed(2)}%</span> : null}</td>
                        </tr>
                    </tbody>
                </table>
                </div>



               <div className="coin-data">
                            <p> <span className="coin-market"> 24 Hour Low:</span>
                            {coins.market_data ? <span className="abt-coin-mkt">{coins.market_data.low_24h.usd}</span> : null}</p>
                       
                            <p><span className="coin-market">24 Hour High:</span>
                            {coins.market_data ? <span className="abt-coin-mkt">{coins.market_data.high_24h.usd}</span> : null}</p>
                        
                            <p>     <span className="coin-market">Market Cap:</span>
                            {coins.market_data ? <span className="abt-coin-mkt">${ChangeUsd(coins.market_data.market_cap.usd.toFixed(2))}</span> : null}</p>

                            <p> <span className="coin-market">Volume: </span>
                            {coins.market_data? <span className="abt-coin-mkt">${ChangeUsd(coins.market_data.total_volume.usd)}</span>: null}</p>
                       
                       <p><span className="coin-market">Circulating Supply:    </span>
                            {coins.market_data ? <span className="abt-coin-mkt">{ChangeUsd(coins.market_data.circulating_supply)}  {coins.symbol.toUpperCase()} </span> : null}
                            </p>
                            </div>


               <CoinChart/>


        <hr />
                <div className="about"> 
                <span >About</span>
                <div className="description" dangerouslySetInnerHTML={{__html: (coins.description ? coins.description.en : '')}}></div>
                </div>
        <hr />

               

        </>
    )
}