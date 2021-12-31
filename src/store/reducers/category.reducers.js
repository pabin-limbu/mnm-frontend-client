import { categoryConstant } from "../actions/constants";

const initState = {
  categoriesList: [],
  categories: [],
  featuredcategories: [],
  loading: false,
  error: null,
  test: "",
};

const buildNewCategory = (parentId, categories, category) => {
  //check if caegory is parent itself. where parentId is udefined
  if (parentId == undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ];
  }

  let myCategories = [];
  for (let cat of categories) {
    //compare parent id with parent category.
    if (cat._id == parentId) {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategory(
              parentId,
              [
                ...cat.children,
                {
                  _id: category._id,
                  name: category.name,
                  slug: category.slug,
                  parentId: category.parentId,
                  children: category.children,
                },
              ],
              category
            )
          : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategory(parentId, cat.children, category)
          : [],
      });
    }
  }
  return myCategories; //treversig list.
};

const filterFeaturedCategories = (categories) => {
  const featuredCategories = categories.filter((cat) => cat.isfeatured == true);

  return featuredCategories;
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstant.GET_ALL_CATEGORY_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;

    case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
      state = { ...state, loading: true };
      break;
    case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
      const catrgory = action.payload.category;
      //unupdated categoory

      //we are sending parent id --> current category List and newly added category.
      const updatedCategories = buildNewCategory(
        catrgory.parentId,
        state.categories,
        catrgory
      );
      //console.log(updatedCategories);
      state = {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
      break;
    case categoryConstant.ADD_NEW_CATEGORY_FAILURE:
      state = { ...initState };
      break;

    case categoryConstant.GET_ALL_CATEGORYLIST_SUCCESS:
      state = {
        ...state,
        categoriesList: action.payload.categories,
        featuredcategories: filterFeaturedCategories(action.payload.categories),
      };
  }
  return state;
};
