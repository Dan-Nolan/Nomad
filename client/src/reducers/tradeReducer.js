import {CREATE} from '../actions/tradeActions';

const defaultState = {
    trades: []
}

const tradeReducer = (state = defaultState, action) => {
    const { type, trade } = action;
    switch(type) {
        case CREATE:
            const { trades } = state;
            return { trades: trades.concat(trade) }
        default:
            return state;
    }
}

export default tradeReducer;
