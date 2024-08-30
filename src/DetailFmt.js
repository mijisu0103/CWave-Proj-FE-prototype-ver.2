import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './App.css'
import './Detail.css';
import { Helmet } from 'react-helmet'

const DetailFmt = () => {

    const params = useParams();
    const productId = params.id;
  
    const [product, setProduct] = useState(null);
    
    const { id, category, imageUrl, name, price, salePrice, prodinfo_why, prodinfo_ing, prodinfo_how } = product || {};

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`https://prod.olyoung.com/api/items/${productId}`); //`https://api.olyoung.com/api/items/${productId}`
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
    
          // 응답 구조가 result.data가 아닌 경우를 대비해 콘솔로 확인
          console.log('Fetched product data:', result);
    
          // 적절한 데이터를 상태로 설정 (result 또는 result.data 등)
          setProduct(result.data || result);
        } catch (error) {
          console.error('Error fetching product:', error);
          // 오류가 발생하면 상태를 null로 유지하거나 사용자에게 오류 메시지를 표시
          setProduct(null);
        }
      };
    
      if (productId) {
        fetchProduct();
      }
    }, [productId]);
      
  
return (
    <div>
        <Helmet>
            <title> {product ? `${name} | OLIVE YOUNG Global` : 'Loading...'}</title>
        </Helmet>

    <section>
    {product ? (
      <div className="container">
        <div className="image-section">
          <img src={imageUrl} alt={id} />
        </div>
        <div className="details-section">
          <h2>{name}</h2>
          <p className="saleprice">$ {salePrice}</p>
          <p className="original-price">$ {price}</p>
          <div className="info">
            {/* <span>{category}</span> */}
          </div>
          {/* <select id="product-options" className="product-select">
            <option value="" disabled selected>Please select the product type</option>
            <option value="221">NEW 221 테메트 노스케 12,000원</option>
            <option value="222">NEW 222 피아트 룩스 12,000원</option>
            <option value="223">NEW 223 아모르 파티 12,000원</option>
          </select> */}

          <div className="selected-products" id="selected-products"></div>

          <div className="actions-wrapper">
            <div className="actions">
              <button className="add-to-cart">Cart</button>
              <button className="buy-now">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </section>

  <div className="product-info">
    <div>
        <h2>Product Info</h2>
        <h3>Why we love it</h3>
        <span>{prodinfo_why}</span>
    </div>
    <div>
        <h3>Featured ingredients</h3>
        <span>{prodinfo_ing}</span>
    </div>
    <div>
        <h3>How to use</h3>
        <span>{prodinfo_how}</span>
    </div>

  </div>

  </div>
  )
}

export default DetailFmt;