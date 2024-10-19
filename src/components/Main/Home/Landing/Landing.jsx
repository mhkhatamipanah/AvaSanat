"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const images = [
  "/images/landing/1.png",
  "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
]

const Landing = () => {

  // const [loaded, setLoaded] = React.useState([])
  // const [currentSlide, setCurrentSlide] = React.useState(0)

  // const [sliderRef] = useKeenSlider({
  //   animationEnded(s) {
  //     setCurrentSlide(s.track.details.rel)
  //   },
  //   loop: true,
  //   initial: 0,
  // })

  // React.useEffect(() => {
  //   const new_loaded = [...loaded]
  //   new_loaded[currentSlide] = true
  //   // setLoaded(new_loaded)
  // }, [currentSlide])

  return (
    // <div ref={sliderRef} className="keen-slider ">
    //   {/* {console.log(loaded)} */}
    //   {images.map((src, idx) => (
    //     <div key={idx} className="keen-slider__slide lazy__slide h-[90vh]">
    //       <img className='h-[90vh] !border-0' src={loaded[idx] ? src : ""} />
    //     </div>
    //   ))}
    // </div>
    // <div className="bg-gray-100">
    <section className="relative flex flex-col items-center justify-center w-full bg-[#f7f7f7] overflow-hidden">


      <div className='max-w-[1500px] h-[700px]'>

        <Swiper
          // spaceBetween={50}
          pagination={true}
          modules={[Pagination]}
          dir="rtl"
          // lazy={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide className='w-full h-full max-h-[700px] relative'>
            <div className='bg-[#eeeeee] absolute w-full h-[300px] bg-banner top-1/2 -z-[2]'></div>
            <img
              className='w-full h-full max-h-[700px] object-cover aspect-video z-20'
              src={images[0]}
              loading="lazy"
              alt='2'
            />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </SwiperSlide>
          <SwiperSlide className='w-full h-full max-h-[700px] relative'>
            <div className='bg-[#eeeeee] absolute w-full h-[300px] bg-banner top-1/2 -z-[2]'></div>
            <img
              className='w-full h-full max-h-[700px] object-cover aspect-video z-20'
              src={images[0]}
              loading="lazy"
              alt='2'
            />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </SwiperSlide>

        </Swiper>
      </div>
    </section>
    // </div>

  )
}

export default Landing
