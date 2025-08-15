import { db } from '../database.ts';
import bcrypt from "bcrypt";

export const fetchAllSellerBooks = async (
  sellerid: number,
  genre?: string,
  seller?: string,
  title?: string,
  sortBy: string = 'created_at',
  order: string = 'desc'
) => {
    const id = sellerid;
  let baseQuery = `
    SELECT 
      b.bookid, 
      b.author,
      b.title, 
      b.price, 
      b.date_publish, 
      u.email AS seller_email, 
      b.stock AS avaliableCount,
      GROUP_CONCAT(DISTINCT g.name) AS genre,
      IFNULL(SUM(oi.quantity), 0) AS soldCount
    FROM books b
    JOIN users u ON b.userid = u.userid
    WHERE u.userid = ${id}
  `;

  const params: any[] = [];

  if (genre) {
    baseQuery += ` AND g.name LIKE ?`;
    params.push(`%${genre}%`);
  }

  if (seller) {
    baseQuery += ` AND u.email LIKE ?`;
    params.push(`%${seller}%`);
  }

  if (title) {
    baseQuery += ` AND b.title LIKE ?`;
    params.push(`%${title}%`);
  }

  baseQuery += `
    GROUP BY 
      b.bookid, 
      b.title, 
      b.price, 
      b.date_publish, 
      u.email, 
      b.stock
  `;

  const validSortFields: Record<string, string> = {
    title: 'b.title',
    genre: 'genre',
    available: 'b.stock',
    sold: 'soldCount',
  };

  const sortField = validSortFields[sortBy] || 'b.title';
  const sortOrder = order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  baseQuery += ` ORDER BY ${sortField} ${sortOrder}`;

  const [rows] = await (await db).query(baseQuery, params);
  return rows;
};