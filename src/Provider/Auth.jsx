export function isAuthenticated() {
  const userTokensJSON = localStorage.getItem("userTokens");
  const userTokens = JSON.parse(userTokensJSON);
  const userEmail = userTokens ? userTokens?.email : undefined;
  return !!localStorage.getItem(userEmail);
}
