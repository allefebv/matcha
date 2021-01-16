/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fetchApi.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:30 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/15 15:52:15 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const TIMEOUT = 5000;

export function fetchApi<T>(url: string, args: RequestInit): Promise<T> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error("timeout"));
		}, TIMEOUT);

		fetch(url, args)
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
				if (
					response.headers.get("content-type")?.indexOf("application/json") !==
					-1
				) {
					resolve(response.json());
				}
			})
			.catch(() => reject(new Error("canceled")));
	});
}
