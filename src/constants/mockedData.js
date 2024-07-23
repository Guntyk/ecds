import photo1 from 'assets/images/ballroom-couple-red.jpg';
import photo2 from 'assets/images/kids-couple.jpg';
import photo3 from 'assets/images/pro-am-couple.jpg';

import coverPlaceholder from 'assets/images/cover-placeholder.jpg';

export const mockedNews = [
  {
    id: 1,
    title: 'Community of dancers & coaches',
    publicationDate: '2024-03-24',
    cover: { src: photo1, alt: 'ballroom couple in red' },
  },
  {
    id: 2,
    title: 'Open Tournaments',
    publicationDate: '2024-04-01',
    cover: { src: photo2, alt: 'kids couple' },
  },
  {
    id: 3,
    title: 'Dance Europe is understandable and accessible',
    publicationDate: '2024-06-20',
    cover: { src: photo3, alt: 'pro-am couple' },
  },
  {
    id: 4,
    title: 'The laws of sports are above all!',
    publicationDate: '2024-07-08',
  },
  {
    id: 5,
    title: 'Community of dancers & coaches',
    publicationDate: '2024-03-24',
    cover: { src: photo1, alt: 'ballroom couple in red' },
  },
  {
    id: 6,
    title: 'Open Tournaments',
    publicationDate: '2024-04-01',
    cover: { src: photo2, alt: 'kids couple' },
  },
  {
    id: 7,
    title: 'Dance Europe is understandable and accessible',
    publicationDate: '2024-06-20',
    cover: { src: photo3, alt: 'pro-am couple' },
  },
];

export const mockedEvents = [
  {
    id: 1,
    type: 'Tournament',
    title: 'Amazing Tallinn',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    organization: 'Organization Name',
    organizer: 'Name Surname',
    date: '2024-06-15',
    town: 'Tallinn, Estonia',
    cover: { src: coverPlaceholder, alt: 'placeholder' },
  },
  {
    id: 2,
    type: 'Cup',
    title: 'Hyper Cup of the whole world',
    description: 'Description if needed',
    organization: 'Organization Name',
    organizer: 'Name Surname',
    date: '2024-04-01',
    town: 'Kyiv, Ukraine',
    cover: { src: coverPlaceholder, alt: 'placeholder' },
  },
  {
    id: 3,
    type: 'Championship',
    title: '16th Athens dance sport open',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. The laws of sports are above all!',
    organization: 'Organization Name',
    organizer: 'Name Surname',
    date: '2024-05-29',
    town: 'Athens, Greece',
    cover: { src: coverPlaceholder, alt: 'placeholder' },
  },
];
