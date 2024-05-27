"use client";
import axios from "axios";
import { useEffect, useState } from "react";

// check why calling twice each
// fetch once again(the ones unable to fecth) if some errors
// must fetch all 3, retry and make sure all are fetch successful - stop calling after X amount
// check strict mode

export default function Home() {
  const [data, setData] = useState<any>({
    ethereum: null,
    optimism: null,
    arbitrum: null,
  });

  const assetArr = ["ethereum", "optimism", "arbitrum"];

  useEffect(() => {
    const getAssets = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${"ethereum"}&vs_currencies=usd`
        );
        console.log("response", response);
        // for (let i = 0; i < assetArr.length; i++) {
        //   if (data[assetArr[i]] === null) {
        //     const response = await axios.get(
        //       `https://api.coingecko.com/api/v3/simple/price?ids=${assetArr[i]}&vs_currencies=usd`
        //     );

        //     setTimeout(response as any, 5000);
        //     if (response.data.code === 200) {
        //       setData({ ...data, [data[i]]: response.data[assetArr[i]] });
        //     } else {
        //       console.error("no response");
        //     }
        //   }
        // }
      } catch (error) {
        console.log(error);
      }
    };
    getAssets();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {assetArr.map((asset) => (
          <div key={asset}>
            {asset}: {data[asset] !== null ? data[asset] : "Loading..."}
          </div>
        ))}
      </div>
    </main>
  );
}
