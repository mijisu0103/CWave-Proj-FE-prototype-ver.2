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
    height: 60vh;
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
    font-size: 20px;
    margin: 10px 0;
    color: #333;
    margin-top: 2vh;
    line-height: 1.2em;
    max-height: 2.4em; 
    text-overflow: ellipsis;
  }

  .product .product-price {
  font-size: 16px;
  color: black;
  text-decoration: line-through;
  font-weight: bolder;
  margin-top: 1vh;
  }

  .product .product-saleprice {
    font-size: 28px;
    color: #ff7878;
    font-weight: bolder;
    margin-top: 4vh;
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
    font-size: 23px;
    color: #abd548;
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    margin-top: 4vh;
    margin-left: 3vw;
    margin-right: 3vw;
  }
`;

const ProductItem = ({ product }) => {
  
  const navigate = useNavigate();
  const navDetail = () => { navigate(`/product/${product.id}`) };

  const { id, category, imageUrl, name, price, salePrice } = product;

  // Ensure tags is an array and filter out empty or invalid tags
  // const tagsArray = Array.isArray(tags) ? tags : [];

  return (
    <ProductItemBlock>
      <div className="product">
        {/* <span className="product-label">{category}</span> */}
        <img src={imageUrl} alt={id} />
        <div className="product-name">{name}</div>
        <div className="product-saleprice">$ {salePrice}</div>
        <div className="product-price">$ {price}</div>

        {/* {tagsArray.length > 0 && (
            <div className="product-tags">
                {tagsArray.map((tags, index) => (
                <span key={index}>{product.tags}</span>
                ))}
            </div>
        )} */}
        <div>
          <button onClick={navDetail} className="product-action">More</button>
          <span className="product-action">Cart</span>
        </div>
      </div>
    </ProductItemBlock>
  );
};

export default ProductItem;
