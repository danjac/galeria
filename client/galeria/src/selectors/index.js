import {
  createSelector,
} from 'reselect';


export const getCurrentUser = state => state.auth.currentUser;

export const getImages = state => {
  return state.images.results.filter(image => !(state.images.deleted.includes(image.id)));
};

export const getImagesWithOwnership = createSelector(
  [getImages, getCurrentUser],
  (images, user) => {
    return images.map(image => {
      const isOwner = user && user.id === image.user;
      return Object.assign({}, image, {
        isOwner,
      });
    });
  });
