module.exports = {
    GetCurrentWeatherByCity: {
        operationId: "GetCurrentWeatherByCity",
        description: "Get the current weather in the specified city.",
        path: "/weather/current",
		method: "get",
		// HACK FOR NOW UNTIL AXWAY REQUESTER UPDATED
        uri: `http://${(process.env.WEATHER_HOST || 'localhost')}:${parseInt(process.env.WEATHER_PORT) || 8080}/api/weather/current`,
        parameters: {
            query: [
                {
                    "in": "query",
                    name: "city",
                    type: "string",
                    description: "The city to query the weather for.",
                    required: true
                },
                {
                    "in": "query",
                    name: "country",
                    type: "string",
                    description: "The country the city is in."
                },
                {
                    "in": "query",
                    name: "units",
                    type: "string",
                    "enum": [
                        "metric",
                        "imperial"
                    ],
                    description: "The units to use [metric|imperial]. Default: metric"
                }
            ],
            header: [],
            path: [],
            formData: [],
            body: []
        },
        responses: {
            "200": {
                description: "Success.",
                schemaName: "schema.weather-service_weather",
                properties: {
                    city: {
                        type: "string"
                    },
                    country: {
                        type: "string"
                    },
                    summary: {
                        type: "string"
                    },
                    units: {
                        description: "The units to measure in.",
                        type: "string",
                        "enum": [
                            "metric",
                            "imperial"
                        ]
                    },
                    temperature: {
                        type: "number"
                    },
                    windSpeed: {
                        type: "number"
                    }
                },
                returnType: "Item"
            },
            "400": {
                description: "Bad Request"
            },
            "401": {
                description: "Authorization Required"
            },
            "500": {
                description: "Server Error"
            }
        },
        outputContentType: [
            "application/json"
        ],
        securityDefinitions: {
            basicAuth: {
                type: "basic",
                description: "Require authorized access to API"
            }
        }
    }
}