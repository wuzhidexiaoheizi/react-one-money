import update from 'react-addons-update';

const initialState = {
  signupNumber: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
  case 'SIGNUP_NUMBER_FETCHED':
    const number = action.count;

    return update(state, {
      signupNumber: { $set: number }
    });
  default: return state;
  }
}
