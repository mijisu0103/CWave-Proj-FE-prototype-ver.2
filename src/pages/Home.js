import React, { useEffect } from 'react';
import ProductList from '../ProductList';
import { getTagsByIndices, getTagsByRange } from '../tags';
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation} from "swiper";

      
const MainHtml = () => {  

  const navigate = useNavigate();

  const navHome = () => {navigate("/")};
  const navSignup = () => {navigate("/signup")};
  const navLogin = () => {navigate("/login")};
  const navOrder = () => {navigate("/order")};
  const navBest = () => {navigate("/bestsellers")};
  const navSale = () => {navigate("/sale")};


  useEffect(() => {
    console.clear();

    const handlePageButtonClick = function () {
      
      const $clicked = $(this);
      const $slider = $clicked.closest('.slider');
      const index = $clicked.index();
      const isLeft = index === 0;

      const $current = $slider.find(' > .slides > .bn.active');
      let $post;

      if (isLeft) {
        $post = $current.prev(); 
      } else {
        $post = $current.next(); 
      }


      if ($post.length === 0) {
        $post = isLeft
          ? $slider.find(' > .slides > .bn:last-child') 
          : $slider.find(' > .slides > .bn:first-child'); 
      }

      $current.removeClass('active');
      $post.addClass('active');

      updateCurrentPageNumber();
    };

    const pageNumber__Init = () => {
      const totalSlideNo = $('.main-bn > .slider > .slides > .bn').length;
      $('.main-bn > .slider').attr('data-slide-total', totalSlideNo);

      $('.main-bn > .slider > .slides > .bn').each(function (index, node) {
        $(node).attr('data-slide-no', index + 1);
      });
    };

    const updateCurrentPageNumber = () => {
      const totalSlideNo = $('.main-bn > .slider').attr('data-slide-total');
      const currentSlideNo = $('.main-bn > .slider > .slides > .bn.active').attr('data-slide-no');
      $('.main-bn > .slider > .page-btns > .page-no > .total-slide-no').html(totalSlideNo);
      $('.main-bn > .slider > .page-btns > .page-no > .current-slide-no').html(currentSlideNo);
    };

    $('.main-bn > .slider > .page-btns > .page-btn').click(handlePageButtonClick);

    const intervalId = setInterval(function () {
      $('.main-bn > .slider > .page-btns > .next-btn').click();
    }, 8000);

    pageNumber__Init();
    updateCurrentPageNumber();

    return () => {
      clearInterval(intervalId);
      $('.main-bn > .slider > .page-btns > .page-btn').off('click', handlePageButtonClick);
    };
  }, []);

  return (
    <div>
        <Helmet>
          <title>OLIVE YOUNG Global | Global Lifestyle Platform</title>
        </Helmet>
      
      <header>
        <div className="logo">
          <button onClick={navHome}><img src={process.env.PUBLIC_URL + './logo.svg'} alt="logo" /></button>
        </div>
        <div className="header-search">
          <input type="text" placeholder="Search for a product or brand..." />
          <button><img src="icon_search_md.png" alt="search icon" style={{ width: '28px', height: '28px', padding: '2px', marginRight: '2px' }}/></button>
        </div>
{/* 
        <div className="header-links">
          <button onClick={navSignup}>Sign up</button>
          <button onClick={navLogin}>Log in</button>
          <button onClick={navOrder}>Order</button>
        </div> */}
      </header>

      <div className="nav-bar-cont">
        <ul className="nav-bar">
          <div className="menu1">
            <li className="mhl"> <button onClick={navBest}>BEST SELLERS</button></li>
          </div>
          <div className="menu2">
            <li className="mhl"><button onClick={navSale}>SALE</button></li>
          </div>
        </ul>
      </div>

      <main>
        <div>   
          <div className="imgslid wrap">
            <div className="main-bn">
              <div className="slider">
                <div className="slides">
                  <div className="bn active" style={{ backgroundImage: `url(slide1.jpg)` }}></div>
                  <div className="bn" style={{ backgroundImage: `url(slide2.jpg)` }}></div>
                  <div className="bn" style={{ backgroundImage: `url(slide3.jpg)` }}></div>
                  <div className="bn" style={{ backgroundImage: `url(slide4.jpg)` }}></div>
                  <div className="bn" style={{ backgroundImage: `url(slide5.jpg)` }}></div>
                  <div className="bn" style={{ backgroundImage: `url(slide6.png)` }}></div>
                </div>
                <div className="page-btns">
                  <button className="page-btn prev-btn"><i className="xi-angle-left"></i></button>
                  <button className="page-btn next-btn"><i className="xi-angle-right"></i></button>
                  <div className="page-no">
                    <span className="current-slide-no"></span>
                    <span className="slash">/</span>
                    <span className="total-slide-no"></span>
                  </div>
                </div>
              </div>
            </div>    
          </div>
        </div> 
      </main>

    
      <div className="products">
              <div className="top3">Live Ranking</div>
              <div className="product-row">
                <ProductList/>
                {/* <Product label="Best" imgsrc="" alt="1" name="[광채토닝] 아이오페 글루타 비타민C 토닝 앰플 23g 기획" price="30" tags={getTagsByIndices([0, 2])}></Product>
                <Product label="Best" imgsrc="" alt="2" name="item2" price="20" tags={getTagsByRange('0:4')}></Product>
                <Product label="Best" imgsrc="" alt="3" name="item3" price="40" tags={getTagsByRange('0:2')}></Product> */}
              </div>
            </div>
      <footer>
        {/* Footer content here */}
      </footer>
    </div>
  );
};

export default MainHtml;
