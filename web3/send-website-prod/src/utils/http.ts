// api.js

import axios from 'axios';

// Set the base URL for your API server
// const baseURL = 'http://147.182.251.92:3000';
const baseURL = '';

// Create an instance of Axios with custom configurations
const instance = axios.create({
  baseURL,
  timeout: 10000, // You can adjust this value as needed
});

// Function to make GET requests
export const get = async (url:string) => {
  try {
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    // You can handle errors here
    throw error;
  }
};

// Function to make POST requests
export const post = async (url:string, data:any) => {
  try {
    const response = await instance.post(url, data);
    return response.data;
  } catch (error) {
    // You can handle errors here
    throw error;
  }
};
