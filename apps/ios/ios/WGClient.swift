import OpenAPIURLSession

public struct WGClient {
    public static let shared = WGClient()

    public init() {}

    public func getCountries() async throws -> Operations.Countries.Output.Ok.Body.jsonPayload.dataPayload? {
        let client = Client(
            serverURL: try Servers.server1(),
            transport: URLSessionTransport()
        )
        let response = try await client.Countries()
        switch response {
        case .ok(let okResponse):
            switch okResponse.body {
            case .json(let data):
                return data.data
            }
        case .undocumented(statusCode: let statusCode, _):
            return nil
        case .badRequest:
            return nil
        }
    }
}
