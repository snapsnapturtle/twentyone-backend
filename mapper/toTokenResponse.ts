import { Token } from '../models/Token';

export function toTokenResponse(entity: Token) {
    return {
        id: entity.id,
        x: entity.position_x,
        y: entity.position_y
    };
}
