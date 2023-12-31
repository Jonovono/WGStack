// Code generated by wunderctl. DO NOT EDIT.

import type function_UsersGet from "../../apps/api/operations/users/get";
import type function_UsersSubscribe from "../../apps/api/operations/users/subscribe";
import type function_UsersUpdate from "../../apps/api/operations/users/update";
import type { ExtractInput, ExtractResponse } from "@wundergraph/sdk/operations";
import type { OperationErrors } from "./ts-operation-errors";
import type { GraphQLError } from "@wundergraph/sdk/client";

export interface countries_CountryFilterInput {
	code?: countries_StringQueryOperatorInput;
	continent?: countries_StringQueryOperatorInput;
	currency?: countries_StringQueryOperatorInput;
	name?: countries_StringQueryOperatorInput;
}

export interface countries_StringQueryOperatorInput {
	eq?: string;
	in?: string[];
	ne?: string;
	nin?: string[];
	regex?: string;
}

export type JSONValue = string | number | boolean | JSONObject | Array<JSONValue>;

export type JSONObject = { [key: string]: JSONValue };

export interface CountriesInput {
	filter?: countries_CountryFilterInput;
}

export type UsersGetInput = ExtractInput<typeof function_UsersGet>;

export type UsersSubscribeInput = ExtractInput<typeof function_UsersSubscribe>;

export type UsersUpdateInput = ExtractInput<typeof function_UsersUpdate>;

export interface CountriesInputInternal {
	filter?: countries_CountryFilterInput;
}

export interface UsersGetInputInternal {
	id: string;
}

export interface UsersSubscribeInputInternal {
	id: string;
}

export interface UsersUpdateInputInternal {
	id: string;
	name: string;
	bio: string;
}

export interface CountriesInputInjected {
	filter?: countries_CountryFilterInput;
}

export interface ContinentsResponse {
	data?: ContinentsResponseData;
	errors?: GraphQLError[];
}

export interface CountriesResponse {
	data?: CountriesResponseData;
	errors?: GraphQLError[];
}

export interface UsersGetResponse {
	data?: UsersGetResponseData;
	errors?: GraphQLError[];
}

export interface UsersSubscribeResponse {
	data?: UsersSubscribeResponseData;
	errors?: GraphQLError[];
}

export interface UsersUpdateResponse {
	data?: UsersUpdateResponseData;
	errors?: GraphQLError[];
}

export interface ContinentsResponseData {
	countries_continents: {
		name: string;
		code: string;
	}[];
}

export interface CountriesResponseData {
	countries_countries: {
		code: string;
		name: string;
		capital?: string;
	}[];
}

export type UsersGetResponseData = ExtractResponse<typeof function_UsersGet>;

export type UsersSubscribeResponseData = ExtractResponse<typeof function_UsersSubscribe>;

export type UsersUpdateResponseData = ExtractResponse<typeof function_UsersUpdate>;
