/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fetchApi.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:30 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/24 14:18:30 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export function fetchApi<T>(
	url: string,
	method: string,
	body?: Object
): Promise<T> {
	if (body) {
		const bodyStrings = [];
		for (const [key, value] of Object.entries(body)) {
			bodyStrings.push(
				encodeURIComponent(key) + "=" + encodeURIComponent(value)
			);
		}
		const bodyString = bodyStrings.join("&");

		return fetch(url, {
			method: method,
			headers: {
				"Content-Type":
					"application/x-www-form-urlencoded;charset=UTF-8",
			},
			body: bodyString,
		})
			.then((response) => response.json())
			.catch((response) => {
				throw new Error(response.statusText);
			});
	} else {
		return fetch(url, {
			method: method,
			headers: {
				"Content-Type":
					"application/x-www-form-urlencoded;charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.catch((response) => {
				throw new Error(response.statusText);
			});
	}
}
