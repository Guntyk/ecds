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

export interface ContactsPhone extends Schema.Component {
  collectionName: 'components_contacts_phones';
  info: {
    displayName: 'phone';
    icon: 'phone';
  };
  attributes: {
    phoneNumber: Attribute.BigInteger &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMax<
        {
          max: '16';
        },
        string
      >;
    countryAcronym: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 2;
        maxLength: 5;
      }>;
  };
}

export interface ContactsBank extends Schema.Component {
  collectionName: 'components_contacts_banks';
  info: {
    displayName: 'Bank';
    icon: 'briefcase';
  };
  attributes: {
    recipientName: Attribute.String & Attribute.Required;
    recipientCode: Attribute.BigInteger & Attribute.Required;
    iban: Attribute.String & Attribute.Required;
    bankName: Attribute.String & Attribute.Required;
  };
}

export interface ContactsAddress extends Schema.Component {
  collectionName: 'components_contacts_addresses';
  info: {
    displayName: 'Address';
    icon: 'pinMap';
  };
  attributes: {
    address: Attribute.String & Attribute.Required;
    link: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'socials.socials': SocialsSocials;
      'socials.logos': SocialsLogos;
      'contacts.phone': ContactsPhone;
      'contacts.bank': ContactsBank;
      'contacts.address': ContactsAddress;
    }
  }
}
