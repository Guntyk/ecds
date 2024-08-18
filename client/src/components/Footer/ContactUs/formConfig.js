export const formConfig = [
  {
    name: 'name',
    placeholder: 'Name',
  },
  {
    name: 'email',
    placeholder: 'e-mail',
    pattern: '^\\S+@\\S+\\.\\S+$',
  },
  {
    name: 'comment',
    placeholder: 'Comment',
    textarea: true,
  },
];

export const initialState = {
  name: '',
  email: '',
  comment: '',
};
