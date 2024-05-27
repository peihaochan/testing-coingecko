"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

interface iPrice {
  ethereum: null | number;
  optimism: null | number;
  arbitrum: null | number;
}
export default function Home() {
  const [price, setPrice] = useState<iPrice>({
    ethereum: null,
    optimism: null,
    arbitrum: null,
  });

  const assetArr = ["ethereum", "optimism", "arbitrum"] as const;
  type AssetType = (typeof assetArr)[number];

  const hasFetchedData = useRef<Record<AssetType, boolean>>({
    ethereum: false,
    optimism: false,
    arbitrum: false,
  });

  const maxApiCalls = 3; // Setting the maximum number of API calls
  const apiCallTimeout = 1000; // Timeout for API calls in milliseconds
  let apiCallCount = 0;

  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < assetArr.length; i++) {
        if (
          price[assetArr[i]] === null &&
          !hasFetchedData.current[assetArr[i]] &&
          apiCallCount < maxApiCalls
        ) {
          try {
            const response = await axios.get(
              `https://api.coingecko.com/api/v3/simple/price?ids=${assetArr[i]}&vs_currencies=usd`
            );

            if (response.status === 200) {
              setPrice((prevPrice: iPrice) => ({
                ...prevPrice,
                [assetArr[i]]: response.data[assetArr[i]].usd,
              }));
              hasFetchedData.current[assetArr[i]] = true;
              apiCallCount++;
              setTimeout(fetchData, apiCallTimeout);
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    };

    fetchData();
  }, []);

  return <div></div>;
}
