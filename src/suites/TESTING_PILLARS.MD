# Testing Pillars for Integration & E2E Systems

## Correctness → “Is the system doing the right thing?”

### What it means

You validate that the output is correct for a given input.

### Example (your hub)

```js
const res = await fetch("/summarize", { text: "long text..." });

expect(res.summary).toContain("main idea");
expect(res.length).toBeLessThan(200);
```

### Why it matters

- Prevents regressions
- Ensures business logic still works
- Critical for AI systems (output quality)
- Without correctness, everything else is useless.

### Why is powerfull

- Anwsers this question below.
  - Did the system produce the right result?

---

## Contracts → “Is the agreement between systems respected?”

### What it means

You verify that:

- Request format is correct
- Response structure is stable
- Types don’t break

### Example

```js
expect(res).toMatchObject({
  summary: expect.any(String),
  tokensUsed: expect.any(Number),
});
```

Or stricter:

```js
expect(res).toStrictEqual({
  summary: "string",
  tokensUsed: 123,
});
```

### Why it matters

In distributed systems:

- Frontend depends on backend
- Backend depends on APIs

Note: And Contracts prevent silent breaking changes

### Why is powefull

- Frontend depends on backend:
  - change field names
  - change types (string → number)
  - change nullability
  - change structure (nested vs flat)
- Backend depends on APIs:
  - change status codes
  - change error formats
  - change authentication requirements
  - change rate limits / quotas

---

## Behavior → “Does the system behave correctly in real scenarios?”

### What it means

You test flows, not just isolated calls.

### Example (Playwright/Cypress style)

On frontend (written code)

1. User types text
2. Clicks "Summarize"
3. Waits for response
4. UI updates with result

On backend (implicitly):

1. Send text
2. System validates
3. Calls AI provider
4. Stores result
5. Returns response

So what we want to validate is:

1. Frontend sent correct request ✔
2. Backend received it ✔
3. Backend validated input ✔
4. Backend called AI provider ✔
5. Backend processed response ✔
6. Backend returned correct format ✔
7. Frontend rendered correctly ✔

### 💡 Why it matters

- Captures real-world usage
- Detects integration issues
- Validates orchestration

Behavior is where most production bugs live.

---

## ⚖️ How they differ (simple mental model)

| Pillar      | Focus            | Scope             | Example                |
| ----------- | ---------------- | ----------------- | ---------------------- |
| Correctness | Output accuracy  | Single response   | “Is summary valid?”    |
| Contracts   | Data structure   | System boundaries | “Did API change?”      |
| Behavior    | User/system flow | End-to-end        | “Does full flow work?” |

---

So the hub respond this:

> “Does the system still work correctly in real life?”
