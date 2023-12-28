import './Coins.css'
import ChangeUsd from '../changeusd'
export default function CoinInfo({ coins }) {
    return (
        <>
            <div className="container abt-con">
                <div className="row">
                    <div className="col ">
                        <p>{coins.market_cap_rank}</p>
                    </div>
                    <div className="col img-symbol text-capitalize">
                            <img src={coins.image} alt="loading" />
                            <p>{coins.symbol.toUpperCase()}</p>
                    </div>
                    <div className="col ">
                        <p>${ChangeUsd(coins.current_price.toFixed(2))}</p>
                    </div>
                    <div className="col mob-hide">
                        <p className={`${coins.price_change_percentage_24h < 0 ? 'text-danger fw-bold' : 'text-success fw-bold'} `} >{coins.price_change_percentage_24h.toFixed(2)}%</p>
                    </div> 
                    <div className="col mob-hide">
                        <p>${ChangeUsd(coins.total_volume)}</p>
                    </div>
                    <div className="col mob-hide">
                        <p>${ChangeUsd(coins.market_cap.toFixed(2))}</p>
                    </div>
                </div>
            </div>
        </>
    )
}