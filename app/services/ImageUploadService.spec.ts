import { ImageUploadService } from "./ImageUploadService";
import { ImageDetails } from "../models/ImageDetails";

describe("ImageUploadService", () => {
  jest.mock("./ImageUploadService");
  const MockedImageUploadService = <jest.Mock<ImageUploadService>>(
    ImageUploadService
  );
  const mockedImageUploadService = <jest.Mocked<ImageUploadService>>(
    new MockedImageUploadService()
  );


  it("should call upload", () => {
    const imageDetails: ImageDetails = new ImageDetails();
    //mockedImageUploadService.upload.mockResolvedValue({});
    mockedImageUploadService.upload = jest
      .fn()
      .mockResolvedValueOnce("mocked data");
   

    expect(mockedImageUploadService.upload).toHaveBeenCalled();
  });
});
