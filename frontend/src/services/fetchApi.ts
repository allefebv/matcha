/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fetchApi.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:30 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/08 15:11:39 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

interface fetchArgs {
	method: string;
	headers: {
		"Content-Type": string;
		[propname: string]: any;
	};
	body?: Object;
	credentials?: "include" | "omit" | "same-origin" | undefined;
}

export function fetchApi<T>(url: string, args: fetchArgs): Promise<T> {
	if (args.body && args.headers["Content-Type"] === "application/json") {
		args.body = JSON.stringify(args.body);
	}

	return fetch(url, args as RequestInit)
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response;
		})
		.then((response) => response.json())
		.catch((error) => console.log(error.message));
}
