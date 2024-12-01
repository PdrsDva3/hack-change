/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TaxService {
	/**
	 * See
	 * @returns any Successful Response
	 * @throws ApiError
	 */
	public static seeTaxSeePost(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/tax/see',
		});
	}
	/**
	 * See
	 * @returns any Successful Response
	 * @throws ApiError
	 */
	public static seeTaxGivePost(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/tax/give',
		});
	}
}
