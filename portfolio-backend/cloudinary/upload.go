package cloudinary

import (
	"context"
	"mime/multipart"
	"os"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

func UploadToCoudinary(fileHeader *multipart.FileHeader)(string, error){
	cld, err := cloudinary.NewFromParams(
		os.Getenv("CLOUDINARY_CLOUD_NAME"),
        	os.Getenv("CLOUDINARY_API_KEY"),
        	os.Getenv("CLOUDINARY_API_SECRET"),
	)

	if err != nil{
		return "", nil
	}

	file, err := fileHeader.Open()
	if err != nil{
		return "", err
	}

	defer file.Close()

	uploadResult, err := cld.Upload.Upload(context.Background(), file, uploader.UploadParams{})
	if err != nil{
		return "", err
	}

	return uploadResult.SecureURL, nil
}