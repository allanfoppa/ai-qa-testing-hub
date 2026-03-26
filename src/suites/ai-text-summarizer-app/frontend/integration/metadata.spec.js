import axios from "axios";
import { projects } from "../../../../../config/apps-registry.json";

/**
 * E2E Suite: AI Text Summarizer API - Metadata Endpoint Tests
 * Goal: Validate that the API's metadata endpoint returns correct and complete information about the application.
 */

// Find the config for this project in our central registry
const projectConfigBackend = projects.find(
  (p) => p.id === "ai-text-summarizer-backend",
);

const projectConfig = projects.find(
  (p) => p.id === "ai-text-summarizer-frontend",
);

// Frontend E2E test suite for Metadata API Integration
describe("Metadata API Integration", () => {
  let apiClient;

  beforeAll(() => {
    const apiUrl = projectConfigBackend?.baseUrl || "http://localhost:3001";
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
