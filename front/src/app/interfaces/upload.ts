interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

export interface File {
    id?: string;
    where?: string;
}