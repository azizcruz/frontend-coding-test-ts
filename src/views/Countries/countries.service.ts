import { Country, ListCountry } from "./countries.types";

const url = "https://countries.trevorblades.com/";

export async function fetchCountries(): Promise<ListCountry[]> {
  const query = `
    query {
        countries {
            code
            name
            emoji 
          }
    }
    `;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.countries;
  } catch (error) {
    throw new Error("Failed to fetch countries", { cause: error });
  }
}

export async function fetchCountryByCode(
  code: string,
): Promise<Country | null> {
  const query = `
    query {
      countries(filter: {
        code: {eq: "${code}"}
      }) {
        code
        name
        emoji 
        awsRegion
        capital
        continent {
          code
          name
        }
        currencies
        currency
        languages {
          name
        }
        native
        phone
        subdivisions {
          code
        }
      }
    }
    `;

  console.log(query);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.countries.length > 0 ? data.data.countries[0] : null;
  } catch (error) {
    throw new Error("Failed to fetch countries", { cause: error });
  }
}
