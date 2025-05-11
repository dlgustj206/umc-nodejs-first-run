export const bodyToStore = (body, regionId) => {
    return {
        name: body.name,
        address: body.address,
        region_id: regionId
    };
};

export const responseFromStore = (store) => {
    if (!store) {
        return null;
    }

    return {
        id: store.id,
        name: store.name,
        address: store.address,
        regionId: store.region_id,
        score: store.score,
        createdAt: store.created_at,
        updatedAt: store.updated_at,
    };
};