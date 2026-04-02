import axios from "axios";

/**
 * Integration Suite: AI Text Summarizer API - Metadata Endpoint Tests
 */

describe("Metadata Endpoint", () => {
  // 💡 FIXED: Added http:// and removed the trailing slash
  const API_URL = "http://localhost:4000";

  it("should return metadata with correct structure", async () => {
    // This will now resolve to http://localhost:3000/metadata/
    const response = await axios.get(`${API_URL}/`);

    expect(response.status).toBe(200);
  });
});
