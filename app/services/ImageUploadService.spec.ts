import { ImageUploadService } from "./ImageUploadService";
import { ImageDetails } from "../models/ImageDetails";

global.File = class MockFile {
  filename: string;
  lastModified:any;
  name:any; 
  size:any;
  type:any;
  arrayBuffer:any;
  slice:any;
  stream:any;
  text: any;
  constructor(
    parts: (string | Blob | ArrayBuffer | ArrayBufferView)[],
    filename: string,
    properties?: FilePropertyBag
  ) {
    this.filename = filename;
  }
};

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
    mockedImageUploadService.upload(imageDetails, new File([],"test.png"));
    expect(mockedImageUploadService.upload).toHaveBeenCalled();
  });
});
