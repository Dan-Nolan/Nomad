export const CREATE = "CREATE_TRADE";

export const create = (trade) => {
    return {
        type: CREATE,
        trade,
    };
};
