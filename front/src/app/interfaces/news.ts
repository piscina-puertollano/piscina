export interface News {
    id:        number;
    title:     string;
    body:      string;
    author:    Author;
    new_image: NewImage;
}

export interface PostNews {
    title:     string;
    body:      string;
    id_user:    number;
    main_image: number;
}

export interface Author {
    id:        number;
    firstName: string;
    lastName:  string;
}

export interface NewImage {
    ruta: string;
}
