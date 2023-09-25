import car_ad from '@/assets/car_ad.png'
import bg_ad from '@/assets/bg-vertical-ad.png'
import pexel_69 from '@/assets/pexels-photo-2499769.png'
import pexel_71 from '@/assets/pexels-photo-2765871.png'
import pexel_80 from '@/assets/pexels-photo-3046480.png'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { cn } from '@/lib/utils.ts'

export const Advert = () => {
  return (
    <Splide
      options={{
        perPage: 1,
        speed: 2000,
        autoplay: true,
        direction: 'ttb',
        type: 'loop',
        height: '100vh',
        lazyLoad: true,
        pagination: false,
        arrows: false,
      }}
    >
      <SplideSlide>
        <img
          src={car_ad}
          alt='Car ad'
          className={cn('w-[100dvw] h-[100dvh] object-cover object-center')}
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src={bg_ad}
          alt='Bg ad'
          className={cn('w-[100dvw] h-[100dvh] object-cover object-center')}
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src={pexel_69}
          alt='Pexel ad'
          className={cn('w-[100dvw] h-[100dvh] object-cover object-center')}
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src={pexel_71}
          alt='Pexel ad'
          className={cn('w-[100dvw] h-[100dvh] object-cover object-center')}
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src={pexel_80}
          alt='Pexel ad'
          className={cn('w-[100dvw] h-[100dvh] object-cover object-center')}
        />
      </SplideSlide>
    </Splide>
  )
}
