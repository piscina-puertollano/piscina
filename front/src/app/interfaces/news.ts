
/**
 * @author: badr
 */

export interface News {
    id:        number;
    title:     string;
    category:  string;
    body:      string;
    author:    Author;
    new_image: NewImage;
    main_image?: number;
    visit_counter?: number;
    share_counter?: number;
    likes_counter?: number;
    dislikes_counter?: number;

}

export interface PostNews {
    title?:     string;
    body?:      string;
    id_user?:    number;
    main_image?: number;
    category?:  string;
}



export interface Author {
    id:        number;
    firstName: string;
    lastName:  string;
}

export interface NewImage {
    ruta: string;
}

export interface Comment {
    id?:            number;
    id_new?:            number;
    comment?:       string;
    author_id?:     number;
    respond_to_id?: number | null;
    respond_to?: number | null;
    name_author?:   string;
    last_author?:   string;
}
