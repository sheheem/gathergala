import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class UserHomeComponent implements OnInit, AfterViewInit {
  swiperProducts: Swiper;

  ngOnInit() {
    
  }

ngAfterViewInit(): void {
  this.swiperProducts = new Swiper('.js-vv-product-swiper', {
    direction: 'horizontal',
    loop: true,
    navigation: {
      nextEl: '.vv-product-swiper-btn-next',
      prevEl: '.vv-product-swiper-btn-prev',
    },
  });

  const swiperChannel = new Swiper('.js-vv-channel-info-swiper', {
    slidesPerView: 1,
    loop: true,
    parallax: true,
    speed: 500,
    pagination : {
      el: '.js-vv-channel-info-swiper-pagination',
      type: 'bullets',
      clickable: true,
      bulletClass: '.js-vv-pagination-bullet',
      bulletActiveClass: ".js-vv-pagination-bullet-active"
    },
    navigation: {
      nextEl: '.js-vv-channel-info-swiper-btn-next',
      prevEl: '.js-vv-channel-info-swiper-btn-prev'
    }
  })

  const swiperPlaylists = new Swiper('.js-vv-playlist-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1210: {
        slidesPerView: 4,
      },
    },
    navigation: {
      nextEl: '.vv-playlist-swiper-btn-next',
      prevEl: '.vv-playlist-swiper-btn-prev',
    },
  });

  const swiperHeroSlider = new Swiper('.js-vv-hero-swiper', {
    slidesPerView: 1,
    loop: true,
    parallax: true,
    speed: 500,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 8000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.js-vv-hero-swiper-pagination',
      clickable: true,
      renderBullet: function (index: number, className: string): string {
        return `<span class="${className} w-4 h-4 m-0 opacity-100 bg-none bg-transparent"><svg class="w-4 h-4" viewBox="0 0 16 16"><circle class="path" cx="8" cy="8" r="7" fill="none" transform="rotate(-90 8 8)" stroke="#fff1a5" stroke-opacity="1" stroke-width="2px"></circle><circle cx="8" cy="8" r="3" fill="none" stroke-width="2px" stroke="#ffffff"></circle></svg></span>`;
      }
    },
    on: {
      slideChange: function (): void {
        const e = this.realIndex;
        const s = this.slides[e];
        s.classList.add('vv-slide-played');
      }
    }
  });
}



}
