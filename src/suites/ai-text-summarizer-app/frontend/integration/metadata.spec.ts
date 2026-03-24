import axios, { AxiosInstance } from "axios";
import { projects } from "@config/apps-registry.json";

/**
 * E2E Suite: AI Text Summarizer API - Metadata Endpoint Tests
 * Goal: Validate that the API's metadata endpoint returns correct and complete information about the application.
 */

// Find the config for this project in our central registry
const projectConfig = projects.find(
  (p) => p.id === "ai-text-summarizer-frontend",
);

describe("Frontend E2E - Metadata API Integration", () => {
  let apiClient: AxiosInstance;

  beforeAll(() => {
    const apiUrl = projectConfig?.baseUrl || "http://localhost:3000";
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

    it("should have correct response structure", async () => {
      const response = await apiClient.get("/");

      expect(response.data).toHaveProperty("message");
      expect(response.data).toHaveProperty("data");
    });

    it("should return API metadata with all required fields", async () => {
      const response = await apiClient.get("/");
      const { data } = response.data;

      expect(data.title).toBe("AI Text Summarizer API");
      expect(data.summary).toBe("API to summarize text using AI.");
      expect(data.version).toBeDefined();
      expect(data.author).toBeDefined();
    });

    it("should return valid author information", async () => {
      const response = await apiClient.get("/");
      const { author } = response.data.data;

      expect(author.name).toBe("Allan Foppa Fagundes");
      expect(author.email).toBe("allanfoppa.dev@gmail.com");
      expect(author.githubProfile).toBe("https://github.com/allanfoppa");
    });

    it("should have valid version format", async () => {
      const response = await apiClient.get("/");
      const { version } = response.data.data;

      expect(version).not.toBeNull();
      expect(version).not.toBeUndefined();
      expect(typeof version).toBe("string");
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid endpoints gracefully", async () => {
      try {
        await apiClient.get("/invalid-endpoint");
      } catch (error: any) {
        expect(error.response.status).not.toBe(200);
      }
    });
  });
});
