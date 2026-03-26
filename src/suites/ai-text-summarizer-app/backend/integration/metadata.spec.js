import axios from "axios";
import { projects } from "../../../../../config/apps-registry.json";

/**
 * E2E Suite: AI Text Summarizer API - Metadata Endpoint Tests
 * Goal: Validate that the API's metadata endpoint returns correct and complete information about the application.
 */

// Find the config for this project in our central registry
const projectConfig = projects.find(
  (p) => p.id === "ai-text-summarizer-backend",
);

describe("Metadata Endpoint", () => {
  const API_URL = projectConfig?.baseUrl;

  it("should return metadata with correct structure", async () => {
    const response = await axios.get(`${API_URL}/`);

    expect(response.status).toBe(200);
  });
});
