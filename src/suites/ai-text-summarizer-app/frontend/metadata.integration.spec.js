import axios from "axios";

// Frontend E2E test suite for Metadata API Integration
describe("Metadata API Integration", () => {
  let apiClient;

  beforeAll(() => {
    const apiUrl = "http://localhost:3000/";
    apiClient = axios.create({
      baseURL: apiUrl,
      timeout: 5000,
    });
  });

  describe("Metadata Endpoint", () => {
    it("should fetch metadata from the API", async () => {
      const response = await apiClient.get("/");

      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid endpoints gracefully", async () => {
      try {
        await apiClient.get("/invalid-endpoint");
      } catch (error) {
        expect(error.response.status).not.toBe(200);
      }
    });
  });
});
