export class ApiError extends Error {
  constructor(message, { status, cause } = {}) {
    super(message, { cause });
    this.name = "ApiError";
    this.status = status;
  }
}

function createUrl(baseUrl, path) {
  let url;

  try {
    url = new URL(path.replace(/^\/+/, ""), `${baseUrl.replace(/\/+$/, "")}/`);
  } catch (cause) {
    throw new ApiError("API base URL is invalid.", { cause });
  }

  return url;
}

async function requestFromUrl(url) {
  let response;

  try {
    response = await fetch(url, {
      method: "GET",
      next: { revalidate: 300 },
    });
  } catch (cause) {
    throw new ApiError("The API could not be reached.", { cause });
  }

  if (!response.ok) {
    throw new ApiError("The API request failed.", { status: response.status });
  }

  let data;

  try {
    data = await response.json();
  } catch (cause) {
    throw new ApiError("The API returned invalid JSON.", { cause });
  }

  return data;
}

export async function requestApi(path) {
  const primaryBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!primaryBaseUrl) {
    throw new ApiError("API base URL is not configured.");
  }

  const url = createUrl(primaryBaseUrl, path);
  return requestFromUrl(url);
}
