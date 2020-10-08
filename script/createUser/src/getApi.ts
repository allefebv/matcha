/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   getApi.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 18:41:30 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/08 18:57:48 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HOW_MANY_CREATE_USER } from './const';

export function getApiRandonUser() {
	return new Promise((resolve, rejects) => {
		var request = new XMLHttpRequest();
		request.open(
			"GET",
			`https://randomuser.me/api/?results=${HOW_MANY_CREATE_USER}&nat=fr`,
			true
		);

		request.onload = function () {
			if (request.status == 200) {
				var data = JSON.parse(request.responseText);
				resolve(data);
			} else if (request.status <= 500) {
				var data = JSON.parse(request.responseText);
				rejects(null);
			} else {
				rejects(null);
			}
		};

		request.onerror = function () {
			console.log("unable to connect to server");
		};

		request.send(); // make the request
	});
}

export function getApiLocationUser(param: string) {
	return new Promise((resolve, rejects) => {
		var apikey = "5f0e806a6b4a4703995ff9cedc0fe65e";
		var api_url = "https://api.opencagedata.com/geocode/v1/json";
		var request_url =
			api_url +
			"?" +
			"key=" +
			apikey +
			"&q=" +
			encodeURIComponent(param) +
			"&pretty=1" +
			"&no_annotations=1";

		var request = new XMLHttpRequest();
		request.open("GET", request_url, true);

		request.onload = function () {
			if (request.status == 200) {
				var data = JSON.parse(request.responseText);
				resolve(data);
			} else if (request.status <= 500) {
				var data = JSON.parse(request.responseText);
				rejects(null);
			} else {
				rejects(null);
			}
		};

		request.onerror = function () {
			console.log("unable to connect to server");
		};

		request.send();
	});
}
