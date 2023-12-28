import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function CoinChart(){

    const params=useParams()
    const [coin,setCoin]=useState(null)
    const url=`https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=usd&days=1`

    useEffect(()=>{
        axios.get(url).then((response)=>{
            if(!response){
                return <div> chart not available...</div>
            }

            else{
            const chartdata=response.data.prices?.map(value=>({x:value[0], y:value[1].toFixed(2)}))
            setCoin(chartdata)
              
            }
        }).catch((error)=>{
            console.log(error)
        })
    },[])



    const options={
        response:true
    }



    

    const data={
        labels:coin?.map(value=> moment(value.x).format('LT')),
        datasets:[
            {
                filler:true,
                label:params.coinId,
                data:coin?.map(val=>val.y) ,
                borderColor: 'orange',
                // backgroundColor:'white',
            }
        ]
      }




    return (
    <>
      <Line options={options} data={data}/>
    </>
)
   
}