import { Link } from "react-router-dom"
import CoinInfo from "./CoinInfo"
import './Coins.css'
import CoinPages from "../Pages/CoinPages"


export default function Coin({coins}){

    return(
    <>
    <div className="container main-con">
        <div className="row lg">
            <div className="col">
                <p>Rank</p>
            </div>
            <div className="col ">
                <p>Coins</p>
            </div>
            <div className="col ">
                <p>Price</p>
            </div>
            <div className="col mob-hide">
                <p>24h</p>
            </div>
            <div className="col mob-hide">
                <p>Volume</p>
            </div>
            <div className="col mob-hide">
                <p>Mkt Cap</p>
            </div>
        </div>
    </div>
 
            {coins.map(coins=>{
                return(
                    <Link to={`/CoinPages/${coins.id}`} element={<CoinPages/>}  key={coins.id}  style={{textDecoration:'none'}}>
                    <CoinInfo coins={coins}/>
                    </Link>
                )
            })}

    </>
)
}