// **Sample code for creating a client to interact with generated code**

import axios from "axios";
import { BASE_URL } from "@env";

import {
  UserApi,
  Configuration,
  DefaultApi,
  POIApi,
  SourcingApi,
} from "../generated";

const config = new Configuration();
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
const baseUrl = BASE_URL;

const userApi = new UserApi(config, baseUrl, axiosInstance);
const poiApi = new POIApi(config, baseUrl, axiosInstance);
const sourcingApi = new SourcingApi(config, baseUrl, axiosInstance);
const defaultApi = new DefaultApi(config, baseUrl, axiosInstance);

export { userApi, poiApi, sourcingApi, defaultApi };
