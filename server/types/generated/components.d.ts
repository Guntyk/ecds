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

export interface ServicesTag extends Schema.Component {
  collectionName: 'components_services_tags';
  info: {
    displayName: 'Tag';
  };
  attributes: {
    tag: Attribute.String & Attribute.Required;
  };
}

export interface ServicesRegistration extends Schema.Component {
  collectionName: 'components_services_registrations';
  info: {
    displayName: 'Registration';
  };
  attributes: {
    accept: Attribute.Boolean;
    url: Attribute.String;
    endDate: Attribute.Date;
  };
}

export interface ServicesDepartment extends Schema.Component {
  collectionName: 'components_services_departments';
  info: {
    displayName: 'Department';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    startTime: Attribute.DateTime & Attribute.Required;
    categories: Attribute.Component<'services.category', true> &
      Attribute.Required;
  };
}

export interface ServicesCategory extends Schema.Component {
  collectionName: 'components_services_categories';
  info: {
    displayName: 'Category';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    class: Attribute.Enumeration<['F', 'E', 'D', 'C', 'B', 'A', 'S', 'Pro']> &
      Attribute.Required;
    program: Attribute.Enumeration<['Standart', 'Latin']> & Attribute.Required;
    entries: Attribute.BigInteger &
      Attribute.SetMinMax<
        {
          min: '0';
        },
        string
      > &
      Attribute.DefaultTo<'0'>;
  };
}

export interface ServicesAddress extends Schema.Component {
  collectionName: 'components_services_addresses';
  info: {
    displayName: 'address';
    description: '';
  };
  attributes: {
    address: Attribute.String;
    mapUrl: Attribute.String;
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
      'services.tag': ServicesTag;
      'services.registration': ServicesRegistration;
      'services.department': ServicesDepartment;
      'services.category': ServicesCategory;
      'services.address': ServicesAddress;
      'contacts.phone': ContactsPhone;
      'contacts.bank': ContactsBank;
      'contacts.address': ContactsAddress;
    }
  }
}
