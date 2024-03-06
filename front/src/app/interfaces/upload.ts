/**
 * @author: badr
 */

interface UploadEvent {
    originalEvent: Event;
    files: Files[];
}

export interface Files {
    id?: string;
    where?: string;
}