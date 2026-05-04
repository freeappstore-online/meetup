import { createClient } from "@freeappstore/sdk";

export const fas = createClient("https://api.freeappstore.online");

// Check for OAuth redirect token on load
fas.auth.handleRedirect();
