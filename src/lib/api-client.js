export class ApiError extends Error {
  constructor(message, { status, cause } = {}) {
    super(message, { cause });
    this.name = "ApiError";
    this.status = status;
  }
}

export async function requestApi(path) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!baseUrl) {
    throw new ApiError("API base URL is not configured.");
  }

  let url;

  try {
    url = new URL(path.replace(/^\/+/, ""), `${baseUrl.replace(/\/+$/, "")}/`);
  } catch (cause) {
    throw new ApiError("API base URL is invalid.", { cause });
  }

  let response;

  try {
    response = await fetch(url, { next: { revalidate: 300 } });
  } catch (cause) {
    throw new ApiError("The API could not be reached.", { cause });
  }

  let data;

  try {
    data = await response.json();
  } catch (cause) {
    throw new ApiError("The API returned invalid JSON.", {
      status: response.status,
      cause,
    });
  }

  if (!response.ok) {
    throw new ApiError("The API request failed.", { status: response.status });
  }

  return data;
}
