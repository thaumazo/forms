export default function valueReducer(state = null, {/*name,*/ type, payload}) {
  switch (type) {
    case 'set':
      return {
        ...state,
        changed: false, 
        form: payload,
      }
    case 'set-changed':
      return {
        ...state,
        changed: payload,
      }
    case 'delete': {
      return {};
    }
    case 'set-field': {
      if (state.form[payload.name] === payload.value) {
        return state;
      }

      return {
        changed: true,
        form: {
          ...state.form,
          [payload.name]: payload.value,
        }
      }
    }
    default:
      return state
  }
}
