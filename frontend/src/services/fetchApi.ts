/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fetchApi.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:30 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/11 14:49:21 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

interface fetchArgs {
	method: string;
	headers?: {
		"Content-Type"?: string;
		[propname: string]: any;
	};
	body?: Object;
	credentials?: "include" | "omit" | "same-origin" | undefined;
}

const TIMEOUT = 5000;

export function fetchApi<T>(url: string, args: fetchArgs): Promise<T> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error("timeout"));
		}, TIMEOUT);

		if (
			args.body &&
			args.headers &&
			args.headers["Content-Type"] &&
			args.headers["Content-Type"] === "application/json"
		) {
			args.body = JSON.stringify(args.body);
		}

		fetch(url, args as RequestInit)
			.then(async (response) => {
				if (!response.ok) {
					let text = await response.text();
					if (text.length > 0) {
						reject(new Error(text));
					}
					reject(new Error(response.statusText));
				}
				return response;
			})
			.then((response) => {
				const contentType = response.headers.get("content-type");
				if (contentType && contentType.indexOf("application/json") !== -1) {
					resolve(response.json());
				} else {
					resolve();
				}
			});
	});
}
