const API_URL = "https://tree-suggestion-api.deno.dev";


type ActionState<TOutput> = {
  error?: string | null;
  data?: TOutput;
};

export const getAutoCompleteResults = async (
  filter: string,
  signal: AbortSignal
): Promise<ActionState<string[]>> => {
  try {
    // Uncomment to fake delayed response
    // await new Promise((resolve) => setTimeout(resolve, 1500))
    const res = await fetch(`${API_URL}/?filter=${filter}`, { signal });
    const json = await res.json();

    if (res.ok) {
      return {
        data: json,
      };
    } 

    throw new Error(json.message);

  } catch (e) {
    const error = e as Error
    return {
      error: formatError(error),
    };
  }
};


const formatError = (e: Error) => {
  // do not want to show AboutErrors in the UI
  let error = null
  if (e.name !== "AbortError") {
    error = e.message || "An error occurred"
  }
  return error
}
