import {
  createSelector,
} from 'reselect';


const getImages = state => state.images.results;
const getCurrentUser = state => state.auth.currentUser;


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
