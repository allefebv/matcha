/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fetchApi.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:30 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/25 16:04:08 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

interface fetchArgs {
	method: string;
	headers: {
		[propname: string]: any;
	};
	body?: Object;
	credentials?: "include" | "omit" | "same-origin" | undefined;
}

export function bodyObjectToString(body: Object) {
	const bodyStrings = [];
	for (const [key, value] of Object.entries(body)) {
		bodyStrings.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
	}
	return bodyStrings.join("&");
}

export function fetchApi<T>(url: string, args: fetchArgs): Promise<T> {
	if (args.body) {
		args.body = bodyObjectToString(args.body);
	}

	return fetch(url, args as RequestInit)
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
		.catch((error) => {
			throw new Error("Network error: " + error.message);
		});
}
