export async function waitForResponse(
  response: string
): Promise<{ message: unknown; origin: string }> {
  return new Promise<{ message: unknown; origin: string }>(
    (resolve, reject) => {
      const eventType = "message";
      const listener = (event: MessageEvent | undefined) => {
        try {
          if (event?.data?.type === response) {
            // Ensure the listener won't be called again. Do not use "once" option because some other message could be received in the meanwhile
            window.removeEventListener(eventType, listener);
            resolve({ message: event.data.message, origin: event.origin });
          }
        } catch (e) {
          reject(e);
        }
      };
      window.addEventListener(eventType, listener);
    }
  );
}
