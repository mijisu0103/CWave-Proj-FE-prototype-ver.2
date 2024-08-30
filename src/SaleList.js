import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import axios from 'axios';

const SaleListBlock = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  margin-top: 3vh;
  justify-content: space-between;
  width: 80vw;
  margin: 0 auto;
`;

const SaleList = () => {
    
    const [sale, setsale] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get("https://prod.olyoung.com/api/items/all");
          console.log(response.data); // API로부터 받아온 데이터 확인
          const saleArray = Array.isArray(response.data) ? response.data : [response.data];
          setsale(saleArray);
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
      };
      fetchData();
    }, []);
  
    // 대기 중일 때
    if (loading) {
      return <SaleListBlock>Loading...</SaleListBlock>;
    }
  
    // 아직 sale 값이 설정되지 않았을 때
    if (!sale) {
      return null;
    }
  
    // sale 값이 유효할 때
    return (
      <SaleListBlock>
        {sale.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </SaleListBlock>
    );
  };

export default SaleList;
