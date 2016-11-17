package com.nemesis.platform.console.admin.storefront;

import org.springframework.web.multipart.MultipartFile;

public class UploadFileData {

    private MultipartFile file;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
