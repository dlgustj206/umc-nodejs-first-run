import { responseFromReview } from "../dtos/review.dto.js";
import { responseFromStore } from "../dtos/store.dto.js";
import { addStore, getStoreById } from "../repositories/store.repository.js";

export const addNewStore = async (storeData) => {
    const storeId = await addStore(storeData);
    const store = await getStoreById(storeId);

    return responseFromStore(store);
};

export const listStoreReviews = async (storeId, cursor = 0) => {
    const reviews = await getAllStoreReviews(storeId, cursor);
    return responseFromReview(reviews);
}