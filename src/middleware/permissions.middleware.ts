const jwtAuthz = require("express-jwt-authz");

const checkPermissions = (permissions: string | string[]) => {
  return jwtAuthz([permissions], {
    customScopeKey: "permissions",
    checkAllScopes: true,
    failWithError: true
  });
};

export default checkPermissions

// Here use a JavaScript closure to create a re-usable functional wrapper for jwtAuthz. 
// The checkPermissions helper function takes as arguments the permissions required and 
// creates a closure around that value within its body. It then returns an instance of 
// jwtAuthz, which can access the value of permissions when Express executes it. As such, 
// you only need to configure jwtAuthz in a single place, making your code much more 
// maintainable and less error-prone. You'll apply this approach to the endpoints.