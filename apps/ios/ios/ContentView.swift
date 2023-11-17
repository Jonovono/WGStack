import SwiftUI

struct ContentView: View {
    @State private var countries: Operations.Countries.Output.Ok.Body.jsonPayload.dataPayload.countries_countriesPayload?

    var body: some View {
        NavigationView {
            Group {
                if let countries = countries {
                    List(countries, id: \.self) { country in
                        VStack(alignment: .leading) {
                            Text(country.name)
                                .font(.headline)
                            if let capital = country.capital {
                                Text("Capital: \(capital)")
                                    .font(.subheadline)
                            }
                            Text("Code: \(country.code)")
                                .font(.subheadline)
                        }
                    }
                } else {
                    Text("Sorry, no countries")
                }
            }
            .navigationBarTitle("Countries")
            .onAppear {
                Task {
                    try await loadCountries()
                }
            }
        }
    }

    func loadCountries() async throws {
        // Invoke your API call here and update the 'countries' array
        // For example:
        if let responseCountries = try await WGClient.shared.getCountries() {
            countries = responseCountries.countries_countries
        }
    }
}

#Preview {
    ContentView()
}
