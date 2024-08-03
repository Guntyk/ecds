import styles from 'components/Banners/Banners.scss';

const pagination = {
  bulletActiveClass: styles.bulletActive,
  bulletClass: styles.bullet,
  el: '#pagination',
  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + '</span>';
  },
};

export const sliderSettings = {
  pagination: pagination,
  navigation: { nextEl: '#next', prevEl: '#prev' },
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  effect: 'fade',
};
