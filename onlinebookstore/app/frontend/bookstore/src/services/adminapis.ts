export const fetchBooks = async (
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

  const res = await fetch(`http://localhost:5000/admin/books?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch books');
  }
  return res.json();
};
