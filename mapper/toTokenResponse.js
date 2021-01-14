function toTokenResponse(entity) {
    return {
        id: entity.id,
        x: entity.position_x,
        y: entity.position_y
    };
}

module.exports = {
    toTokenResponse
};
