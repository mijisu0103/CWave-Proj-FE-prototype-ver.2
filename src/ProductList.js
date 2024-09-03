import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 데이터를 제공할 커스텀 훅
export const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/json/bestsellersranking.json");
        const productsArray = Array.isArray(response.data) ? response.data : [response.data];
        setProducts(productsArray);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { products, loading };
};
