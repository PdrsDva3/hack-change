/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_add_line_line_add_line_post } from '../models/Body_add_line_line_add_line_post';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LineService {
	/**
	 * Add Line
	 * @param formData
	 * @returns any Successful Response
	 * @throws ApiError
	 */
	public static addLineLineAddLinePost(
		formData: Body_add_line_line_add_line_post,
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/line/add_line',
			formData: formData,
			mediaType: 'multipart/form-data',
			errors: {
				422: `Validation Error`,
			},
		});
	}
	/**
	 * Get All Lines
	 * @returns any Successful Response
	 * @throws ApiError
	 */
	public static getAllLinesLineAllGet(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/line/all',
		});
	}
}
