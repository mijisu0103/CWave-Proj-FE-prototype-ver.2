import $ from "jquery"

console.clear();

// 상단 메인 배너 슬라이더
$('.main-bn > .slider > .page-btns > .page-btn').click(function(){
    var $clicked = $(this);
    var $slider = $(this).closest('.slider');
    
    var index = $(this).index();
    var isLeft = index === 0;
    //console.log(index);
    
    var $current = $slider.find(' > .slides > .bn.active');
    var $post;
    
    if ( isLeft ){
        $post = $current.prev();
    }
    else {
        $post = $current.next();
    }
    //console.log($post.length);
    
    if ( $post.length === 0 ){
        if ( isLeft ){
            $post = $slider.find(' > .slides > .bn:last-child');
        }
        else {
            $post = $slider.find(' > .slides > .bn:first-child');
        }
    }
    
    $current.removeClass('active');
    $post.addClass('active');
    
    updateCurrentPageNumber();
});

setInterval(function(){
    $('.main-bn > .slider > .page-btns > .next-btn').click();
}, 8000);

// 슬라이더 페이지 번호 지정
function pageNumber__Init(){
    // 전채 배너 페이지 갯수 세팅해서 .slider 에 'data-slide-total' 넣기
    var totalSlideNo = $('.main-bn > .slider > .slides > .bn').length;
    //console.log(totalSlideNo);
    
    $('.main-bn > .slider').attr('data-slide-total', totalSlideNo);
    
    // 각 배너 페이지 번호 매기기
    $('.main-bn > .slider > .slides > .bn').each(function(index, node){
        $(node).attr('data-slide-no', index + 1);
    });
};

pageNumber__Init();

// 슬라이더 이동시 페이지 번호 변경
function updateCurrentPageNumber(){
    var totalSlideNo = $('.main-bn > .slider').attr('data-slide-total');
    var currentSlideNo = $('.main-bn > .slider > .slides > .bn.active').attr('data-slide-no');
    
    $('.main-bn > .slider > .page-btns > .page-no > .total-slide-no').html(totalSlideNo);
    $('.main-bn > .slider > .page-btns > .page-no > .current-slide-no').html(currentSlideNo);
};

updateCurrentPageNumber()
