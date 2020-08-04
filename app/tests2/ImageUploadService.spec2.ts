import { ImageUploadService } from "../services/ImageUploadService";
import { ImageDetails } from "../models/ImageDetails";

describe("ImageUploadService", () => {
  jest.mock("../services/ImageUploadService");
  const MockedImageUploadService = <jest.Mock<ImageUploadService>>(
    ImageUploadService
  );
  const mockedImageUploadService = <jest.Mocked<ImageUploadService>>(
    new MockedImageUploadService()
  );
    
  it("should send emails", () => {
    const imageDetails:ImageDetails = new ImageDetails();
    const b = new Blob(["foobarbazetcetc"], { type: "text/plain" });
    const f = new File( [b], "test.txt");
    mockedImageUploadService.create.mockResolvedValue("success");
    expect(mockedImageUploadService.create).toHaveBeenCalled();

  });
});
