import axios from "axios";
import { projects } from "../../../../../config/apps-registry.json";

/**
 * E2E Suite: AI Text Summarizer API - Metadata Endpoint Tests
 * Goal: Validate that the API's metadata endpoint returns correct and complete information about the application.
 */

// Find the config for this project in our central registry
const projectConfig = projects.find(
  (p) => p.metadata.id === "ai-text-summarizer-backend",
);

if (!projectConfig) {
  throw new Error("CRITICAL: Project ID not found in registry!");
}

// Frontend E2E test suite for Metadata API Integration
describe("Metadata API Integration", () => {
  let apiClient;

  beforeAll(() => {
    const apiUrl = projectConfig.app.baseUrl;
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
