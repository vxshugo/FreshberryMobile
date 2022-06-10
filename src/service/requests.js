import axios from "axios";import {useContext} from "react";import WatchlistContext from "../Contexts/WatchlistContext";export const getDetailedCoinData = async (coinId) => {    try {        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`)        return response.data;    } catch (e) {        console.log(e);    }}export const getCoinMarketChart = async (coinId, selectedRange, currency) => {    try {        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${selectedRange}&interval=hourly`)        return response.data;    } catch (e) {        console.log(e)    }}export const getMarketData = async (pageNumber = 1, currency) => {    try {        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`)        return response.data;    } catch (e) {        console.log(e)    }}export const getWatchlistedCoins = async (pageNumber = 1, coinIds, currency) => {    try {        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`);        return response.data;    } catch (e) {        console.log(e);    }}export const getWatchlistedCoinsPortfolio = async (pageNumber = 1, coinIds) => {    try {        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`);        return response.data;    } catch (e) {        console.log(e);    }}export const getAllCoins = async () => {    try {        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`)        return response.data;    } catch (e) {        console.error(e);    }}export const getNews = async (lang) => {    try {        const res = await axios.get(`https://newsapi.org/v2/top-headlines?category=technology&country=${lang}&apiKey=108f43f3374649119e8b292c26631643`)        return res.data    }catch (e) {        console.log(e)    }}