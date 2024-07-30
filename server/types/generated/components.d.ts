import type { Schema, Attribute } from '@strapi/strapi';

export interface SocialsSocials extends Schema.Component {
  collectionName: 'components_socials_socials';
  info: {
    displayName: 'socials';
    icon: 'envelop';
    description: '';
  };
  attributes: {
    url: Attribute.String;
  };
}

export interface SocialsLogos extends Schema.Component {
  collectionName: 'components_socials_logos';
  info: {
    displayName: 'Logo';
    description: '';
  };
  attributes: {
    images: Attribute.Media<'images', true> & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'socials.socials': SocialsSocials;
      'socials.logos': SocialsLogos;
    }
  }
}
