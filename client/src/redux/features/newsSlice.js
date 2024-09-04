import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { calculateRelevanceScore } from 'helpers/calculateRelevanceScore';
import NewsService from 'services/NewsService';

const initialState = {
  news: [],
  error: null,
  isLoading: false,
};

export const getNews = createAsyncThunk(
  'news/getNews',
  async ({ searchTerm, sortFactor, getCurrentPageNews } = {}, { rejectWithValue }) => {
    const { result, error } = await NewsService.getNews(searchTerm, sortFactor);

    if (result) {
      let articles = result.map((article) => ({
        ...article,
        pages: article.pages ? article.pages.map((page) => page.name) : [],
      }));

      if (getCurrentPageNews) {
        articles = getCurrentPageNews(articles);
      }

      if (sortFactor === 'relevance') {
        articles = articles.sort((a, b) => calculateRelevanceScore(b) - calculateRelevanceScore(a));
      }

      return articles;
    }

    return rejectWithValue(error || 'An error occurred while getting news data. Please try again later');
  }
);

export const updateViews = createAsyncThunk('news/updateViews', async (articleObj, { rejectWithValue }) => {
  const increasedArticleViews = Number(articleObj.views) + 1;
  const newsId = articleObj.id;

  const { result, error } = await NewsService.updateViews(newsId, increasedArticleViews);

  if (result) {
    return { newsId, views: increasedArticleViews };
  }

  return rejectWithValue(error || 'An error occurred while updating views. Please try again later');
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload;
        state.error = null;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.isLoading = false;
        state.news = [];
        state.error = action.payload;
      })
      .addCase(updateViews.fulfilled, (state, action) => {
        const article = state.news.find((article) => article.id === action.payload.newsId);
        if (article) {
          article.views = action.payload.views;
        }
      });
  },
});

export default newsSlice.reducer;
