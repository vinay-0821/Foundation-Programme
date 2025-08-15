export type SellerProfile = {
  id: number;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profilePicture: string;
  joined: string;
};

export type SellerStats = {
  totalAmount: number;
  totalBooksSold: number;
  topBook: string;
  rating: number;
};

export type SellerOrder = {
  id: number;
  book: string;
  date: string;
  amount: number;
};

const API_BASE = "http://localhost:5000/seller";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getSellerProfile = async (): Promise<SellerProfile> => {
  const res = await fetch(`${API_BASE}/profile`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch seller profile: ${res.statusText}`);
  }

  return res.json();
};

export const updateSellerProfile = async (
  data: Partial<SellerProfile>
): Promise<SellerProfile> => {
  const res = await fetch(`${API_BASE}/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update profile: ${errorText}`);
  }

  return res.json();
};

export const changeSellerPassword = async (
  password: string
): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(`${API_BASE}/password`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to change password: ${errorText}`);
  }

  return res.json();
};

export const getSellerStats = async (): Promise<SellerStats> => {
  const res = await fetch(`${API_BASE}/dashboard/stats`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch seller stats: ${res.statusText}`);
  }

  return res.json();
};

export const getRecentOrders = async (): Promise<SellerOrder[]> => {
  const res = await fetch(`${API_BASE}/orders/recent`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch recent orders: ${res.statusText}`);
  }

  return res.json();
};

export const getAllOrders = async (
  sortBy: string = "date",
  order: string = "desc",
  search: string = ""
): Promise<SellerOrder[]> => {
  const params = new URLSearchParams({ sortBy, order, search });

  const res = await fetch(`${API_BASE}/orders?${params.toString()}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch all orders: ${res.statusText}`);
  }

  return res.json();
};


export const fetchSellerBooks = async (
  genre: string,
  seller: string,
  title: string,
  sortBy: string,
  order: string
) => {
  const params = new URLSearchParams({
    genre,
    seller,
    title,
    sortBy,
    order
  });

  const token = localStorage.getItem('token');

  const res = await fetch(`http://localhost:5000/seller/mybooks?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const errorText = await res.text();
    // console.log("In sellerapis.ts");
    console.error("Error response:", errorText);
    throw new Error(`Failed to fetch books: ${res.status} ${res.statusText}`);
  }

  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    const errorText = await res.text(); 
    console.error("Unexpected non-JSON response:", errorText);
    throw new Error("Expected JSON but received something else");
  }
};
