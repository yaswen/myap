let index = localStorage.getItem('playIndex');//读取本地存的playIndex
const initialState = index ? Number(index) : 0;//如果没有的话,设为0

const playIndex = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PLAY_INDEX':
      index = action.data;
      localStorage.setItem('playIndex', index);
      return index;
    case 'CLEAR_PLAY_INDEX':
      localStorage.setItem('playIndex', '');
      return 0;
    default:
      return state;
  }
};

export default playIndex;
