const URL = "http://localhost:9991/operations";
const fs = require("fs");

// Path to the original OpenAPI schema file
const originalSchemaPath = "./apps/api/generated/wundergraph.openapi.json";

// Path where the updated schema will be saved
const updatedSchemaPath = "./apps/web/public/openapi.json";

// Additional path where the updated schema will also be saved
const iosSchemaPath = "./apps/ios/openapi.json";

// Read the original schema file
fs.readFile(originalSchemaPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the JSON data
  let schema = JSON.parse(data);

  // Update the URL
  if (schema.servers && schema.servers.length > 0) {
    schema.servers[0].url = URL;
  }

  // Write the updated schema to a new file and then copy it to the iOS directory
  fs.writeFile(
    updatedSchemaPath,
    JSON.stringify(schema, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing the updated file:", err);
        return;
      }
      console.log("Updated schema saved to:", updatedSchemaPath);

      // Copy the file to the iOS directory
      fs.copyFile(updatedSchemaPath, iosSchemaPath, (err) => {
        if (err) {
          console.error("Error copying the file to iOS directory:", err);
          return;
        }
        console.log("File also copied to:", iosSchemaPath);
      });
    }
  );
});
