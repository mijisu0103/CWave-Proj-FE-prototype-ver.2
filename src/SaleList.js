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
    
    const [sale, setSale] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get("/json/salelist.json");
          console.log(response.data); // API로부터 받아온 데이터 확인
          const saleArray = Array.isArray(response.data) ? response.data : [response.data];

          // 할인율 계산 후 정렬
          const sortedSaleArray = saleArray.sort((a, b) => {
            const discountA = ((a.price - a.salePrice) / a.price) * 100;
            const discountB = ((b.price - b.salePrice) / b.price) * 100;
            return discountB - discountA; // 높은 할인율 순으로 정렬
          });

          setSale(sortedSaleArray);
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
