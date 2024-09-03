import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const ProductItemBlock = styled.div`
  .product {
    background-color: white;
    border: 1px solid #e5e5e5;
    padding: 15px;
    margin: 10px;
    width: 20vw;
    text-align: center;
    border-radius: 10px;
    margin-bottom: 5vh;
    flex-shrink: 0;
    margin-top: 3vh;
    height: 70vh;
  }

  .product img {
    width: 100%;
    height: 33vh;
    border-radius: 10px;
    margin-bottom: 2vh;
  }

  .product .product-label {
    color: black;
    font-size: 20px;
    font-weight: bolder;
    position: relative;
  }

  .product .product-name {
    font-size: 16px;
    margin: 10px 0;
    color: #333;
    margin-top: 2vh;
    line-height: 1em;
    max-height: 2em;
    text-overflow: ellipsis;
  }

  .product .product-price {
    font-size: 16px;
    color: black;
    text-decoration: line-through;
    font-weight: bolder;
    margin-top: 1.5vh;
  }

  .product .product-saleprice {
    font-size: 24px;
    color: #ff7878;
    font-weight: bolder;
    margin-top: 6vh;
  }

  .product .product-tags {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 2vh;
  }

  .product .product-tags span {
    font-size: 12px;
    color: white;
    background-color: #666;
    padding: 2px 8px;
    border-radius: 12px;
  }

  .product .product-action {
    font-size: 20px;
    color: #abd548;
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    margin-top: 1vh;
    margin-left: 2.5vw;
    margin-right: 2.5vw;
  }

  .product .product-views {
    font-size: 12px;
    color: #999;
    margin-top: 0.2vh;
  }
`;

const ProductItem = ({ product, viewCount }) => {
  const navigate = useNavigate();
  const navDetail = () => { navigate(`/product/${product.id}`) };

  const { id, category, imageUrl, name, price, salePrice } = product;

  return (
    <ProductItemBlock>
      <div className="product">
        <img src={imageUrl} alt={id} />
        {viewCount && <div className="product-views">Views: {viewCount}</div>}
        <div className="product-name">{name}</div>
        <div className="product-saleprice">$ {salePrice}</div>
        <div className="product-price">$ {price}</div>

        <div>
          <button onClick={navDetail} className="product-action">More</button>
          <span className="product-action">Cart</span>
        </div>
      </div>
    </ProductItemBlock>
  );
};

export default ProductItem;
