import axiosInstance from './axiosInstance';

export const RemoveData = async (id, path) => {
  const response = await axiosInstance.delete(`/${path}/${id}`);
  return response;
};

export const getSingleBanner = async (id) => {
  const response = await axiosInstance.get(`/banner/${id}`);
  return response;
};
