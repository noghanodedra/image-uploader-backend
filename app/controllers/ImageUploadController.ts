import { Request, Response } from "express";
import { ImageUploadService } from "services/ImageUploadService";
import { Container } from "typedi";
import { FileExtension, ImageDetails } from "models/ImageDetails";
import { ValidationError } from "helpers/ValidationError";

const mime = require("mime-types");
const HttpStatus = require("http-status-codes");

export default class ImageUploadController {
  async create(req: Request, res: Response) {
    try {
      console.log(req.body);
            console.log(req["files"]);
    
      const imageUploadServiceInstance = Container.get(ImageUploadService);
      const file = req["files"].file;
      const imageDetails: ImageDetails = <ImageDetails>{
        name: file.name,
        description: req.body.description,
        size: file.size,
        type: FileExtension[mime.extension(file.mimetype).toUpperCase()],
      };
      const location = await imageUploadServiceInstance.upload(
        imageDetails,
        file
      );
      return res
        .status(HttpStatus.CREATED)
        .set("Location", location)
        .json({ "Location":location });
        //.send(location);
    } catch (err) {
      if(err instanceof ValidationError) {
        res.status(HttpStatus.BAD_REQUEST).send(err);
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
    }
  }
}
