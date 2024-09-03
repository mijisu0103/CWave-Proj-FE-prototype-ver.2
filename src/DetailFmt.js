import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './App.css';
import './Detail.css';
import { Helmet } from 'react-helmet';

const DetailFmt = () => {

    const params = useParams();
    const productId = Number(params.id);  // productId를 숫자로 변환
    
    const [product, setProduct] = useState(null);
    
    const { id, category, imageUrl, name, price, salePrice, prodinfo_why, prodinfo_ing, prodinfo_how } = product || {};

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/json/LiveRanking.json`);  // 전체 JSON 파일을 로드
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
    
          // 해당 productId에 맞는 상품을 검색
          const foundProduct = result.find(item => item.id === productId);

          console.log('Fetched product data:', foundProduct);
          setProduct(foundProduct || null);  // 해당 상품이 없으면 null 설정
        } catch (error) {
          console.error('Error fetching product:', error);
          setProduct(null);  // 오류 발생 시 null로 설정
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

            {product && (
                <div className="product-info">
                    <div>
                        <h2>Product Info</h2>
                        <span><br></br></span>
                        <h3>Why we love it</h3>
                        <h4>{prodinfo_why}</h4>
                    </div>
                    <div>
                      <span><br></br></span>
                        <h3>Featured ingredients</h3>
                        <h4>{prodinfo_ing}</h4>
                    </div>
                    <div>
                        <span><br></br></span>
                        <h3>How to use</h3>
                        <h4>{prodinfo_how}</h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailFmt;
