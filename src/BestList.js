import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import axios from 'axios';

const BestListBlock = styled.div`
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

const BestList = () => {
    
    const [best, setbest] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get("https://prod.olyoung.com/api/items/all");
          console.log(response.data); // API로부터 받아온 데이터 확인
          const bestArray = Array.isArray(response.data) ? response.data : [response.data];
          setbest(bestArray);
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
      };
      fetchData();
    }, []);
  
    // 대기 중일 때
    if (loading) {
      return <BestListBlock>Loading...</BestListBlock>;
    }
  
    // 아직 best 값이 설정되지 않았을 때
    if (!best) {
      return null;
    }
  
    // best 값이 유효할 때
    return (
      <BestListBlock>
        {best.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </BestListBlock>
    );
  };

export default BestList;
