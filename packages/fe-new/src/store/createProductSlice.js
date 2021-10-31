const createProductSlice = (set, get) => ({
  productList: [],
  setProductList: (list) => {
    set(() => ({ productList: list }));
  },
  updateItem: (item) => {
    const productList = get().productList;

    const index = productList.findIndex((product) => product._id === item._id);
    if (index !== -1) {
      set(() => ({
        productList: [
          ...productList.slice(0, index),
          item,
          ...productList.slice(index + 1),
        ],
      }));
    } else {
      set((state) => ({ productList: [...state.productList, item] }));
    }
  },
});

export default createProductSlice;
