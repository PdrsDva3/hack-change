/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_meme_h_meme_create_post } from '../models/Body_create_meme_h_meme_create_post';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MemeService {
	/**
	 * Create Meme H
	 * @param formData
	 * @returns any Successful Response
	 * @throws ApiError
	 */
	public static createMemeHMemeCreatePost(
		formData: Body_create_meme_h_meme_create_post,
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/meme/create',
			formData: formData,
			mediaType: 'multipart/form-data',
			errors: {
				422: `Validation Error`,
			},
		});
	}
	/**
	 * Get Memes H
	 * @returns any Successful Response
	 * @throws ApiError
	 */
	public static getMemesHMemeRandomGet(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/meme/random',
		});
	}
}
