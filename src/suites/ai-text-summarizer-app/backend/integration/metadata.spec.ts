import axios from "axios";
import { projects } from "@config/apps-registry.json";

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
    expect(response.data).toHaveProperty("data");
    expect(response.data).toHaveProperty("message");
    expect(response.data.message).toBe("Success retrieving metadata.");
  });

  it("should return valid app metadata", async () => {
    const response = await axios.get(`${API_URL}/`);
    const { data } = response.data;

    expect(data).toHaveProperty("title", "AI Text Summarizer API");
    expect(data).toHaveProperty("summary", "API to summarize text using AI.");
    expect(data).toHaveProperty("version");
    expect(data).toHaveProperty("author");
  });

  it("should return author information with all required fields", async () => {
    const response = await axios.get(`${API_URL}/`);
    const { author } = response.data.data;

    expect(author).toHaveProperty("name", "Allan Foppa Fagundes");
    expect(author).toHaveProperty("email", "allanfoppa.dev@gmail.com");
    expect(author).toHaveProperty(
      "githubProfile",
      "https://github.com/allanfoppa",
    );
  });

  it("should not return null or undefined version", async () => {
    const response = await axios.get(`${API_URL}/`);

    expect(response.data.data.version).toBeDefined();
    expect(response.data.data.version).not.toBeNull();
  });
});
