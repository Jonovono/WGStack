import { createClient } from "generated-wundergraph";

const client = createClient();

export default async function Countries() {
  const countries = await client.query({
    operationName: "Countries",
  });

  if (!countries) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Countries List</h1>
      <ul>
        {countries.data?.countries_countries.map((country) => (
          <li key={country.code}>
            {country.name} - Capital: {country.capital || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
