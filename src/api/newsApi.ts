import axios from "axios";

const API_KEYS = {
  // In real world api keys has to be stored in backend proxy or server-side storage.
  newsapi: "bc7fc39867c74c0fbfd4681fedea15da",
  guardian: "test",
  nyt: "AS20J08OzjCiKADo8utkbdNcnoLVnxbw",
};

const NEWS_API = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEYS.newsapi}`;
const GUARDIAN_API = `https://content.guardianapis.com/search?api-key=${API_KEYS.guardian}&show-fields=thumbnail`;
const NY_TIMES_API = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEYS.nyt}`;

export class NewsApi {
  static getNews() {
    return axios.get(NEWS_API);
  }
  static getGuardian() {
    return axios.get(GUARDIAN_API);
  }
  static getNewyorkTimes() {
    return axios.get(NY_TIMES_API);
  }
}
