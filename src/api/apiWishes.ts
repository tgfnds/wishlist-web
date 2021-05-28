import axios from "axios";
import { Wish } from "../types/types";

const API_URL = "https://localhost:44329";

export const fetchWishes = async (): Promise<Wish[]> => {
    const res = await axios.get<Wish[]>("https://localhost:44329/wish");
    return res.data;
};

export const addWish = async (wish: Wish): Promise<string | null> => {
    const res = await axios.post<string | null>(`${API_URL}/wish`, wish);
    if (res.status !== 200) {
      return null;
    }
    return res.data;
};

export const updateWish = async (wish: Wish): Promise<boolean | null> => {
    const res = await axios.put<boolean | null>(
      `${API_URL}/wish`,
      wish,
    );
    if (res.status !== 200) {
      return null;
    }
    return res.data;
};

export const deleteWish = async (id: string): Promise<boolean | null> => {
    const res = await axios.delete<boolean | null>(`${API_URL}/wish/${id}`);
    return res.data;
};
