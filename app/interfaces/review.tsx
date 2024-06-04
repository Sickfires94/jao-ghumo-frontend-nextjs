enum place_type {
    Hotel,
    Attraction
}

interface review {
    _id: string,
    rating: number,
    description: string,
    type: place_type
    place: string,
    owner: user,
    is_deleted: boolean,
    deleted_by: string,
    deletion_time: string,
    creation_time: string,
    updated_by: string,
    updation_time: string
}