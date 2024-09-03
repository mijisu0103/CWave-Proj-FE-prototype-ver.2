import React, { useState, useEffect } from 'react';
import { useProductList } from '../ProductList'; 
import ProductItem from '../ProductItem';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import $ from 'jquery';

const MainHtml = () => {
  const { products, loading } = useProductList(); 
  const [slides, setSlides] = useState([]);
  const [viewCounts, setViewCounts] = useState({});
  const navigate = useNavigate();

  const generateRandomData = (currentViewCounts) => {
    const shuffledProducts = [...products].map(product => ({
      ...product,
      order: Math.random() * 0.1 
    })).sort((a, b) => a.order - b.order);
  
    const newViewCounts = {};
    const maxInitialViewCount = 100000; // Set a high initial view count for the top product
    const minInitialViewCount = 1000; // Set a lower initial view count for the last product
  
    shuffledProducts.forEach((product, index) => {
      // Get the current view count or set it to the minimum if it doesn't exist
      const currentViewCount = currentViewCounts[product.id] || minInitialViewCount;
  
      // Calculate a new view count based on rank and current view count
      const rankFactor = 1.05 + Math.random() * 0.05 * (shuffledProducts.length - index) / shuffledProducts.length;
      const newViewCount = Math.round(currentViewCount * rankFactor);
  
      newViewCounts[product.id] = newViewCount;
    });
  
    return { shuffledProducts, newViewCounts };
  };
  
  const updateSlidesAndViews = () => {
    if (!loading && products.length > 0) {
      const savedData = localStorage.getItem('liveRankingData');
      
      let currentProducts, currentViewCounts;
  
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        currentProducts = parsedData.shuffledProducts;
        currentViewCounts = parsedData.viewCounts;
      } else {
        currentViewCounts = {};
        currentProducts = products;
      }
  
      const randomData = generateRandomData(currentViewCounts);
      currentProducts = randomData.shuffledProducts;
      const newViewCounts = randomData.newViewCounts;
  
      // Save updated view counts and product order to localStorage
      localStorage.setItem('liveRankingData', JSON.stringify({
        shuffledProducts: currentProducts,
        viewCounts: newViewCounts
      }));
  
      setViewCounts(newViewCounts);
  
      // Sort products based on new viewCounts in descending order
      currentProducts.sort((a, b) => newViewCounts[b.id] - newViewCounts[a.id]);
  
      const productsPerSlide = 1;
      const newSlides = [];
      for (let i = 0; i < currentProducts.length; i += productsPerSlide) {
        newSlides.push(currentProducts.slice(i, i + productsPerSlide));
      }
      setSlides(newSlides);
    }
  };
  
  useEffect(() => {
    if (!loading) {
      updateSlidesAndViews();
      const intervalId = setInterval(() => {
        updateSlidesAndViews();
      }, 5 * 60 * 1000); // Update every 5 minutes
  
      return () => clearInterval(intervalId);
    }
  }, [loading, products]);
  

  useEffect(() => {
    if (loading) return;

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
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>OLIVE YOUNG Global | Global Lifestyle Platform</title>
      </Helmet>
      <header>
        <div className="logo">
          <button onClick={() => navigate("/")}><img src={process.env.PUBLIC_URL + './logo.svg'} alt="logo" /></button>
        </div>
        <div className="header-search">
          <input type="text" placeholder="Search for a product or brand..." />
          <button><img src="icon_search_md.png" alt="search icon" style={{ width: '28px', height: '28px', padding: '2px', marginRight: '2px' }}/></button>
        </div>
      </header>
      <div className="nav-bar-cont">
        <ul className="nav-bar">
          <div className="menu1">
            <li className="mhl"><button onClick={() => navigate("/bestsellers")}>BEST SELLERS</button></li>
          </div>
          <div className="menu2">
            <li className="mhl"><button onClick={() => navigate("/sale")}>SALE</button></li>
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
        <div className="swiper-container">
          <Swiper
            modules={[Navigation, Pagination]}
            direction='horizontal'
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {slides.map((slideProducts, index) => (
              <SwiperSlide key={index} style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                {slideProducts.map(product => (
                  <ProductItem key={product.id} product={product} viewCount={viewCounts[product.id]} />
                ))}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <footer>
        {/* Footer content here */}
      </footer>
    </div>
  );
};

export default MainHtml;
