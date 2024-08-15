export const formConfig = [
  {
    name: 'name',
    placeholder: 'Search by Name/Surname',
  },
  {
    zIndex: 2,
    name: 'country',
    placeholder: 'Country',
    options: ['Bulgaria', 'Estonia', 'Georgia', 'Greece', 'Ukraine'],
  },
  {
    zIndex: 1,
    name: 'class',
    placeholder: 'Class',
    options: ['F', 'E', 'D', 'C', 'B', 'A', 'S', 'G', 'J', 'K', 'L', 'Q', 'W'],
  },
];

export const initialState = {
  name: '',
  country: '',
  class: '',
};
