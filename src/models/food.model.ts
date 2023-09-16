export type FoodModel = {
    data:       Food[];
    page:       number;
    totalPages: number;
    totalCount: number;
}

export type Food = {
    id:          number;
    designation: string;
    price:       number;
    recette:     string;
    createdAt:   Date;
    updatedAt:   Date;
}